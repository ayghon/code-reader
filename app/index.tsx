import React, { useEffect, useState } from 'react';

import { AddArticleModal } from '../components/AddArticleModal';
import { ArticlesList } from '../components/articles-list/ArticlesList';
import { OpenScannerFab } from '../components/scanner/OpenScannerFab';
import { useCodeState } from '../context/code.context';

export default function Index() {
  const { code, setCode } = useCodeState();
  const [isModalVisible, setModalVisible] = useState(false);

  const hideModal = () => {
    setCode(undefined);
    setModalVisible(false);
  };
  const showModal = () => setModalVisible(true);

  useEffect(() => {
    if (code) {
      showModal();
    }
  }, [code]);

  return (
    <>
      <ArticlesList />
      <OpenScannerFab />
      <AddArticleModal code={code} isOpen={isModalVisible} onSave={hideModal} onClose={hideModal} />
    </>
  );
}
