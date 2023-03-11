import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { ArticleRow } from './ArticleRow';
import { ArticlesHeaderName, ArticlesTableHeader } from './ArticlesTableHeader';
import { Article } from '../../types';
import { sortArticles } from '../../utils/articles-sort';
import { SortDirection, useHeaderSort } from '../../utils/header-sort';
import { Pagination } from '../Pagination';

const articles: Article[] = faker.helpers.uniqueArray(
  () => ({
    id: faker.datatype.uuid(),
    label: faker.random.words(5),
    price: faker.datatype.float({ max: 50 }),
  }),
  faker.datatype.number({ max: 100, min: 15 })
);

const pageOptions = [5, 10, 20, 50, 100];

export const ArticlesList = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(pageOptions[1]);
  const { headerSortDirection, sortColumn } = useHeaderSort<ArticlesHeaderName>();

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const data = (
    headerSortDirection && headerSortDirection.direction !== SortDirection.None
      ? sortArticles(articles, headerSortDirection)
      : articles
  ).slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

  return (
    <FlatList
      ListHeaderComponent={
        <ArticlesTableHeader sort={headerSortDirection} sortColumn={sortColumn} />
      }
      stickyHeaderIndices={[0]}
      ListHeaderComponentStyle={{
        backgroundColor: 'white',
      }}
      contentContainerStyle={{ paddingBottom: 40 }}
      data={data}
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
