import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';

import enTranslation from './translations/enTranslation';
import ukTranslation from './translations/ukTranslation';

export const languages = [
  {
    key: 'en',
    displayValue: 'English'
  },
  {
    key: 'uk',
    displayValue: 'Українська'
  }
];

i18n.on('languageChanged', lng => {
  moment.locale(lng);
});

export default function i18nInit() {
  return i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      resources: {
        en: enTranslation,
        uk: ukTranslation
      },
      debug: true
    });
}
