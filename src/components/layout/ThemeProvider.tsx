import React, { ReactChild, useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';

import ThemeContext from '@internal/ThemeContext';

import '@assets/css/discord-ui-toolkit.css';

type ThemeProviderProps = {
  children: ReactChild;
  theme?: Theme;
  newMarketingColors?: boolean;
};

const styles = StyleSheet.create({
  container: {
    '::-webkit-scrollbar': {
      width: '16px',
      height: '16px',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: 'var(--scrollbar-auto-track)',
      border: '4px solid transparent',
      backgroundClip: 'padding-box',
      borderRadius: '8px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--scrollbar-auto-thumb)',
      minHeight: '40px',
      border: '4px solid transparent',
      backgroundClip: 'padding-box',
      borderRadius: '8px',
    },
  },
});

export default function ThemeProvider({ children, theme = 'dark', newMarketingColors = false }: ThemeProviderProps) {
  const [globalTheme, setGlobalTheme] = useState<Theme>(theme);
  const [globalNewMarketingColors, setGlobalNewMarketingColors] = useState(newMarketingColors);

  useEffect(() => {
    setGlobalTheme(theme);
  }, [theme]);

  useEffect(() => {
    setGlobalNewMarketingColors(newMarketingColors);
  }, [newMarketingColors]);

  return (
    <ThemeContext.Provider
      value={{
        theme: globalTheme,
        setTheme: setGlobalTheme,
        newMarketingColors: globalNewMarketingColors,
      }}
    >
      <div
        className={`discord-container discord-base ${
          newMarketingColors ? 'discord-new-colors' : 'discord-old-colors'
        } ${globalTheme === 'dark' ? 'discord-dark' : 'discord-light'} ${css(styles.container)}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export { ThemeProviderProps };
