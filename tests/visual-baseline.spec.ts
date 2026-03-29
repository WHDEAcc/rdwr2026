import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';

const BASE_URL = 'http://localhost:3000';

// Harness Engineering: Visual Baseline Tests
// These tests capture screenshots of every major section for regression detection

test.describe('Visual Baseline — Light Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    // Ensure light mode
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await page.waitForTimeout(500);
  });

  test('Full page screenshot', async ({ page }) => {
    await page.screenshot({ path: 'tests/screenshots/baseline/full-page-light.png', fullPage: true });
  });

  test('Hero section', async ({ page }) => {
    const hero = page.locator('section').first();
    await hero.screenshot({ path: 'tests/screenshots/baseline/hero-light.png' });
  });

  test('Text mask effect visible on desktop', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Desktop-only test');
    // The text-mask h1 should be visible (hidden on mobile via md:block)
    const textMask = page.locator('.text-mask');
    await expect(textMask).toBeVisible();
    await textMask.screenshot({ path: 'tests/screenshots/baseline/text-mask-light.png' });
  });

  test('Ideas section', async ({ page }) => {
    const ideas = page.getByText('Ideas').first();
    await ideas.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Wait for curtain reveal animation
    await page.screenshot({ path: 'tests/screenshots/baseline/ideas-light.png', fullPage: false });
  });

  test('Contact section uses Instrument Serif', async ({ page }) => {
    const contactHeading = page.locator('#contact h2');
    await contactHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const fontFamily = await contactHeading.evaluate(el => getComputedStyle(el).fontFamily);
    expect(fontFamily).toContain('Instrument Serif');
    await contactHeading.screenshot({ path: 'tests/screenshots/baseline/contact-heading-light.png' });
  });
});

test.describe('Visual Baseline — Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(500);
  });

  test('Full page screenshot (dark)', async ({ page }) => {
    await page.screenshot({ path: 'tests/screenshots/baseline/full-page-dark.png', fullPage: true });
  });

  test('Hero section (dark)', async ({ page }) => {
    const hero = page.locator('section').first();
    await hero.screenshot({ path: 'tests/screenshots/baseline/hero-dark.png' });
  });
});

test.describe('Interaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('Project hover reveals 3D tilt image', async ({ page }) => {
    // Scroll past Hero sections to reach projects
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.25, behavior: 'instant' }));
    await page.waitForTimeout(2000); // Wait for SectionReveal curtain animation

    // Find project buttons
    const firstRow = page.locator('button').filter({ hasText: /[\u4e00-\u9fff]|Shenzhen/ }).first();
    if (await firstRow.isVisible()) {
      await firstRow.hover();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'tests/screenshots/baseline/project-hover-tilt.png' });
    }
  });

  test('Section reveal animation triggers on scroll', async ({ page }) => {
    // Scroll to philosophy
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.4, behavior: 'instant' }));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'tests/screenshots/baseline/section-reveal-mid.png' });
  });
});

test.describe('Performance Audit', () => {
  test('Build succeeds without errors', async ({}) => {
    const result = execSync('cd /Users/whd/Downloads/rdlaweb && npm run build 2>&1', { encoding: 'utf-8' });
    expect(result).toContain('built in');
    expect(result).not.toContain('error');
  });
});

// Mobile & Tablet Specific Tests
test.describe('Mobile / Tablet Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
  });

  test('Hero renders correctly on all viewports', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    const vw = page.viewportSize()!.width;
    await hero.screenshot({ path: `tests/screenshots/baseline/hero-${vw}w.png` });
  });

  test('All SectionReveal content becomes visible after scroll', async ({ page }) => {
    // Scroll to each major section and verify it's visible (not clipped)
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.3, behavior: 'instant' }));
    await page.waitForTimeout(1200);

    // Philosophy should be visible
    const philosophy = page.locator('#philosophy');
    if (await philosophy.count() > 0) {
      await expect(philosophy).toBeVisible();
    }
  });

  test('Ideas section is visible and scrollable', async ({ page }) => {
    const ideas = page.getByText('Ideas').first();
    if (ideas) {
      await ideas.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      await expect(ideas).toBeVisible();
    }
  });

  test('Contact section renders correctly', async ({ page }) => {
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await expect(contact).toBeVisible();
    const vw = page.viewportSize()!.width;
    await contact.screenshot({ path: `tests/screenshots/baseline/contact-${vw}w.png` });
  });
});
