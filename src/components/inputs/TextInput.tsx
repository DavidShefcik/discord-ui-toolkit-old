import React from 'react';
import { StyleSheet, css } from 'aphrodite';

type TextInputProps = {
  value: string;
  onChange(value: string): void;
  htmlType?: 'text' | 'password' | 'email' | 'phone' | 'email';
  borderColor?: 'dark' | 'red';
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
  autoComplete?: boolean;
  spellcheck?: boolean;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: '100%',
    lineHeight: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    borderRadius: '3px',
    backgroundColor: 'var(--text-input-background)',
    color: 'var(--text-normal)',
    fontWeight: 400,
    outline: 0,
    borderWidth: '1px',
    borderStyle: 'solid',
    transition: 'border-color .2s ease-in-out',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  borderDark: {
    borderColor: 'var(--deprecated-text-input-border)',
  },
  borderDarkPsuedos: {
    ':hover': {
      borderColor: 'var(--deprecated-text-input-border-hover)',
    },
    ':focus': {
      borderColor: 'var(--blurple)',
    },
  },
  borderRed: {
    borderColor: 'var(--red)',
  },
});

export default function TextInput({
  value,
  onChange,
  htmlType = 'text',
  borderColor = 'dark',
  placeholder,
  maxLength,
  disabled = false,
  width = '100%',
  height = '40px',
  fontSize = '16px',
  autoComplete = false,
  spellcheck = false,
}: TextInputProps) {
  return (
    <div style={{ display: 'inline-block', width, height }}>
      <input
        className={css([
          styles.input,
          disabled && styles.disabled,
          borderColor === 'dark' ? [styles.borderDark, !disabled && styles.borderDarkPsuedos] : styles.borderRed,
        ])}
        style={{ fontSize }}
        type={htmlType}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        autoComplete={autoComplete ? 'on' : 'off'}
        spellCheck={spellcheck}
      />
    </div>
  );
}

export { TextInputProps };
