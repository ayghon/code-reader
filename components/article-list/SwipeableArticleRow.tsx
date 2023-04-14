import { Column, Divider, Pressable } from 'native-base';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

import { AddArticleModal } from './AddArticleModal';
import { SwipeDeleteAction } from './SwipeDeleteAction';
import { SwipeEditAction } from './SwipeEditAction';
import { useArticlesState } from '../../context/articles.context';
import { Article } from '../../types';
import { ArticleRow } from '../ArticleRow';

type SwipeableArticleRowProps = {
  id: string;
  label: string;
  price: number;
  isEditModalOpen: boolean;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
  handleEdit: (values: Article) => void;
};

export const SwipeableArticleRow: FC<SwipeableArticleRowProps> = ({
  label,
  price,
  id,
  isEditModalOpen,
  setEditModalOpen,
  handleEdit,
}) => {
  const { removeArticle, addToCart } = useArticlesState();

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
          <Pressable
            _pressed={{ backgroundColor: 'gray.100' }}
            backgroundColor="white"
            onPress={() => addToCart(id)}>
            <ArticleRow
              paddingX={4}
              paddingY={2}
              id={id}
              label={label}
              price={price}
            />
          </Pressable>
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
