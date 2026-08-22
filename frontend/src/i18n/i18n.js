import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ny from "./locales/ny.json";


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      ny: {
        translation: ny
      }
    },

    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;