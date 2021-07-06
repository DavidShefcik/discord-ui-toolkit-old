import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite';

type TextVariants =
  | 'fun_thin'
  | 'fun_normal'
  | 'fun_bold'
  | 'old_thin'
  | 'old_normal'
  | 'old_bold'
  | 'old_title'
  | 'new_title'
  | 'subtitle'
  | 'link'
  | 'small_code_block'
  | 'large_code_block'
  | 'mention';
interface TextProps {
  text?: string;
  variant?: TextVariants;
  color?: string;
  onClick?(text: string): void;
  children?: ReactNode;
}

const styles = StyleSheet.create({
  fun_thin: {
    fontFamily: 'discord-fun-thin',
  },
  fun_normal: {
    fontFamily: 'discord-fun-normal',
  },
  fun_bold: {
    fontFamily: 'discord-fun-bold',
  },
  titleBase: {
    fontSize: '32px',
    color: 'var(--header-primary)',
    fontWeight: 700,
  },
  newTitle: {
    fontFamily: 'discord-fun-bold',
  },
  oldTitle: {
    fontFamily: 'discord-bold',
  },
  oldThin: {
    fontFamily: 'discord-thin',
  },
  oldNormal: {
    fontFamily: 'discord-normal',
  },
  oldBold: {
    fontFamily: 'discord-bold',
  },
  subtitle: {
    fontFamily: 'discord-normal',
    fontSize: '14px',
    color: 'var(--header-secondary)',
  },
  link: {
    fontFamily: 'discord-normal',
    color: 'var(--text-link)',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  small_code_block: {
    padding: '.2em',
    margin: '-.2em 0',
    borderRadius: '3px',
    fontSize: '85%',
    lineHeight: '1.125rem',
    color: 'var(--text-normal)',
    backgroundColor: 'var(--background-secondary)',
    fontFamily:
      'Consolas,Andale Mono WT,Andale Mono,Lucida Console,Lucida Sans Typewriter,DejaVu Sans Mono,Bitstream Vera Sans Mono,Liberation Mono,Nimbus Mono L,Monaco,Courier New,Courier,monospace',
    border: 'none',
    whiteSpace: 'pre-wrap',
  },
  large_code_block: {
    fontSize: '0.875rem',
    lineHeight: '1.125rem',
    whiteSpace: 'pre-wrap',
    fontFamily:
      'Consolas,Andale Mono WT,Andale Mono,Lucida Console,Lucida Sans Typewriter,DejaVu Sans Mono,Bitstream Vera Sans Mono,Liberation Mono,Nimbus Mono L,Monaco,Courier New,Courier,monospace',
    color: 'var(--header-secondary)',
    backgroundColor: 'var(--background-secondary)',
    borderRadius: '4px',
    border: '1px solid var(--background-tertiary)',
    display: 'block',
    overflowX: 'hidden',
    padding: '.5rem',
  },
  mention: {
    backgroundColor: '#3e404e',
    color: '#797fc8',
    padding: '0 4px',
    fontWeight: 500,
  },
});

export default function Text({ text = '', color, variant = 'old_normal', onClick, children }: TextProps) {
  return (
    <span
      style={{ cursor: onClick ? 'pointer' : 'default', color: color || undefined }}
      className={css([
        variant === 'fun_thin'
          ? styles.fun_thin
          : variant === 'fun_normal'
          ? styles.fun_normal
          : variant === 'fun_bold'
          ? styles.fun_bold
          : variant === 'old_title'
          ? [styles.titleBase, styles.oldTitle]
          : variant === 'new_title'
          ? [styles.titleBase, styles.newTitle]
          : variant === 'subtitle'
          ? styles.subtitle
          : variant === 'link'
          ? styles.link
          : variant === 'small_code_block'
          ? styles.small_code_block
          : variant === 'large_code_block'
          ? styles.large_code_block
          : variant === 'old_thin'
          ? styles.oldThin
          : variant === 'old_normal'
          ? styles.oldNormal
          : variant === 'old_bold'
          ? styles.oldBold
          : styles.mention,
      ])}
      role="button"
      onClick={() => onClick(text)}
    >
      {text}
      {children}
    </span>
  );
}

export { TextVariants, TextProps };
