import { MaterialIcons } from '@expo/vector-icons';
import { Flex, Icon, Row, Text } from 'native-base';
import React from 'react';

export const SwipeDeleteAction = () => (
  <Flex
    flex={1}
    paddingX={8}
    justifyContent="center"
    backgroundColor="danger.600">
    <Row alignItems="center">
      <Icon as={MaterialIcons} name="delete" color="text.50" />
      <Text marginLeft={2} color="text.50" fontWeight="bold">
        Delete
      </Text>
    </Row>
  </Flex>
);
