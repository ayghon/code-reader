import { Center, Column, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { ArticlesHeaderName, ArticlesTableHeader } from './ArticlesTableHeader';
import { SwipeableArticleRow } from './SwipeableArticleRow';
import { useArticlesState } from '../../context/articles.context';
import { i18nKeys } from '../../i18n/keys';
import { Article } from '../../types';
import { Pagination } from '../../ui/Pagination';
import { sortArticles } from '../../utils/articles-sort';
import { SortDirection, useHeaderSort } from '../../utils/header-sort';

const pageOptions = [5, 10, 20, 50, 100];

export const ArticleList = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(pageOptions[1]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { t } = useTranslation();

  const { headerSortDirection, sortColumn } =
    useHeaderSort<ArticlesHeaderName>();
  const { articles, isLoading, editArticle } = useArticlesState();

  const handleEdit = (values: Article) => {
    editArticle(values.id, values);
  };

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
        <ArticlesTableHeader
          sort={headerSortDirection}
          sortColumn={sortColumn}
        />
      }
      ListEmptyComponent={() => (
        <Center height="100%">
          {t(i18nKeys.app.index.article_list.empty)}
        </Center>
      )}
      stickyHeaderIndices={[0]}
      ListHeaderComponentStyle={{
        backgroundColor: 'white',
      }}
      contentContainerStyle={{ paddingBottom: 40 }}
      data={data}
      keyExtractor={({ id }) => id}
      ListFooterComponent={
        <Column mt={2}>
          {isLoading && <Spinner />}
          <Pagination
            itemsPerPage={itemsPerPage}
            page={page}
            total={articles.length}
            onChange={setPage}
            pageOptions={pageOptions}
            onPageOptionsChange={setItemsPerPage}
          />
        </Column>
      }
      renderItem={({ item: { id, label, price } }) => (
        <SwipeableArticleRow
          handleEdit={handleEdit}
          setEditModalOpen={setEditModalOpen}
          isEditModalOpen={isEditModalOpen}
          id={id}
          label={label}
          price={price}
        />
      )}
    />
  );
};
