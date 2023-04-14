import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Article, ShoppingCart, StorageKeys } from '../types';
import { getParsedStorageData } from '../utils/storage';

type ArticlesContextState = {
  articles: Article[];
  addArticle: (data: Article) => Promise<void>;
  removeArticle: (id: string) => Promise<void>;
  editArticle: (id: string, data: Article) => Promise<void>;
  isLoading: boolean;
  shoppingCart: ShoppingCart;
  addToCart: (id: string) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  reduceQuantityFromCart: (id: string) => Promise<void>;
};

const useProvideArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>([]);
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

    const newShoppingCart: ShoppingCart = shoppingCart.filter(
      (item) => item.id !== id
    );
    await AsyncStorage.setItem(
      StorageKeys.ShoppingCart,
      JSON.stringify(newShoppingCart)
    );
    setShoppingCart(newShoppingCart);
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

    const newShoppingCart: ShoppingCart = shoppingCart.map((item) => {
      if (item.id === id) {
        return { ...item, ...data };
      }
      return item;
    });
    await AsyncStorage.setItem(
      StorageKeys.ShoppingCart,
      JSON.stringify(newShoppingCart)
    );
    setShoppingCart(newShoppingCart);
  };

  const addToCart = async (id: string) => {
    const parsedArticles = await getParsedStorageData<Article[]>(
      StorageKeys.Articles
    );
    if (!parsedArticles) {
      return;
    }

    const article = parsedArticles.find((article) => article.id === id);
    if (!article) {
      return;
    }

    let newShoppingCart: ShoppingCart;

    const itemInCart = shoppingCart.find((item) => item.id === id);
    if (!itemInCart) {
      newShoppingCart = [...shoppingCart, { ...article, quantity: 1 }];
    } else {
      newShoppingCart = shoppingCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    }

    setShoppingCart(newShoppingCart);
    await AsyncStorage.setItem(
      StorageKeys.ShoppingCart,
      JSON.stringify(newShoppingCart)
    );
  };

  const removeFromCart = async (id: string) => {
    const articleInCart = shoppingCart.find((item) => item.id === id);

    if (!articleInCart) {
      return;
    }

    const newShoppingCart = shoppingCart.filter((item) => item.id !== id);

    setShoppingCart(newShoppingCart);
    await AsyncStorage.setItem(
      StorageKeys.ShoppingCart,
      JSON.stringify(newShoppingCart)
    );
  };

  const reduceQuantityFromCart = async (id: string) => {
    const articleInCart = shoppingCart.find((item) => item.id === id);

    if (!articleInCart) {
      return;
    }

    if (articleInCart.quantity === 1) {
      await removeFromCart(id);

      return;
    }

    const newShoppingCart = shoppingCart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 };
      }
      return item;
    });

    setShoppingCart(newShoppingCart);
    await AsyncStorage.setItem(
      StorageKeys.ShoppingCart,
      JSON.stringify(newShoppingCart)
    );
  };

  return {
    articles,
    addArticle,
    removeArticle,
    editArticle,
    isLoading,
    shoppingCart,
    addToCart,
    removeFromCart,
    reduceQuantityFromCart,
  };
};

const ArticlesContext = createContext<ArticlesContextState>({
  articles: [],
  editArticle: () => Promise.resolve(),
  removeArticle: () => Promise.resolve(),
  addArticle: () => Promise.resolve(),
  addToCart: () => Promise.resolve(),
  removeFromCart: () => Promise.resolve(),
  reduceQuantityFromCart: () => Promise.resolve(),
  shoppingCart: [],
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
