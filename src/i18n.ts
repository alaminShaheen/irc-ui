import i18n from "i18next";
import LanguageDetectorModule from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { LanguageCode } from "@/models/enums/LanguageCode";

i18n.use(LanguageDetectorModule).use(initReactI18next).init({
  debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  fallbackLng: ["en", "fr"],
  supportedLngs: Object.values(LanguageCode),
  detection: {
    order: ["localStorage", "sessionStorage", "navigator"],
  },
  resources: {
    en: {
      translation: {
        "your-policies": "Your Policies",
      },
    },
    fr: {
      translation: {
        "your-policies": "Vos Politiques",
      },
    },
  },
});
