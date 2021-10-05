import { useContext } from 'react';
import ThemeContext, { Theme } from '@internal/context/ThemeContext';

interface ReturnType {
  theme: Theme;
  newMarketingColors: boolean;
}

export default function useThemeContext(): ReturnType {
  const { theme, newMarketingColors } = useContext(ThemeContext);

  return { theme, newMarketingColors };
}
