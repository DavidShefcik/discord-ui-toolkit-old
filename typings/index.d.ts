import { MouseEvent } from 'react';
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
// Inputs
declare type ButtonTypes = 'blurple' | 'greyple' | 'green' | 'red_filled' | 'red_empty';
declare type ButtonProps = {
  text: string;
  onClick(event: MouseEvent<HTMLButtonElement>): void;
  type: ButtonTypes;
};
