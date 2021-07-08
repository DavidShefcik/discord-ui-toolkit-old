import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite';

interface InfoBoxProps {
  children: ReactNode;
  variant?: 'normal' | 'error' | 'warning' | 'notice';
  width?: string;
}

const styles = StyleSheet.create({
  container: {
    fontSize: '14px',
    lineHeight: '18px',
    padding: '16px 22px',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderRadius: '5px',
    color: 'var(--header-primary)',
    overflow: 'hidden',
  },
  normal: {
    backgroundColor: 'var(--background-secondary)',
    borderColor: 'var(--background-tertiary)',
    borderWidth: '1px',
  },
  error: {
    backgroundColor: '#493a40',
    borderColor: 'rgba(237, 66, 69, 0.5)',
    borderWidth: '2px',
  },
  warning: {
    backgroundColor: '#4a4b42',
    borderColor: 'rgba(254, 231, 92, 0.5)',
    borderWidth: '2px',
  },
  notice: {
    backgroundColor: '#393d52',
    borderColor: 'rgba(88, 101, 242, 0.5)',
    borderWidth: '2px',
  },
});

export default function InfoBox({ children, variant = 'normal', width = '100%' }: InfoBoxProps) {
  return (
    <div
      style={{ width }}
      className={css([
        styles.container,
        variant === 'normal'
          ? styles.normal
          : variant === 'error'
          ? styles.error
          : variant === 'notice'
          ? styles.notice
          : styles.warning,
      ])}
    >
      {children}
    </div>
  );
}

export { InfoBoxProps };
