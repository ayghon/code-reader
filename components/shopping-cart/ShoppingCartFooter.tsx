import { MaterialIcons } from '@expo/vector-icons';
import { Button, Icon, Row, Text } from 'native-base';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useArticlesState } from '../../context/articles.context';
import { i18nKeys } from '../../i18n/keys';
import { Modal } from '../../ui/Modal';

type ShoppingCartFooterProps = {
  total: number;
};

export const ShoppingCartFooter: FC<ShoppingCartFooterProps> = ({ total }) => {
  const { t } = useTranslation();
  const { shoppingCart, clearCart } = useArticlesState();
  const [isOpen, setIsOpen] = useState(false);

  const onClear = async () => {
    await clearCart();
    setIsOpen(false);
  };

  return (
    <>
      <Row
        marginTop={4}
        justifyContent="flex-end"
        alignItems="center"
        space="sm">
        {shoppingCart.length > 0 && (
          <Button
            onPress={() => setIsOpen(true)}
            variant="ghost"
            startIcon={<Icon as={MaterialIcons} name="clear" />}>
            {t(i18nKeys.app.shopping_cart.list.footer.clear)}
          </Button>
        )}
        <Text>
          {t(i18nKeys.app.shopping_cart.list.footer.total, {
            price: total,
            currency: '€',
          })}
        </Text>
      </Row>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t(i18nKeys.app.shopping_cart.modal.confirm_clear.title)}
        footerButtons={[
          <Button key="confirm-clear-cart" onPress={onClear} variant="solid">
            {t(i18nKeys.app.shopping_cart.modal.confirm_clear.confirm)}
          </Button>,
        ]}>
        <Text>{t(i18nKeys.app.shopping_cart.modal.confirm_clear.message)}</Text>
      </Modal>
    </>
  );
};
