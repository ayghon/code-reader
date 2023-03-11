import { MaterialIcons } from '@expo/vector-icons';
import { Button, Icon, Stack } from 'native-base';
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
  isEdit?: boolean;
  values?: Article;
};

export const AddArticleModal: FC<AddArticleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isEdit = false,
  values,
}) => {
  const { code, setCode } = useCodeState();

  const methods = useForm<Article>({
    defaultValues: values || {
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

  const saveHandler = (formValues: Article) => {
    if (code) {
      onSave({ ...formValues, id: code });
    } else {
      onSave(formValues);
    }

    closeHandler();
  };

  const title = isEdit
    ? `Edit entry: ${values?.label}`
    : `Add new entry for: ${code}`;
  const saveButtonTitle = isEdit ? 'Edit' : 'Add';

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={closeHandler}
      footerButtons={
        <Button
          onPress={methods.handleSubmit(saveHandler)}
          style={{ alignSelf: 'flex-end' }}
          variant="solid">
          {saveButtonTitle}
        </Button>
      }>
      <FormProvider {...methods}>
        <Stack space={6}>
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
