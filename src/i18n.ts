import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetectorModule from "i18next-browser-languagedetector";

import { LanguageCode } from "@/models/enums/LanguageCode";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

i18n.use(LanguageDetectorModule).use(initReactI18next).init({
  debug: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  fallbackLng: ["en", "fr"],
  supportedLngs: Object.values(LanguageCode),
  detection: {
    order: ["localStorage", "sessionStorage", "navigator"],
  },
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
});
