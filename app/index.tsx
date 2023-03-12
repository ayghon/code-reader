import React, { useEffect, useState } from 'react';

import { AddArticleModal } from '../components/AddArticleModal';
import { ArticlesList } from '../components/articles-list/ArticlesList';
import { OpenScannerFab } from '../components/scanner/OpenScannerFab';
import { useArticlesState } from '../context/articles.context';
import { useCodeState } from '../context/code.context';
import { Article } from '../types';

export default function Index() {
  const { code, setCode } = useCodeState();
  const [isModalVisible, setModalVisible] = useState(false);
  const { articles, addArticle, editArticle } = useArticlesState();

  const hideModal = () => {
    setCode(undefined);
    setModalVisible(false);
  };
  const showModal = () => setModalVisible(true);

  const addNewArticle = (data: Article) => {
    if (articles.find((it) => it.id === data.id)) {
      editArticle(data.id, data);
    } else {
      addArticle(data);
    }
  };

  useEffect(() => {
    if (code) {
      showModal();
    }
  }, [code]);

  return (
    <>
      <ArticlesList />
      <OpenScannerFab />
      <AddArticleModal
        isOpen={isModalVisible}
        onSave={addNewArticle}
        onClose={hideModal}
      />
    </>
  );
}
