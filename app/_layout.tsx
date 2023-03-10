import { Stack } from 'expo-router';
import { NativeBaseProvider } from 'native-base';

import { CodeProvider } from '../context/code.context';

export default function Layout() {
  return (
    <NativeBaseProvider>
      <CodeProvider>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="scanner"
            options={{
              headerTitle: 'Scan something',
              headerTransparent: true,
              // Set the presentation mode to modal for our modal route.
              presentation: 'modal',
            }}
          />
        </Stack>
      </CodeProvider>
    </NativeBaseProvider>
  );
}
