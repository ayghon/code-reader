import { PermissionResponse } from 'expo-barcode-scanner';
import { Button, Center, Text } from 'native-base';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { i18nKeys } from '../../i18n/keys';

type PermissionNotGrantedProps = {
  onRequest: () => Promise<PermissionResponse>;
};

export const PermissionNotGranted: FC<PermissionNotGrantedProps> = ({
  onRequest,
}) => {
  const { t } = useTranslation();

  return (
    <Center flex={1} justifyContent="center">
      <Text marginBottom={4}>
        {t(i18nKeys.permissions.camera.not_granted.explanation)}
      </Text>
      <Button onPress={onRequest}>
        {t(i18nKeys.permissions.camera.not_granted.grant)}
      </Button>
    </Center>
  );
};
