import React, { ReactChild, useState } from 'react';

import ThemeContext from '../internal/ThemeContext';

import '../../assets/css/discord-ui-toolkit.css';

type ThemeProviderProps = {
  children: ReactChild;
  theme?: Theme;
};

export default function ThemeProvider({
  children,
  theme = 'dark',
}: ThemeProviderProps) {
  const [globalTheme, setGlobalTheme] = useState<Theme>(theme);

  return (
    <ThemeContext.Provider
      value={{
        theme: globalTheme,
        setTheme: setGlobalTheme,
      }}
    >
      <div
        className={`discord-container discord-base ${
          globalTheme === 'dark' ? 'discord-dark' : 'discord-light'
        } `}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export { ThemeProviderProps };
