/**
 * File types
 */
declare module '*.css';

/**
 * Modules
 */

/**
 * General types
 */
declare type ThemeContextValues = {
  theme: Theme;
  setTheme(theme: Theme): void;
};

/**
 * Components
 */
// Base
declare type Theme = 'dark' | 'light';
declare type ThemedComponent = {
  theme: Theme;
};
declare type HoverableComponent = {
  hoverable: boolean;
  hoverText: string;
};
