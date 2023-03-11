import { useState } from 'react';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
  None = 'none',
}

export type HeaderSort<THeaderNames> = {
  name: THeaderNames;
  direction: SortDirection;
};

export function useHeaderSort<THeaderNames>() {
  const [headerSortDirection, setHeaderSortDirection] =
    useState<HeaderSort<THeaderNames>>();

  // -> none -> asc -> desc ->
  const sortColumn = (name: THeaderNames) => {
    setHeaderSortDirection((s) => {
      if (s && s?.name === name) {
        if (s.direction === SortDirection.None) {
          return { name, direction: SortDirection.Asc };
        } else if (s.direction === SortDirection.Asc) {
          return { name, direction: SortDirection.Desc };
        } else {
          return { name, direction: SortDirection.None };
        }
      }

      return { name, direction: SortDirection.Asc };
    });
  };

  return { sortColumn, headerSortDirection };
}
