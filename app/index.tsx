import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, FAB, Text, TextInput } from 'react-native-paper';

import { ArticlesList } from '../src/components/ArticlesList';
import { Modal } from '../src/components/Modal';
import { useCodeState } from '../src/context/code.context';

export default function Index() {
  const { code, setCode } = useCodeState();
  const [visible, setVisible] = useState(false);

  const hideModal = () => {
    setCode(undefined);
    setVisible(false);
  };
  const showModal = () => setVisible(true);

  useEffect(() => {
    if (code) {
      showModal();
    }
  }, [code]);

  return (
    <>
      <ArticlesList />
      <Link href="scanner" asChild>
        <FAB
          icon="barcode-scan"
          style={{
            position: 'absolute',
            marginEnd: 16,
            marginBottom: 32,
            right: 0,
            bottom: 0,
          }}
        />
      </Link>
      <Modal
        onDismiss={hideModal}
        visible={visible}
        contentContainerStyle={styles.modalContainerStyle}>
        <View style={{ display: 'flex', rowGap: 8 }}>
          <Text variant="headlineMedium">Add new entry</Text>
          <Text variant="bodyMedium">Bar code data {code} has been scanned!</Text>
          <TextInput label="Label" mode="outlined" />
          <TextInput
            label="Buying price"
            mode="outlined"
            inputMode="decimal"
            right={<TextInput.Icon icon="currency-eur" />}
          />
          <Button style={{ alignSelf: 'flex-end' }} mode="contained" onPress={hideModal}>
            Add
          </Button>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainerStyle: { backgroundColor: 'white', padding: 20 },
});
