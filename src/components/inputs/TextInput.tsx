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
  prefix?: string;
};

const styles = StyleSheet.create({
  inputBase: {
    backgroundColor: 'var(--text-input-background)',
    color: 'var(--text-normal)',
    fontFamily: 'discord-normal',
    fontWeight: 400,
    outline: 0,
  },
  inputContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '3px',
    borderWidth: '1px',
    borderStyle: 'solid',
    transition: 'border-color .2s ease-in-out',
    boxSizing: 'border-box',
    padding: '0 10px',
    overflow: 'hidden',
  },
  input: {
    border: 0,
    height: '100%',
    flex: 1,
    padding: '0',
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
  prefix,
}: TextInputProps) {
  return (
    <div style={{ display: 'inline-block', width, height }}>
      <div
        className={css([
          styles.inputBase,
          styles.inputContainer,
          disabled && styles.disabled,
          borderColor === 'dark' ? [styles.borderDark, !disabled && styles.borderDarkPsuedos] : styles.borderRed,
        ])}
        style={{ fontSize }}
      >
        {prefix && prefix.length > 0 && <span>{prefix}</span>}
        <input
          className={css([styles.inputBase, styles.input])}
          type={htmlType}
          value={value}
          onChange={(event) => onChange(event.target.value.replace(new RegExp(`^${prefix}$`), ''))}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          autoComplete={autoComplete ? 'on' : 'off'}
          spellCheck={spellcheck}
          style={{ fontSize }}
        />
      </div>
    </div>
  );
}

export { TextInputProps };
