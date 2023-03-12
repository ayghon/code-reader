import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { Actionsheet, Icon, IconButton } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Language } from '../i18n/i18n.types';
import { i18nKeys } from '../i18n/keys';
import { StorageKeys } from '../types';

export const LanguageSelector = () => {
  const [isOpen, setOpen] = useState(false);
  const { setOptions } = useNavigation();
  const [t, { language, changeLanguage }] = useTranslation();

  const onChangeHandler = async (value: string) => {
    if (value !== language) {
      await AsyncStorage.setItem(StorageKeys.Language, value);
      await changeLanguage(value);
      setOptions({
        headerTitle: t(i18nKeys.app.layout.index.header_title),
        title: t(i18nKeys.app.layout.index.header_title),
      });
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton
        variant="ghost"
        _pressed={{
          backgroundColor: 'gray.100',
        }}
        onPress={() => setOpen(true)}
        padding={1}
        icon={
          <Icon as={MaterialIcons} name="language" size={6} color="gray.700" />
        }
      />
      <Actionsheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Actionsheet.Content>
          {Object.values(Language).map((lng) => (
            <Actionsheet.Item
              key={lng}
              _text={{
                color: language === lng ? 'primary.500' : undefined,
              }}
              onPress={() => onChangeHandler(lng)}>
              {t(i18nKeys.language[lng])}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
