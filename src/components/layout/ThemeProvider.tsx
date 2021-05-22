import React, { ReactChild, useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';

import ThemeContext from '@internal/ThemeContext';

import '@assets/css/discord-ui-toolkit.css';

type ThemeProviderProps = {
  children: ReactChild;
  theme?: Theme;
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

export default function ThemeProvider({ children, theme = 'dark' }: ThemeProviderProps) {
  const [globalTheme, setGlobalTheme] = useState<Theme>(theme);

  useEffect(() => {
    setGlobalTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: globalTheme,
        setTheme: setGlobalTheme,
      }}
    >
      <div
        className={`discord-container discord-base ${globalTheme === 'dark' ? 'discord-dark' : 'discord-light'} ${css(
          styles.container
        )}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export { ThemeProviderProps };
