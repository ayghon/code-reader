import { useIsFocused } from '@react-navigation/core';
import React from 'react';

import { AddArticle } from '../components/AddArticle';
import { ArticleList } from '../components/article-list/ArticleList';

export default function Index() {
  const isFocused = useIsFocused();

  return (
    <>
      <ArticleList />
      {isFocused && <AddArticle />}
    </>
  );
}
