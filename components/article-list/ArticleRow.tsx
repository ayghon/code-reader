import { Column, Divider, Pressable, Row } from 'native-base';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

import { AddArticleModal } from './AddArticleModal';
import { ArticleLabelCell } from './ArticleLabelCell';
import { ArticlePriceCell } from './ArticlePriceCell';
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
            <Row paddingX={4} paddingY={2}>
              <ArticleLabelCell label={label} id={id} />
              <ArticlePriceCell price={price} id={id} />
            </Row>
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
