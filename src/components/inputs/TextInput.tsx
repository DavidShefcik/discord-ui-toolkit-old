import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

interface TextInputProps {
  value: string;
  onChange(value: string): void;
  onEnterPress?(value: string): void;
  htmlType?: 'text' | 'password' | 'email' | 'phone' | 'email';
  label?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
  autoComplete?: boolean;
  autoFocus?: boolean;
  spellcheck?: boolean;
  prefix?: string;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontSize: '12px',
    lineHeight: '16px',
  },
  labelText: {
    color: 'var(--header-secondary)',
    fontFamily: 'discord-bold',
    textTransform: 'uppercase',
  },
  redLabel: {
    color: 'var(--red)',
  },
  labelErrorSeparator: {
    padding: '0 4px',
  },
  labelErrorText: {
    color: 'var(--red)',
    fontFamily: 'discord-normal',
    fontStyle: 'italic',
  },
  inputBase: {
    backgroundColor: 'var(--text-input-background)',
    color: 'var(--text-normal)',
    fontFamily: 'discord-normal',
    fontWeight: 400,
    outline: 0,
  },
  inputContainer: {
    width: '100%',
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
  disabledCursor: {
    cursor: 'not-allowed',
  },
  disabledOpacity: {
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
  label = '',
  error = false,
  errorText,
  placeholder,
  maxLength,
  disabled = false,
  width = '100%',
  height = '40px',
  fontSize = '16px',
  autoComplete = false,
  spellcheck = false,
  autoFocus = false,
  prefix,
}: TextInputProps) {
  const [focused, setFocused] = useState(false);

  const onKeyDownEvent = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onEnterPress && onEnterPress(value);
    } else if (prefix && event.key.toLowerCase() === prefix.toLowerCase()) {
      event.preventDefault();
    }
  };

  let labelVisible = label || errorText;
  let labelDashVisible = label && errorText;

  return (
    <div style={{ display: 'inline-block', width }}>
      <div className={css(styles.container)}>
        {labelVisible && (
          <span className={css(styles.label)}>
            <span className={css([styles.labelText, error && styles.redLabel])}>{label}</span>
            {error && errorText && (
              <span className={css(styles.labelErrorText)}>
                {labelDashVisible && <span className={css(styles.labelErrorSeparator)}>-</span>}
                {errorText}
              </span>
            )}
          </span>
        )}
        <div
          className={css([
            styles.inputBase,
            styles.inputContainer,
            disabled && [styles.disabledOpacity, styles.disabledCursor],
            error
              ? styles.borderRed
              : [
                  styles.borderDark,
                  !disabled && !focused && styles.borderDarkPsuedos,
                  focused && styles.borderDarkFocused,
                ],
          ])}
          style={{ fontSize, height }}
        >
          {prefix && prefix.length > 0 && <span>{prefix}</span>}
          <input
            className={css([styles.inputBase, styles.input, disabled && styles.disabledCursor])}
            type={htmlType}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            // @ts-ignore
            onKeyDown={onKeyDownEvent}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            autoComplete={autoComplete ? 'on' : 'off'}
            spellCheck={spellcheck}
            autoFocus={autoFocus}
            style={{ fontSize }}
          />
        </div>
      </div>
    </div>
  );
}

export { TextInputProps };
