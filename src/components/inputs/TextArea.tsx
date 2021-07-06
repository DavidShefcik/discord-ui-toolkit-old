import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

interface TextAreaProps {
  value: string;
  onChange(value: string): void;
  width?: string;
  minHeight?: string;
  maxHeight?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  showCharacterCount?: boolean;
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  textarea: {
    boxSizing: 'border-box',
    resize: 'none',
    padding: '10px',
    fontSize: '16px',
    color: 'var(--text-normal)',
    fontFamily: 'discord-normal',
    fontWeight: 400,
    width: '100%',
    borderRadius: '3px',
    backgroundColor: 'var(--deprecated-text-input-bg)',
    border: '1px solid var(--deprecated-text-input-border)',
    transition: 'border-color 0.2s ease-in-out',
    outline: 0,
  },
  maxLengthText: {
    position: 'absolute',
    bottom: '12px',
    right: '14px',
    fontSize: '12px',
    fontFamily:
      'Consolas, Andale Mono WT, Andale Mono, Lucida Console, Lucida Sans Typewriter, DejaVu Sans Mono, Bitstream Vera Sans Mono, Liberation Mono, Nimbus Mono L, Monaco, Courier New, Courier, monospace',
    pointerEvents: 'none',
    color: '#72767d',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  borderPsuedos: {
    ':hover': {
      borderColor: 'var(--deprecated-text-input-border-hover)',
    },
  },
  borderFocused: {
    borderColor: 'var(--text-link)',
  },
});

export default function TextArea({
  value,
  onChange,
  width = '100%',
  minHeight,
  maxHeight,
  placeholder,
  maxLength,
  disabled = false,
  showCharacterCount = true,
}: TextAreaProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: 'inline-block', width }} className={css(styles.container)}>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{ height: 'auto', minHeight, maxHeight }}
        className={css([
          styles.textarea,
          disabled && styles.disabled,
          !disabled && !focused && styles.borderPsuedos,
          focused && styles.borderFocused,
        ])}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></textarea>
      {showCharacterCount && <div className={css(styles.maxLengthText)}>{value?.length.toString() || '0'}</div>}
    </div>
  );
}

export { TextAreaProps };
