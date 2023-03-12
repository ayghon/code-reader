export type Article = {
  id: string;
  label: string;
  price: number;
};

export enum StorageKeys {
  Articles = 'articles',
  Language = 'language',
}
