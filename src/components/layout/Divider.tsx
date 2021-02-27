import React from 'react';
import { StyleSheet, css } from 'aphrodite';

type DividerProps = {
  width?: string;
};

const styles = StyleSheet.create({
  divider: {
    marginTop: '20px',
    borderTop: 'thin solid var(--background-modifier-accent)',
    borderBottom: 0,
    height: '1px',
  },
});

export default function Divider({ width = '100%' }: DividerProps) {
  return <div className={css(styles.divider)} style={{ width }} />;
}

export { DividerProps };
