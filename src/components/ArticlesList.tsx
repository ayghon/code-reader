import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { DataTable } from 'react-native-paper';

const pageOptions = [5, 10, 20, 50, 100];

const articles = faker.helpers.uniqueArray(
  () => ({
    id: faker.datatype.uuid(),
    label: faker.random.words(),
    price: faker.datatype.float({ max: 50 }),
  }),
  faker.datatype.number({ max: 100, min: 15 })
);

export const ArticlesList = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(pageOptions[1]);
  const total = Math.ceil(articles.length / itemsPerPage) ?? 1;

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <FlatList
        ListHeaderComponent={
          <DataTable.Header>
            <DataTable.Title>Label</DataTable.Title>
            <DataTable.Title numeric>Buying price</DataTable.Title>
          </DataTable.Header>
        }
        stickyHeaderIndices={[0]}
        ListHeaderComponentStyle={{
          backgroundColor: 'white',
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={articles.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)}
        keyExtractor={({ id }) => id}
        ListFooterComponent={
          <DataTable.Pagination
            style={{ justifyContent: 'flex-start' }}
            numberOfItemsPerPage={itemsPerPage}
            page={page}
            numberOfPages={total}
            onPageChange={setPage}
            label={`${page}-${page + 1} of ${total}`}
            numberOfItemsPerPageList={pageOptions}
            onItemsPerPageChange={setItemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel="Rows per page"
          />
        }
        renderItem={({ item: { id, label, price } }) => (
          <DataTable.Row id={id}>
            <DataTable.Cell>{label}</DataTable.Cell>
            <DataTable.Cell numeric>{price}</DataTable.Cell>
          </DataTable.Row>
        )}
      />
    </DataTable>
  );
};
