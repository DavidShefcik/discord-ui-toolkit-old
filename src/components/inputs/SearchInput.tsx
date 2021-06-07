import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import IconComponent from '@layout/Icon';

type SearchInputProps = {
  value: string;
  onChange(value: string): void;
  placeholder?: string;
  width?: string;
  widenOnValue?: boolean;
};

const styles = StyleSheet.create({
  container: {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    height: '24px',
    borderRadius: '4px',
    cursor: 'text',
    overflow: 'hidden',
    padding: '0 4px',
    color: 'var(--text-normal)',
    backgroundColor: 'var(--background-tertiary)',
  },
  input: {
    flex: 1,
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'discord-normal',
    color: 'var(--text-normal)',
    lineHeight: '20px',
    padding: '0 2px',
    outline: 0,
    backgroundColor: 'transparent',
    border: 0,
    boxSizing: 'border-box',
  },
});

export default function SearchInput({
  value,
  onChange,
  placeholder = '',
  width = '75%',
  widenOnValue = true,
}: SearchInputProps) {
  return (
    <div
      style={{ width: widenOnValue && value && value.trim().length > 0 ? '100%' : width }}
      className={css(styles.container)}
    >
      <input
        className={css(styles.input)}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && value.trim().length > 0 ? (
        <IconComponent iconColor="var(--text-muted)" icon="close" size={16} onClick={() => onChange('')} />
      ) : (
        <IconComponent iconColor="var(--text-muted)" icon="search" size={16} />
      )}
    </div>
  );
}

export { SearchInputProps };
