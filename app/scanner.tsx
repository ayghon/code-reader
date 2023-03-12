import { MaterialIcons } from '@expo/vector-icons';
import {
  BarCodeScanningResult,
  Camera,
  CameraType,
  FlashMode,
} from 'expo-camera';
import { useRouter } from 'expo-router';
import { Icon, IconButton, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { PermissionNotGranted } from '../components/scanner/PermissionNotGranted';
import { useCodeState } from '../context/code.context';
import { ScreenLoader } from '../ui/ScreenLoader';

export default function Scanner() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isFlashOn, setFlashOn] = useState(false);
  const { setCode } = useCodeState();

  const { back } = useRouter();

  if (!permission) {
    // Camera permissions are still loading
    return <ScreenLoader />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return <PermissionNotGranted onRequest={requestPermission} />;
  }

  const handleBarCodeScanned = ({ data }: BarCodeScanningResult) => {
    setScanned(true);
    setCode(data);
    back();
  };

  return (
    <View flex={1} justifyContent="center">
      <Camera
        flashMode={isFlashOn ? FlashMode.torch : FlashMode.off}
        style={[styles.camera, StyleSheet.absoluteFillObject]}
        type={CameraType.back}
        onBarCodeScanned={scanned ? () => undefined : handleBarCodeScanned}>
        <IconButton
          alignSelf="center"
          onPress={() => setFlashOn((s) => !s)}
          icon={
            <Icon
              as={MaterialIcons}
              name={isFlashOn ? 'flash-off' : 'flash-on'}
            />
          }
          variant={isFlashOn ? 'solid' : 'subtle'}
          backgroundColor={isFlashOn ? undefined : 'gray.50'}
          rounded="full"
          size="lg"
        />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
});
