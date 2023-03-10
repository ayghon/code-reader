import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Fab, Icon } from 'native-base';
import React from 'react';

export const OpenScannerFab = () => {
  return (
    <Link href="scanner" asChild>
      <Fab icon={<Icon as={<MaterialIcons name="add" />} />}>
        <Icon name="barcode-scan" />
      </Fab>
    </Link>
  );
};
