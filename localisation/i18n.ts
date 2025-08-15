// i18n.js

import getting_started_en from "@/pages/locale/en/getting_started";
import getting_started_fr from "@/pages/locale/fr/getting_started";
import { languageT } from '@/types';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_en from './common_en';
import common_fr from './common_fr';

const resources:Record<languageT, Record<string, any>> = {
  en: { common: common_en,
        getting_started:  getting_started_en
   },
  fr: { common: common_fr,
    getting_started:  getting_started_fr
   },
};

const {languageCode} = Localization.getLocales()[0]

i18n
  .use(initReactI18next)
  .init({
    resources,
    ns: ['common', 'getting_started'], // list of namespaces you plan to use
    defaultNS: 'common',  
    lng: languageCode || "en" , // Set initial language based on device locale
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;

export const changeLanguage = (lang: languageT) => {
  i18n.changeLanguage(lang);
};