import { Stack } from 'expo-router';
import { t as globalT } from 'i18next';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import { LanguageSelector } from '../components/LanguageSelector';
import { ArticlesProvider } from '../context/articles.context';
import { CodeProvider } from '../context/code.context';
import { useInitI18n } from '../i18n/init-i18n';
import { i18nKeys } from '../i18n/keys';
import { ScreenLoader } from '../ui/ScreenLoader';
import { customTheme } from '../ui/theme/customTheme';

export default function Layout() {
  const { isLoading, t } = useInitI18n();

  if (isLoading) {
    return (
      <NativeBaseProvider theme={customTheme}>
        <ScreenLoader />
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider theme={customTheme}>
      <ArticlesProvider>
        <CodeProvider>
          <Stack
            screenOptions={{
              headerRight: LanguageSelector,
            }}>
            <Stack.Screen
              name="index"
              options={{
                headerTitle: (t || globalT)(
                  i18nKeys.app.layout.index.header_title
                ),
              }}
            />
            <Stack.Screen
              name="scanner"
              options={{
                headerShown: false,
                // Set the presentation mode to modal for our modal route.
                presentation: 'modal',
              }}
            />
          </Stack>
        </CodeProvider>
      </ArticlesProvider>
    </NativeBaseProvider>
  );
}
