import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, Locale } from "../i18n";

export function useDirection() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || "en") as Locale;
  const langConfig = SUPPORTED_LANGUAGES[currentLang] || SUPPORTED_LANGUAGES.en;
  
  return {
    dir: langConfig.dir,
    isRTL: langConfig.dir === "rtl",
  };
}
