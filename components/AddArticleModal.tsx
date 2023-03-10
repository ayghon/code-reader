import { MaterialIcons } from '@expo/vector-icons';
import { Button, Icon, Input, Stack, Text } from 'native-base';
import React, { FC } from 'react';

import { Modal } from './Modal';

type AddArticleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  code?: string;
};

export const AddArticleModal: FC<AddArticleModalProps> = ({ isOpen, onClose, onSave, code }) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Add new entry"
      onClose={onClose}
      footerButtons={
        <Button style={{ alignSelf: 'flex-end' }} variant="solid" onPress={onSave}>
          Add
        </Button>
      }>
      <Stack space={6}>
        <Text>Bar code data {code} has been scanned!</Text>
        <Input placeholder="Label" />
        <Input
          placeholder="Buying price"
          inputMode="decimal"
          rightElement={<Icon as={<MaterialIcons name="euro" />} marginRight={2} />}
        />
      </Stack>
    </Modal>
  );
};
