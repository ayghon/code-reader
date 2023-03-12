import { MaterialIcons } from '@expo/vector-icons';
import { Flex, Icon, Row, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18nKeys } from '../../i18n/keys';

export const SwipeEditAction = () => {
  const { t } = useTranslation();

  return (
    <Flex
      flex={1}
      paddingX={8}
      justifyContent="center"
      backgroundColor="info.600">
      <Row alignItems="center" justifyContent="flex-end">
        <Icon as={MaterialIcons} name="edit" color="text.50" />
        <Text marginLeft={2} color="text.50" fontWeight="bold">
          {t(i18nKeys.app.index.article_list.swipe.edit)}
        </Text>
      </Row>
    </Flex>
  );
};
