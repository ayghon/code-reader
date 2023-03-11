import { Column, Divider, Flex, Row, Text } from 'native-base';
import React, { FC } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

import { SwipeDeleteAction } from './SwipeDeleteAction';
import { useArticlesState } from '../../context/articles.context';

type ArticleRowProps = {
  id: string;
  label: string;
  price: number;
};

export const ArticleRow: FC<ArticleRowProps> = ({ label, price, id }) => {
  const { removeArticle } = useArticlesState();

  return (
    <Column>
      <Swipeable
        onSwipeableOpen={(direction) => {
          if (direction === 'left') {
            removeArticle(id);
          }
        }}
        renderLeftActions={SwipeDeleteAction}>
        <Row backgroundColor="white" paddingX={4} paddingY={2}>
          <Flex width="80%">
            <Text>{label}</Text>
          </Flex>
          <Flex width="20%">
            <Text textAlign="center">{price} €</Text>
          </Flex>
        </Row>
      </Swipeable>
      <Divider />
    </Column>
  );
};
