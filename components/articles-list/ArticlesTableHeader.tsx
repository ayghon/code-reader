import { Flex, Row, Text } from 'native-base';
import React from 'react';

export const ArticlesTableHeader = () => {
  return (
    <Row paddingX={4} paddingY={2}>
      <Flex width="80%">
        <Text>Label</Text>
      </Flex>
      <Flex width="20%">
        <Text textAlign="center">Price</Text>
      </Flex>
    </Row>
  );
};
