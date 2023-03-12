import { MaterialIcons } from '@expo/vector-icons';
import { Flex, Icon, Row, Text } from 'native-base';
import React from 'react';

export const SwipeEditAction = () => (
  <Flex
    flex={1}
    paddingX={8}
    justifyContent="center"
    backgroundColor="info.600">
    <Row alignItems="center" justifyContent="flex-end">
      <Icon as={MaterialIcons} name="edit" color="text.50" />
      <Text marginLeft={2} color="text.50" fontWeight="bold">
        Edit
      </Text>
    </Row>
  </Flex>
);
