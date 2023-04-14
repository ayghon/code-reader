import { MaterialIcons } from '@expo/vector-icons';
import { Icon, IconButton, Row, Text } from 'native-base';
import React, { FC } from 'react';

import { useArticlesState } from '../../context/articles.context';

type ArticlePriceCellProps = {
  price: number;
  id: string;
};

export const ArticlePriceCell: FC<ArticlePriceCellProps> = ({ price, id }) => {
  const { addToCart, reduceQuantityFromCart, shoppingCart } =
    useArticlesState();

  const itemInShoppingCart = shoppingCart.find((item) => item.id === id);

  return (
    <Row space={1} width="35%" alignItems="center" justifyContent="center">
      {!!itemInShoppingCart && (
        <IconButton
          onPress={() => reduceQuantityFromCart(id)}
          variant="ghost"
          _pressed={{
            backgroundColor: 'gray.100',
          }}
          icon={
            <Icon
              size="lg"
              color="gray.700"
              name="remove-circle-outline"
              as={MaterialIcons}
            />
          }
        />
      )}
      <Text textAlign="center">{price} €</Text>
      {itemInShoppingCart && itemInShoppingCart.quantity > 0 && (
        <Text fontSize="xs" color="text.400">
          x{itemInShoppingCart.quantity}
        </Text>
      )}
      {!!itemInShoppingCart && (
        <IconButton
          variant="ghost"
          onPress={() => addToCart(id)}
          _pressed={{
            backgroundColor: 'gray.100',
          }}
          icon={
            <Icon
              size="lg"
              color="gray.700"
              name="add-circle-outline"
              as={MaterialIcons}
            />
          }
        />
      )}
    </Row>
  );
};
