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
  clearCart: () => Promise<void>;
};

const useProvideArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getParsedStorageData<Article[]>(StorageKeys.Articles)
      .then((parsedArticles) => {
        if (parsedArticles) {
          setArticles(parsedArticles);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const saveArticlesInContext = async (data: Article[]) => {
    await AsyncStorage.setItem(StorageKeys.Articles, JSON.stringify(data));
    setArticles(data);
  };
  const saveShoppingCartInContext = async (data: ShoppingCart) => {
    await AsyncStorage.setItem(StorageKeys.ShoppingCart, JSON.stringify(data));
    setShoppingCart(data);
  };

  const addArticle = async (data: Article) => {
    const parsedArticles =
      (await getParsedStorageData<Article[]>(StorageKeys.Articles)) || articles;
    const newArticles = [...parsedArticles, data];
    await saveArticlesInContext(newArticles);
  };

  const removeArticle = async (id: string) => {
    const parsedArticles =
      (await getParsedStorageData<Article[]>(StorageKeys.Articles)) || articles;
    const newArticles = parsedArticles.filter((it) => it.id !== id);
    await saveArticlesInContext(newArticles);

    const parsedShoppingCart =
      (await getParsedStorageData<ShoppingCart>(StorageKeys.ShoppingCart)) ||
      shoppingCart;
    const newShoppingCart: ShoppingCart = parsedShoppingCart.filter(
      (item) => item.id !== id
    );
    await saveShoppingCartInContext(newShoppingCart);
  };

  const editArticle = async (id: string, data: Article) => {
    const parsedArticles =
      (await getParsedStorageData<Article[]>(StorageKeys.Articles)) || articles;
    const newArticles = parsedArticles.map((it) => {
      if (it.id === id) {
        return { ...data, id };
      }
      return it;
    });
    await saveArticlesInContext(newArticles);

    const parsedShoppingCart =
      (await getParsedStorageData<ShoppingCart>(StorageKeys.ShoppingCart)) ||
      shoppingCart;
    const newShoppingCart: ShoppingCart = parsedShoppingCart.map((item) => {
      if (item.id === id) {
        return { ...item, ...data };
      }
      return item;
    });
    await saveShoppingCartInContext(newShoppingCart);
  };

  const addToCart = async (id: string) => {
    setLoading(true);
    const parsedArticles =
      (await getParsedStorageData<Article[]>(StorageKeys.Articles)) || articles;
    if (!parsedArticles) {
      setLoading(false);
      return;
    }

    const article = parsedArticles.find((article) => article.id === id);
    if (!article) {
      setLoading(false);
      return;
    }

    let newShoppingCart: ShoppingCart;

    const parsedShoppingCart =
      (await getParsedStorageData<ShoppingCart>(StorageKeys.ShoppingCart)) ||
      shoppingCart;
    const itemInCart = parsedShoppingCart.find((item) => item.id === id);
    if (!itemInCart) {
      newShoppingCart = [...parsedShoppingCart, { ...article, quantity: 1 }];
    } else {
      newShoppingCart = parsedShoppingCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    }

    await saveShoppingCartInContext(newShoppingCart);
    setLoading(false);
  };

  const removeFromCart = async (id: string) => {
    const parsedShoppingCart =
      (await getParsedStorageData<ShoppingCart>(StorageKeys.ShoppingCart)) ||
      shoppingCart;
    const articleInCart = parsedShoppingCart.find((item) => item.id === id);

    if (!articleInCart) {
      return;
    }

    const newShoppingCart = parsedShoppingCart.filter((item) => item.id !== id);
    await saveShoppingCartInContext(newShoppingCart);
  };

  const reduceQuantityFromCart = async (id: string) => {
    const parsedShoppingCart =
      (await getParsedStorageData<ShoppingCart>(StorageKeys.ShoppingCart)) ||
      shoppingCart;
    const articleInCart = parsedShoppingCart.find((item) => item.id === id);

    if (!articleInCart) {
      return;
    }

    if (articleInCart.quantity === 1) {
      await removeFromCart(id);

      return;
    }

    const newShoppingCart = parsedShoppingCart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 };
      }
      return item;
    });

    await saveShoppingCartInContext(newShoppingCart);
  };

  const clearCart = async () => {
    setLoading(true);
    await AsyncStorage.removeItem(StorageKeys.ShoppingCart);
    setShoppingCart([]);
    setLoading(false);
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
    clearCart,
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
  clearCart: () => Promise.resolve(),
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
