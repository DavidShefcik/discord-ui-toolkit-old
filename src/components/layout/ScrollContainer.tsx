import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite';

interface ScrollContainerProps {
  children: ReactNode;
  allowXOverflow?: boolean;
  allowYOverflow?: boolean;
  width?: string;
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default function ScrollContainer({
  children,
  allowXOverflow = false,
  allowYOverflow = true,
  width = 'auto',
}: ScrollContainerProps) {
  return (
    <div
      style={{ overflowX: allowXOverflow ? 'auto' : 'hidden', overflowY: allowYOverflow ? 'auto' : 'hidden', width }}
      className={css(styles.container)}
    >
      {children}
    </div>
  );
}

export { ScrollContainerProps };
