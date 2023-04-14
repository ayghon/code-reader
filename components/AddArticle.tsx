import React, { FC, useEffect, useState } from 'react';

import { AddArticleModal } from './article-list/AddArticleModal';
import { OpenScannerFab } from './scanner/OpenScannerFab';
import { useArticlesState } from '../context/articles.context';
import { useCodeState } from '../context/code.context';
import { Article } from '../types';

type AddArticleProps = {
  onAdd?: (id: string) => void;
};

export const AddArticle: FC<AddArticleProps> = ({ onAdd }) => {
  const { code, setCode } = useCodeState();
  const [isModalVisible, setModalVisible] = useState(false);
  const { articles, addArticle, editArticle } = useArticlesState();

  const hideModal = () => {
    setCode(undefined);
    setModalVisible(false);
  };
  const showModal = () => setModalVisible(true);

  const addNewArticle = async (data: Article) => {
    if (articles.find((it) => it.id === data.id)) {
      await editArticle(data.id, data);
    } else {
      await addArticle(data);
      onAdd?.(data.id);
    }
  };

  useEffect(() => {
    if (code) {
      showModal();
    }
  }, [code]);

  return (
    <>
      <OpenScannerFab />
      <AddArticleModal
        isOpen={isModalVisible}
        onSave={addNewArticle}
        onClose={hideModal}
      />
    </>
  );
};
