import React, { MouseEvent, ReactChild } from 'react';
import { StyleSheet, css, CSSProperties } from 'aphrodite';
import { Button as ReakitButton } from 'reakit/Button';
import { PulseLoader } from 'react-spinners';

type ButtonTypes = 'blurple' | 'greyple' | 'green' | 'red_filled' | 'red_empty' | 'white_empty' | 'only_text';
interface ButtonProps {
  text?: string;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
  type?: ButtonTypes;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'normal' | 'large' | 'full' | 'custom';
  width?: string | number;
  height?: string | number;
  childrenPosition?: 'left' | 'right';
  children?: ReactChild;
}

const baseNormalStyle: CSSProperties = {
  borderWidth: 0,
  borderStyle: 'none',
  textDecoration: 'none',
  ':hover': {
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
    padding: '2px 16px',
    outline: 0,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // Disable text highlight select
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  childrenLeft: {
    flexDirection: 'row-reverse',
  },
  childrenRight: {
    flexDirection: 'row',
  },
  blurple: {
    ...baseNormalStyle,
    backgroundColor: 'var(--blurple)',
    color: 'white',
    ':hover': {
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
  },
  green: {
    ...baseNormalStyle,
    backgroundColor: 'var(--green)',
    color: 'white',
    ':hover': {
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
  },
  whiteEmpty: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--header-primary)',
    color: 'var(--header-primary)',
    backgroundColor: 'transparent',
    ':active': {
      backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
    },
  },
  onlyText: {
    ...baseNormalStyle,
    backgroundColor: 'transparent',
    color: 'var(--header-primary)',
    textDecoration: 'none',
    ':hover': {
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
  type = 'blurple',
  disabled,
  loading,
  size = 'normal',
  width = 'auto',
  height = 'auto',
  childrenPosition = 'left',
  children,
}: ButtonProps) {
  const style =
    size === 'small'
      ? { minWidth: '90px', height: '32px' }
      : size === 'normal'
      ? { minWidth: '96px', height: '38px' }
      : size === 'large'
      ? { minWidth: '130px', height: '38px' }
      : size === 'custom'
      ? {
          minWidth: width,
          height,
        }
      : { width: '100%', height: '40px' };

  let buttonType = null;
  switch (type) {
    case 'green':
      buttonType = styles.green;
      break;
    case 'greyple':
      buttonType = styles.greyple;
      break;
    case 'red_filled':
      buttonType = styles.redFilled;
      break;
    case 'red_empty':
      buttonType = styles.redEmpty;
      break;
    case 'white_empty':
      buttonType = styles.whiteEmpty;
      break;
    case 'only_text':
      buttonType = styles.onlyText;
      break;
    default:
      buttonType = styles.blurple;
  }

  return (
    <ReakitButton
      onClick={(event) => onClick && onClick(event)}
      disabled={disabled || loading}
      className={css([
        styles.buttonBase,
        buttonType,
        childrenPosition === 'left' ? styles.childrenLeft : styles.childrenRight,
      ])}
      style={style}
    >
      {loading ? (
        <PulseLoader loading={loading} color={type === 'red_empty' ? '#f04747' : 'white'} size={8} />
      ) : (
        <>
          <span>{text && text}</span>
          <span>{children && children}</span>
        </>
      )}
    </ReakitButton>
  );
}

export { ButtonTypes, ButtonProps };
