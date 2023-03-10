import { Column, Divider, Flex, Row, Text } from 'native-base';
import React, { FC } from 'react';

type ArticleRowProps = {
  label: string;
  price: number;
};

export const ArticleRow: FC<ArticleRowProps> = ({ label, price }) => {
  return (
    <Column>
      <Row paddingX={4} paddingY={2}>
        <Flex width="80%">
          <Text>{label}</Text>
        </Flex>
        <Flex width="20%">
          <Text textAlign="center">{price} €</Text>
        </Flex>
      </Row>
      <Divider />
    </Column>
  );
};
