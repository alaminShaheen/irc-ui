import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetectorModule from "i18next-browser-languagedetector";

import { LanguageCode } from "@/models/enums/LanguageCode";
import { en_content } from "@/locales/en";
import { fr_content } from "@/locales/fr";

i18n
  .use(LanguageDetectorModule)
  .use(initReactI18next)
  .init({
    debug: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
    fallbackLng: ["en", "fr"],
    supportedLngs: Object.values(LanguageCode),
    detection: {
      order: ["localStorage", "sessionStorage", "navigator"],
    },
    resources: {
      en: {
        translation: en_content,
      },
      fr: {
        translation: fr_content,
      },
    },
    react: { useSuspense: false },
  });

i18n.on("languageChanged", (lng) => (document.documentElement.lang = lng));
document.documentElement.lang = i18n.language;

export default i18n;
