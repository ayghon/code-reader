import { BarCodeScanningResult, Camera, CameraType } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Spinner, View } from 'native-base';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { PermissionNotGranted } from '../components/scanner/PermissionNotGranted';
import { useCodeState } from '../context/code.context';

export default function Scanner() {
  const [permission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { setCode } = useCodeState();

  const { back } = useRouter();

  if (!permission) {
    // Camera permissions are still loading
    return <Spinner />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return <PermissionNotGranted />;
  }

  const handleBarCodeScanned = ({ data }: BarCodeScanningResult) => {
    setScanned(true);
    setCode(data);
    back();
  };

  return (
    <View flex={1} justifyContent="center">
      <Camera
        style={[styles.camera, StyleSheet.absoluteFillObject]}
        type={CameraType.back}
        onBarCodeScanned={scanned ? () => undefined : handleBarCodeScanned}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
