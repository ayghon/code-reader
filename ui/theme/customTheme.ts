import { extendTheme } from 'native-base';

import { primary } from './colors';

export const customTheme = extendTheme({
  colors: {
    primary,
  },
  config: {
    useSystemColorMode: false,
  },
});
