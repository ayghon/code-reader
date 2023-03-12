import { Camera } from 'expo-camera';
import { Button, Text, View } from 'native-base';

export const PermissionNotGranted = () => {
  const [, requestPermission] = Camera.useCameraPermissions();

  return (
    <View flex={1} justifyContent="center">
      <Text style={{ textAlign: 'center' }}>
        We need your permission to show the camera
      </Text>
      <Button onPress={requestPermission}>grant permission</Button>
    </View>
  );
};
