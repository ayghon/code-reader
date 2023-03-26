import { Column, Divider, Flex, Row, Text } from 'native-base';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

import { AddArticleModal } from './AddArticleModal';
import { SwipeDeleteAction } from './SwipeDeleteAction';
import { SwipeEditAction } from './SwipeEditAction';
import { useArticlesState } from '../../context/articles.context';
import { Article } from '../../types';

type ArticleRowProps = {
  id: string;
  label: string;
  price: number;
  isEditModalOpen: boolean;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
  handleEdit: (values: Article) => void;
};

export const ArticleRow: FC<ArticleRowProps> = ({
  label,
  price,
  id,
  isEditModalOpen,
  setEditModalOpen,
  handleEdit,
}) => {
  const { removeArticle } = useArticlesState();

  return (
    <>
      <Column>
        <Swipeable
          onSwipeableOpen={(direction, swipeable) => {
            if (direction === 'left') {
              removeArticle(id);
            } else {
              setEditModalOpen(true);
              swipeable.close();
            }
          }}
          renderLeftActions={() => <SwipeDeleteAction />}
          renderRightActions={() => <SwipeEditAction />}>
          <Row backgroundColor="white" paddingX={4} paddingY={2}>
            <Flex direction="row" width="80%" alignItems="center">
              <Text>{label}</Text>
              <Text fontSize={11} color="text.400" marginLeft={2}>
                {id}
              </Text>
            </Flex>
            <Flex width="20%">
              <Text textAlign="center">{price} €</Text>
            </Flex>
          </Row>
        </Swipeable>
        <Divider />
      </Column>
      <AddArticleModal
        values={{ label, price, id }}
        onSave={handleEdit}
        isEdit
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
      />
    </>
  );
};
