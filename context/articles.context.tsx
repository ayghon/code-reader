import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Article, StorageKeys } from '../types';

type ArticlesContextState = {
  articles: Article[];
  addArticle: (data: Article) => void;
  removeArticle: (id: string) => void;
  editArticle: (id: string, data: Article) => void;
  isLoading: boolean;
};

const useProvideArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem(StorageKeys.Articles)
      .then((articles) => {
        if (articles) {
          const parsedArticles = JSON.parse(articles) as Article[];
          setArticles(parsedArticles);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const addArticle = async (data: Article) => {
    const newArticles = [...articles, data];
    await AsyncStorage.setItem(
      StorageKeys.Articles,
      JSON.stringify(newArticles)
    );
    setArticles(newArticles);
  };

  const removeArticle = async (id: string) => {
    const newArticles = articles.filter((it) => it.id !== id);
    await AsyncStorage.setItem(
      StorageKeys.Articles,
      JSON.stringify(newArticles)
    );
    setArticles(newArticles);
  };

  const editArticle = async (id: string, data: Article) => {
    const newArticles = articles.map((it) => {
      if (it.id === id) {
        return { ...data, id };
      }
      return it;
    });

    await AsyncStorage.setItem(
      StorageKeys.Articles,
      JSON.stringify(newArticles)
    );
    setArticles(newArticles);
  };

  return { articles, addArticle, removeArticle, editArticle, isLoading };
};

const ArticlesContext = createContext<ArticlesContextState>({
  articles: [],
  editArticle: () => null,
  removeArticle: () => null,
  addArticle: () => null,
  isLoading: false,
});

export function ArticlesProvider({ children }: { children: ReactNode }) {
  const value = useProvideArticles();

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
}

export const useArticlesState = () => {
  const context = useContext(ArticlesContext);

  if (!context) {
    throw new Error('Missing provider for articles.context');
  }

  return context;
};
