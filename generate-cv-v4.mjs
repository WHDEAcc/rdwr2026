import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, statSync, mkdirSync, rmSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TMP = resolve(__dirname, '.tmp-cv-pages');

async function toDataURI(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status}`);
    const buf = Buffer.from(await resp.arrayBuffer());
    const ct = resp.headers.get('content-type') || 'image/png';
    return `data:${ct};base64,${buf.toString('base64')}`;
  } catch (e) {
    console.error(`  FAIL: ${url} — ${e.message}`);
    return url;
  }
}

(async () => {
  // Clean up temp dir
  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(TMP, { recursive: true });

  const htmlPath = resolve(__dirname, 'cv-portfolio-v4.html');
  let html = readFileSync(htmlPath, 'utf8');

  // 1. Download all images → base64
  const urlSet = new Set();
  for (const m of html.matchAll(/src="(https:\/\/[^"]+)"/g)) urlSet.add(m[1]);
  for (const m of html.matchAll(/url\('(https:\/\/[^']+)'\)/g)) urlSet.add(m[1]);
  const urls = [...urlSet];
  console.log(`Downloading ${urls.length} images...`);

  for (let i = 0; i < urls.length; i += 8) {
    const batch = urls.slice(i, i + 8);
    const results = await Promise.all(batch.map(async u => [u, await toDataURI(u)]));
    for (const [u, d] of results) html = html.replaceAll(u, d);
    console.log(`  ${Math.min(i + 8, urls.length)}/${urls.length}`);
  }

  // 2. Serve via HTTP
  const server = createServer((_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;

  // 3. Launch browser with 2x scale for ~192 DPI print quality
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  console.log('Loading HTML...');
  await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(3000);

  const imgOk = await page.evaluate(() =>
    Array.from(document.querySelectorAll('img')).filter(i => i.complete && i.naturalWidth > 0).length
  );
  console.log(`Images rendered: ${imgOk}`);

  // 4. Screenshot each .page element
  const pageEls = page.locator('.page');
  const count = await pageEls.count();
  console.log(`Screenshotting ${count} pages...`);

  const portraitPages = [];   // indices of portrait pages
  const landscapePages = [];  // indices of landscape pages

  for (let i = 0; i < count; i++) {
    const el = pageEls.nth(i);
    const isLandscape = await el.evaluate(e => e.classList.contains('landscape'));
    const png = join(TMP, `page_${String(i).padStart(2, '0')}.png`);
    await el.screenshot({ path: png });
    if (isLandscape) landscapePages.push(i);
    else portraitPages.push(i);
    process.stdout.write(`  ${i + 1}/${count}\r`);
  }
  console.log(`\nDone. Portrait: ${portraitPages.length}, Landscape: ${landscapePages.length}`);

  await browser.close();
  server.close();

  // 5. Group pages into segments by orientation for correct ordering
  // Segments: portrait(0-5), landscape(6-23), portrait(24-25) — adjust based on actual
  const segments = [];
  let currentType = null;
  let currentFiles = [];

  for (let i = 0; i < count; i++) {
    const type = landscapePages.includes(i) ? 'landscape' : 'portrait';
    if (type !== currentType && currentFiles.length > 0) {
      segments.push({ type: currentType, files: currentFiles });
      currentFiles = [];
    }
    currentType = type;
    currentFiles.push(join(TMP, `page_${String(i).padStart(2, '0')}.png`));
  }
  if (currentFiles.length > 0) segments.push({ type: currentType, files: currentFiles });

  // 6. Create PDF for each segment with correct page size
  const segmentPdfs = [];
  for (let s = 0; s < segments.length; s++) {
    const seg = segments[s];
    const segPdf = join(TMP, `segment_${s}.pdf`);
    const pageSize = seg.type === 'landscape' ? '297mmx210mm' : '210mmx297mm';
    const fileList = seg.files.join(' ');
    execSync(`img2pdf -S ${pageSize} ${fileList} -o "${segPdf}"`);
    segmentPdfs.push(segPdf);
    console.log(`Segment ${s} (${seg.type}, ${seg.files.length} pages) → ${segPdf}`);
  }

  // 7. Merge all segments
  const mergedPath = resolve(__dirname, 'Weihao_Du_CV_Portfolio_Arup_2026_v4_raw.pdf');
  const pdfPath = resolve(__dirname, 'Weihao_Du_CV_Portfolio_Arup_2026_v4.pdf');

  if (segmentPdfs.length === 1) {
    execSync(`cp "${segmentPdfs[0]}" "${mergedPath}"`);
  } else {
    const inputs = segmentPdfs.map(f => `"${f}"`).join(' ');
    execSync(`gs -dBATCH -dNOPAUSE -dQUIET -sDEVICE=pdfwrite -sOutputFile="${mergedPath}" ${inputs}`);
  }

  const rawSize = (statSync(mergedPath).size / 1024 / 1024).toFixed(1);
  console.log(`Merged PDF: ${rawSize}MB`);

  // 8. Compress
  try {
    execSync(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/printer -dNOPAUSE -dBATCH -dQUIET -sOutputFile="${pdfPath}" "${mergedPath}"`);
    const compSize = (statSync(pdfPath).size / 1024 / 1024).toFixed(1);
    console.log(`Compressed: ${rawSize}MB → ${compSize}MB`);
    execSync(`rm "${mergedPath}"`);
  } catch {
    execSync(`mv "${mergedPath}" "${pdfPath}"`);
  }

  // Cleanup
  rmSync(TMP, { recursive: true, force: true });
  console.log(`Done: ${pdfPath}`);
})();
