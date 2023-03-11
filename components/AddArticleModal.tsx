import { MaterialIcons } from '@expo/vector-icons';
import { Button, Icon, Stack, Text } from 'native-base';
import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ControlledInput } from './ControlledInput';
import { Modal } from './Modal';
import { useCodeState } from '../context/code.context';
import { Article } from '../types';
import { validationRules } from '../utils/validation';

type AddArticleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Article) => void;
};

export const AddArticleModal: FC<AddArticleModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const { code, setCode } = useCodeState();

  const methods = useForm<Article>({
    defaultValues: {
      id: code,
      label: '',
      price: undefined,
    },
    mode: 'all',
    criteriaMode: 'all',
  });

  const closeHandler = () => {
    setCode('');
    methods.reset();
    onClose();
  };

  const saveHandler = (values: Article) => {
    if (code) {
      onSave({ ...values, id: code });
      closeHandler();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Add new entry"
      onClose={closeHandler}
      footerButtons={
        <Button
          onPress={methods.handleSubmit(saveHandler)}
          style={{ alignSelf: 'flex-end' }}
          variant="solid">
          Add
        </Button>
      }>
      <FormProvider {...methods}>
        <Stack space={6}>
          <Text>Bar code data {code} has been scanned!</Text>
          <ControlledInput
            rules={{ required: validationRules.required }}
            name="label"
            inputProps={{ label: 'Label', isRequired: true }}
          />
          <ControlledInput
            rules={{ required: validationRules.required }}
            name="price"
            inputProps={{
              label: 'Buying price',
              isRequired: true,
              inputMode: 'decimal',
              rightElement: (
                <Icon as={<MaterialIcons name="euro" />} marginRight={2} />
              ),
            }}
          />
        </Stack>
      </FormProvider>
    </Modal>
  );
};
