import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import i18next, { TFunction } from 'i18next';
import { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE } from './i18n.constants';
import { Language } from './i18n.types';
import { en, fr, tr } from './locales';
import { StorageKeys } from '../types';

const deviceLanguage = getLocales()[0].languageCode;

export const useInitI18n = (enabled = true) => {
  const [isLoading, setLoading] = useState(enabled);
  const [tFunction, setTFunction] =
    useState<TFunction<'translation', undefined, 'translation'>>();

  useEffect(() => {
    const init = async () => {
      const storageLanguage = await AsyncStorage.getItem(StorageKeys.Language);

      const t = await i18next.use(initReactI18next).init({
        lng: storageLanguage || deviceLanguage,
        fallbackLng: DEFAULT_LANGUAGE,
        interpolation: {
          escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
        compatibilityJSON: 'v3',
        supportedLngs: Object.values(Language),
        resources: {
          en: {
            translation: en,
          },
          fr: {
            translation: fr,
          },
          tr: {
            translation: tr,
          },
        },
        returnNull: false,
      });
      setTFunction(t);
      setLoading(false);
    };

    if (enabled) {
      init();
    }
  }, []);

  return { isLoading, t: tFunction };
};
