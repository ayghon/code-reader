import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { ArticleRow } from './ArticleRow';
import { ArticlesTableHeader } from './ArticlesTableHeader';
import { Pagination } from '../Pagination';

const pageOptions = [5, 10, 20, 50, 100];

const articles = faker.helpers.uniqueArray(
  () => ({
    id: faker.datatype.uuid(),
    label: faker.random.words(5),
    price: faker.datatype.float({ max: 50 }),
  }),
  faker.datatype.number({ max: 100, min: 15 })
);

export const ArticlesList = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(pageOptions[1]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <FlatList
      ListHeaderComponent={<ArticlesTableHeader />}
      stickyHeaderIndices={[0]}
      ListHeaderComponentStyle={{
        backgroundColor: 'white',
      }}
      contentContainerStyle={{ paddingBottom: 40 }}
      data={articles.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)}
      keyExtractor={({ id }) => id}
      ListFooterComponent={
        <Pagination
          itemsPerPage={itemsPerPage}
          page={page}
          total={articles.length}
          onChange={setPage}
          pageOptions={pageOptions}
          onPageOptionsChange={setItemsPerPage}
        />
      }
      renderItem={({ item: { label, price } }) => <ArticleRow label={label} price={price} />}
    />
  );
};
