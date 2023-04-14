export type Article = {
  id: string;
  label: string;
  price: number;
};

export enum StorageKeys {
  Articles = '@articles',
  Language = '@language',
  ShoppingCart = '@shopping-cart',
}

export type ShoppingCart = (Article & { quantity: number })[];
