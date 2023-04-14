import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Icon, IconButton, Row } from 'native-base';
import React from 'react';

import { LanguageSelector } from '../LanguageSelector';

export const ArticleListHeaderRight = () => {
  return (
    <Row space={4}>
      <Link href="shopping-cart" asChild>
        <IconButton
          variant="ghost"
          _pressed={{
            backgroundColor: 'gray.100',
          }}
          padding={1}
          icon={
            <Icon
              as={MaterialIcons}
              name="shopping-cart"
              size={6}
              color="gray.700"
            />
          }
        />
      </Link>
      <LanguageSelector />
    </Row>
  );
};
