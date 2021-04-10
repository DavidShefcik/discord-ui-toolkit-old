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

declare type Icon =
  | 'discord'
  | 'folder'
  | 'thin_plus'
  | 'thick_plus'
  | 'compass'
  | 'download'
  | 'person_waving'
  | 'nitro'
  | 'close'
  | 'idle_status'
  | 'online_status'
  | 'offline_status'
  | 'dnd_status'
  | 'muted'
  | 'unmuted'
  | 'deafened'
  | 'undeafened'
  | 'settings'
  | 'text_bubble'
  | 'text_bubble_plus'
  | 'inbox'
  | 'help'
  | 'three_dots_vertical'
  | 'three_dots_horizontal'
  | 'badge'
  | 'boosting_empty'
  | 'boosting_filled'
  | 'down_chevron'
  | 'hashtag'
  | 'person_add'
  | 'face_add'
  | 'speaker'
  | 'locked_speaker'
  | 'locked_hashtag'
  | 'warning_hashtag'
  | 'bell'
  | 'pin'
  | 'person_multiple'
  | 'search'
  | 'checkmark'
  | 'rich_status';
