import { FlatList, Row, Text } from 'native-base';
import React from 'react';

import { AddArticle } from '../components/AddArticle';
import { ArticleRow } from '../components/ArticleRow';
import { useArticlesState } from '../context/articles.context';

export default function ShoppingCart() {
  const { shoppingCart, addToCart } = useArticlesState();

  const total = shoppingCart.reduce((acc, { price = 0, quantity = 0 }) => {
    return parseFloat((acc + quantity * price).toFixed(2));
  }, 0);

  return (
    <>
      <FlatList
        paddingX={4}
        paddingY={2}
        ListFooterComponent={
          <Row marginTop={4} justifyContent="flex-end">
            <Text>Total: {total} €</Text>
          </Row>
        }
        data={shoppingCart}
        renderItem={({ item: { id, label, price } }) => (
          <ArticleRow id={id} label={label} price={price} />
        )}
        keyExtractor={({ id }) => id}
      />
      <AddArticle onAdd={addToCart} />
    </>
  );
}
