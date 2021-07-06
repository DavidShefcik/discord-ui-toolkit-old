import { useContext } from 'react';
import ThemeContext, { Theme } from '@internal/context/ThemeContext';

interface ReturnType {
  theme: Theme;
  newMarketingLayout: boolean;
}

export default function useThemeContext(): ReturnType {
  const { theme, newMarketingLayout } = useContext(ThemeContext);

  return { theme, newMarketingLayout };
}
