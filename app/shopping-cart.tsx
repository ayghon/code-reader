import { useIsFocused } from '@react-navigation/core';
import { FlatList } from 'native-base';
import React from 'react';

import { AddArticle } from '../components/AddArticle';
import { ArticleRow } from '../components/ArticleRow';
import { ShoppingCartFooter } from '../components/shopping-cart/ShoppingCartFooter';
import { useArticlesState } from '../context/articles.context';

export default function ShoppingCart() {
  const { shoppingCart, addToCart, isLoading } = useArticlesState();
  const isFocused = useIsFocused();

  const total = shoppingCart.reduce((acc, { price = 0, quantity = 0 }) => {
    return parseFloat((acc + quantity * price).toFixed(2));
  }, 0);

  return (
    <>
      <FlatList
        paddingX={4}
        paddingY={2}
        ListFooterComponent={
          <ShoppingCartFooter total={total} isLoading={isLoading} />
        }
        data={shoppingCart}
        renderItem={({ item: { id, label, price } }) => (
          <ArticleRow id={id} label={label} price={price} />
        )}
        keyExtractor={({ id }) => id}
      />
      {isFocused && <AddArticle onAdd={addToCart} />}
    </>
  );
}
