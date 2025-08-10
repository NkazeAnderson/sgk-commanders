// i18n.js

import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import fr from './fr';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

const {languageCode} = Localization.getLocales()[0]

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: languageCode || "en" , // Set initial language based on device locale
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;

export const changeLanguage = (lang: keyof typeof resources) => {
  i18n.changeLanguage(lang);
};