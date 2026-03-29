import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";
import zhTW from "./locales/zh-TW.json";
import ar from "./locales/ar.json";

export const SUPPORTED_LANGUAGES = {
  en: { label: "English", dir: "ltr" as const },
  "zh-CN": { label: "简体中文", dir: "ltr" as const },
  "zh-TW": { label: "繁體中文", dir: "ltr" as const },
  ar: { label: "العربية", dir: "rtl" as const },
} as const;

export type Locale = keyof typeof SUPPORTED_LANGUAGES;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      "zh-CN": { translation: zhCN },
      "zh-TW": { translation: zhTW },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18n-lang",
    },
  });

export default i18n;