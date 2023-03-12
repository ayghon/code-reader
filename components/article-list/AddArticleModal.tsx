import { MaterialIcons } from '@expo/vector-icons';
import { Button, Icon, Stack } from 'native-base';
import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCodeState } from '../../context/code.context';
import { i18nKeys } from '../../i18n/keys';
import { Article } from '../../types';
import { Modal } from '../../ui/Modal';
import { validationRules } from '../../utils/validation';
import { ControlledInput } from '../ControlledInput';

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
  const { t } = useTranslation();
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
    ? t(i18nKeys.app.index.modal.add_article.edit.title, {
        label: values?.label || '',
      })
    : t(i18nKeys.app.index.modal.add_article.create.title, {
        code,
      });
  const saveButtonTitle = isEdit
    ? t(i18nKeys.app.index.modal.add_article.edit.save)
    : t(i18nKeys.app.index.modal.add_article.create.save);

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
            inputProps={{
              label: t(i18nKeys.app.index.modal.add_article.input.label.label),
              isRequired: true,
            }}
          />
          <ControlledInput
            rules={{ required: validationRules.required }}
            name="price"
            inputProps={{
              label: t(i18nKeys.app.index.modal.add_article.input.price.label),
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
