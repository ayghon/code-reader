import { MaterialIcons } from '@expo/vector-icons';
import { Button, Icon, Row, Text } from 'native-base';
import React, { FC, useState } from 'react';

import { useArticlesState } from '../../context/articles.context';
import { Modal } from '../../ui/Modal';

type ShoppingCartFooterProps = {
  total: number;
};

export const ShoppingCartFooter: FC<ShoppingCartFooterProps> = ({ total }) => {
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
            Clear
          </Button>
        )}
        <Text>Total: {total} €</Text>
      </Row>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Empty cart"
        footerButtons={[
          <Button key="confirm-clear-cart" onPress={onClear} variant="solid">
            Confirm
          </Button>,
        ]}>
        <Text>This action is irreversible !</Text>
      </Modal>
    </>
  );
};
