// i18n.js

import account_en from "@/pages/locale/en/account";
import edit_profile_en from "@/pages/locale/en/edit_profile";
import getting_started_en from "@/pages/locale/en/getting_started";
import home_en from "@/pages/locale/en/home";
import login_en from "@/pages/locale/en/login";
import members_en from "@/pages/locale/en/members";
import messages_en from "@/pages/locale/en/messages";
import notifications_en from "@/pages/locale/en/notifications";
import payment_history_en from "@/pages/locale/en/payment_history";
import profile_en from "@/pages/locale/en/profile";
import signup_en from "@/pages/locale/en/signup";
import sos_en from "@/pages/locale/en/sos";
import subscriptions_en from "@/pages/locale/en/subscriptions";
import verify_code_en from "@/pages/locale/en/verify_code";
import account_fr from "@/pages/locale/fr/account";
import edit_profile_fr from "@/pages/locale/fr/edit_profile";
import getting_started_fr from "@/pages/locale/fr/getting_started";
import home_fr from "@/pages/locale/fr/home";
import login_fr from "@/pages/locale/fr/login";
import members_fr from "@/pages/locale/fr/members";
import messages_fr from "@/pages/locale/fr/messages";
import notifications_fr from "@/pages/locale/fr/notifications";
import payment_history_fr from "@/pages/locale/fr/payment_history";
import profile_fr from "@/pages/locale/fr/profile";
import signup_fr from "@/pages/locale/fr/signup";
import sos_fr from "@/pages/locale/fr/sos";
import subscriptions_fr from "@/pages/locale/fr/subscriptions";
import verify_code_fr from "@/pages/locale/fr/verify_code";
import { languageT } from '@/types';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_en from './common_en';
import common_fr from './common_fr';

const resources:Record<languageT, Record<string, any>> = {
  en: {
    common: common_en,
    getting_started: getting_started_en,
    login: login_en,
    signup: signup_en,
    verify_code: verify_code_en,
    edit_profile: edit_profile_en,
    members: members_en,
    messages: messages_en,
    notifications: notifications_en,
    payment_history: payment_history_en,
    profile: profile_en,
    subscriptions: subscriptions_en,
    account: account_en,
    home: home_en,
    sos: sos_en,
  },
  fr: {
    common: common_fr,
    getting_started: getting_started_fr,
    login: login_fr,
    signup: signup_fr,
    verify_code: verify_code_fr,
    edit_profile: edit_profile_fr,
    members: members_fr,
    messages: messages_fr,
    notifications: notifications_fr,
    payment_history: payment_history_fr,
    profile: profile_fr,
    subscriptions: subscriptions_fr,
    account: account_fr,
    home: home_fr,
    sos: sos_fr,
  },
};

const {languageCode} = Localization.getLocales()[0]

i18n
  .use(initReactI18next)
  .init({
    resources,
  ns: [
    'common',
    'getting_started',
    'login',
    'signup',
    'verify_code',
    'edit_profile',
    'members',
    'messages',
    'notifications',
    'payment_history',
    'profile',
    'subscriptions',
    'account',
    'home',
    'sos',
  ], // list of namespaces you plan to use
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