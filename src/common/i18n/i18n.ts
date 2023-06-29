import EN from "./languages/en.json";
import TR from "./languages/tr.json";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const LANGUAGES = {
  en: { translation: EN },
  tr: { translation: TR },
};

export type Language = keyof typeof LANGUAGES;
const DEFAULT_LANGUAGE: Language = "tr";

i18n.use(initReactI18next).init({
  resources: LANGUAGES,
  lng: DEFAULT_LANGUAGE,
});

export default i18n;
