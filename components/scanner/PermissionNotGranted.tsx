import { PermissionResponse } from 'expo-barcode-scanner';
import { Button, Center, Text } from 'native-base';
import { FC } from 'react';

type PermissionNotGrantedProps = {
  onRequest: () => Promise<PermissionResponse>;
};

export const PermissionNotGranted: FC<PermissionNotGrantedProps> = ({
  onRequest,
}) => {
  return (
    <Center flex={1} justifyContent="center">
      <Text marginBottom={4}>We need your permission to show the camera</Text>
      <Button onPress={onRequest}>Grant permission</Button>
    </Center>
  );
};
