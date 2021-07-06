import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

interface TextInputProps {
  value: string;
  onChange(value: string): void;
  onEnterPress?(value: string): void;
  htmlType?: 'text' | 'password' | 'email' | 'phone' | 'email';
  error?: boolean;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
  autoComplete?: boolean;
  spellcheck?: boolean;
  prefix?: string;
}

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
  },
  borderDarkFocused: {
    borderColor: 'var(--text-link)',
  },
  borderRed: {
    borderColor: 'var(--red)',
  },
});

export default function TextInput({
  value,
  onChange,
  onEnterPress,
  htmlType = 'text',
  error = false,
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
  const [focused, setFocused] = useState(false);

  const onKeyDownEvent = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onEnterPress(value);
    }
  };

  return (
    <div style={{ display: 'inline-block', width, height }}>
      <div
        className={css([
          styles.inputBase,
          styles.inputContainer,
          disabled && styles.disabled,
          error
            ? styles.borderRed
            : [
                styles.borderDark,
                !disabled && !focused && styles.borderDarkPsuedos,
                focused && styles.borderDarkFocused,
              ],
        ])}
        style={{ fontSize }}
      >
        {prefix && prefix.length > 0 && <span>{prefix}</span>}
        <input
          className={css([styles.inputBase, styles.input])}
          type={htmlType}
          value={value}
          onChange={(event) => onChange(event.target.value.replace(new RegExp(`^${prefix}$`), ''))}
          onKeyDown={onKeyDownEvent}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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
