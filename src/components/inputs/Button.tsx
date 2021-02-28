import React, { MouseEvent } from 'react';
import { StyleSheet, css, CSSProperties } from 'aphrodite';
import { Button as ReakitButton } from 'reakit/Button';
import { PulseLoader } from 'react-spinners';

type ButtonTypes = 'blurple' | 'greyple' | 'green' | 'red_filled' | 'red_empty' | 'only_text';
type ButtonProps = {
  text: string;
  onClick(event: MouseEvent<HTMLButtonElement>): void;
  type: ButtonTypes;
  disabled?: boolean;
  loading?: boolean;
  width?: string;
  height?: string;
};

const baseNormalStyle: CSSProperties = {
  borderWidth: 0,
  borderStyle: 'none',
  textDecoration: 'none',
  ':hover': {
    borderWidth: 0,
    borderStyle: 'none',
    textDecoration: 'none',
  },
  ':focus': {
    borderWidth: 0,
    borderStyle: 'none',
    textDecoration: 'none',
  },
};
const styles = StyleSheet.create({
  buttonBase: {
    fontFamily: 'discord-normal',
    transition: 'background-color .17s ease,color .17s ease',
    border: 'none',
    borderRadius: '3px',
    fontSize: '14px',
    fontWeight: 500,
    padding: '2px 16',
    outline: 0,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  blurple: {
    ...baseNormalStyle,
    backgroundColor: 'var(--blurple)',
    color: 'white',
    ':hover': {
      backgroundColor: 'var(--blurple-dark)',
    },
    ':focus': {
      backgroundColor: 'var(--blurple-dark)',
    },
  },
  greyple: {
    ...baseNormalStyle,
    backgroundColor: 'var(--greyple)',
    color: 'white',
    ':hover': {
      backgroundColor: 'var(--greyple-dark)',
    },
    ':focus': {
      backgroundColor: 'var(--greyple-dark)',
    },
  },
  green: {
    ...baseNormalStyle,
    backgroundColor: 'var(--green)',
    color: 'white',
    ':hover': {
      backgroundColor: 'var(--green-dark)',
    },
    ':focus': {
      backgroundColor: 'var(--green-dark)',
    },
  },
  redFilled: {
    ...baseNormalStyle,
    backgroundColor: 'var(--red)',
    color: 'white',
    ':hover': {
      backgroundColor: 'var(--red-dark)',
    },
    ':focus': {
      backgroundColor: 'var(--red-dark)',
    },
  },
  redEmpty: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--red)',
    color: 'var(--red)',
    backgroundColor: 'transparent',
    ':hover': {
      borderColor: 'var(--red-dark)',
      color: 'var(--red-dark)',
    },
    ':focus': {
      borderColor: 'var(--red-dark)',
      color: 'var(--red-dark)',
    },
  },
  onlyText: {
    ...baseNormalStyle,
    backgroundColor: 'transparent',
    color: 'white',
    textDecoration: 'none',
    ':hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
    ':focus': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
  },
  loader: {
    transform: 'scale(0.25)',
  },
});

export default function Button({
  text,
  onClick,
  type,
  disabled,
  loading,
  width = '96px',
  height = '38px',
}: ButtonProps) {
  let buttonType = styles.blurple;
  if (type === 'green') {
    buttonType = styles.green;
  } else if (type === 'greyple') {
    buttonType = styles.greyple;
  } else if (type === 'red_filled') {
    buttonType = styles.redFilled;
  } else if (type === 'red_empty') {
    buttonType = styles.redEmpty;
  } else if (type === 'only_text') {
    buttonType = styles.onlyText;
  }
  return (
    <ReakitButton
      onClick={onClick}
      disabled={disabled || loading}
      className={css([styles.buttonBase, buttonType])}
      style={{ width, height }}
    >
      {loading ? <PulseLoader loading={loading} color={type === 'red_empty' ? '#f04747' : 'white'} size={8} /> : text}
    </ReakitButton>
  );
}

export { ButtonTypes, ButtonProps };
