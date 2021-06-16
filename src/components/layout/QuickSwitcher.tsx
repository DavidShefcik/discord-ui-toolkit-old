import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite';

import ModalBase from './ModalBase';
import ScrollContainer from './ScrollContainer';

type QuickSwitcherProps = {
  value: string;
  onChange(value: string): void;
  visible: boolean;
  setVisible(visible: boolean): void;
  children: ReactNode;
  placeholder?: string;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    boxSizing: 'border-box',
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0 12px',
    fontSize: '22px',
    fontFamily: 'discord-normal',
    color: 'var(--text-normal)',
    borderRadius: '5px',
    border: 'none',
    height: '70px',
    lineHeight: '70px',
    backgroundColor: 'var(--deprecated-quickswitcher-input-background)',
    boxShadow: 'var(--elevation-high)',
    outline: 0,
    flex: 1,
    '::placeholder': {
      fontFamily: 'discord-thin',
      color: 'var(--deprecated-quickswitcher-input-placeholder)',
    },
  },
  childContainer: {
    flex: 1,
    boxSizing: 'border-box',
    padding: '0 20px 20px',
    maxHeight: '236px',
  },
});

export default function QuickSwitcherSearch({
  value,
  onChange,
  visible,
  setVisible,
  children,
  placeholder,
}: QuickSwitcherProps) {
  return (
    <ModalBase visible={visible} setVisible={(val) => setVisible(val)} animated={false} minHeight="90px" width="570px">
      <div className={css(styles.container)}>
        <input
          className={css(styles.input)}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      </div>
      <ScrollContainer>
        <div className={css(styles.childContainer)}>{children}</div>
      </ScrollContainer>
    </ModalBase>
  );
}

export { QuickSwitcherProps };
