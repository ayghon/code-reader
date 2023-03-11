import { MaterialIcons } from '@expo/vector-icons';
import { Flex, Icon, Pressable, Row, Text } from 'native-base';
import React, { FC } from 'react';

import { HeaderSort, SortDirection } from '../../utils/header-sort';

export enum ArticlesHeaderName {
  Label = 'label',
  Price = 'price',
}

type ArticlesTableHeaderProps = {
  sort?: HeaderSort<ArticlesHeaderName>;
  sortColumn: (name: ArticlesHeaderName) => void;
};

export const ArticlesTableHeader: FC<ArticlesTableHeaderProps> = ({ sort, sortColumn }) => {
  return (
    <Row paddingX={4} paddingY={2}>
      <Pressable width="80%" onPress={() => sortColumn(ArticlesHeaderName.Label)}>
        <Flex direction="row" align="center">
          <Text>Label</Text>
          {sort &&
            sort.name === ArticlesHeaderName.Label &&
            sort.direction !== SortDirection.None && (
              <Icon
                as={MaterialIcons}
                name={sort.direction === SortDirection.Asc ? 'arrow-drop-up' : 'arrow-drop-down'}
              />
            )}
        </Flex>
      </Pressable>
      <Pressable
        width="20%"
        alignItems="center"
        onPress={() => sortColumn(ArticlesHeaderName.Price)}>
        <Flex align="center" direction="row">
          <Text textAlign="center">Price</Text>
          {sort &&
            sort.name === ArticlesHeaderName.Price &&
            sort.direction !== SortDirection.None && (
              <Icon
                as={MaterialIcons}
                name={sort.direction === SortDirection.Asc ? 'arrow-drop-up' : 'arrow-drop-down'}
              />
            )}
        </Flex>
      </Pressable>
    </Row>
  );
};
