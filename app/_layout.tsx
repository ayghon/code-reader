import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';

import { CodeProvider } from '../src/context/code.context';

export default function Layout() {
  return (
    <PaperProvider>
      <CodeProvider>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="scanner"
            options={{
              // Set the presentation mode to modal for our modal route.
              presentation: 'modal',
            }}
          />
        </Stack>
      </CodeProvider>
    </PaperProvider>
  );
}
