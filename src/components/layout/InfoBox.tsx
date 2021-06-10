import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite';

type InfoBoxProps = {
  children: ReactNode;
  variant?: 'normal' | 'error' | 'warning' | 'notice';
  width?: string;
};

const styles = StyleSheet.create({
  container: {
    fontSize: '14px',
    lineHeight: '18px',
    padding: '16px 22px',
    boxSizing: 'border-box',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '5px',
    color: 'var(--header-primary)',
    overflow: 'hidden',
  },
  normal: {
    backgroundColor: 'var(--background-secondary)',
    borderColor: 'var(--background-tertiary)',
  },
  error: {
    backgroundColor: 'rgba(237, 66, 69, 0.1)',
    borderColor: 'rgba(237, 66, 69, 0.5)',
  },
  warning: {
    backgroundColor: 'rgba(254, 231, 92, 0.1)',
    borderColor: 'rgba(254, 231, 92, 0.5)',
  },
  notice: {
    backgroundColor: 'rgba(88, 101, 242, 0.1)',
    borderColor: 'rgba(88, 101, 242, 0.5)',
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
