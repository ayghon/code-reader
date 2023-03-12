import { Stack } from 'expo-router';
import { NativeBaseProvider } from 'native-base';

import { ArticlesProvider } from '../context/articles.context';
import { CodeProvider } from '../context/code.context';
import { customTheme } from '../ui/theme/customTheme';

export default function Layout() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <ArticlesProvider>
        <CodeProvider>
          <Stack>
            <Stack.Screen name="index" />
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
