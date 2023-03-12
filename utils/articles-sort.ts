import { HeaderSort, SortDirection } from './header-sort';
import { ArticlesHeaderName } from '../components/article-list/ArticlesTableHeader';
import { Article } from '../types';

export const sortArticles = (
  articles: Article[],
  headerSortDirection: HeaderSort<ArticlesHeaderName>
) =>
  [...articles].sort((a, b) => {
    if (headerSortDirection.direction === SortDirection.Asc) {
      if (headerSortDirection.name === ArticlesHeaderName.Price) {
        return a.price > b.price ? +1 : -1;
      }
      return a.label > b.label ? +1 : -1;
    } else {
      if (headerSortDirection.name === ArticlesHeaderName.Price) {
        return a.price < b.price ? +1 : -1;
      }
      return a.label < b.label ? +1 : -1;
    }
  });
