import { createContext } from 'react';

type Theme = 'dark' | 'light';
interface ThemeContextValues {
  theme: Theme;
  setTheme(theme: Theme): void;
  newMarketingLayout: boolean;
}

export default createContext<ThemeContextValues>(null);

export { Theme, ThemeContextValues };
