import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite';

type ScrollContainerProps = {
  children: ReactNode;
  allowXOverflow?: boolean;
  allowYOverflow?: boolean;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});

export default function ScrollContainer({
  children,
  allowXOverflow = false,
  allowYOverflow = false,
}: ScrollContainerProps) {
  return (
    <div
      style={{ overflowX: allowXOverflow ? 'auto' : 'hidden', overflowY: allowYOverflow ? 'auto' : 'hidden' }}
      className={css(styles.container)}
    >
      {children}
    </div>
  );
}

export { ScrollContainerProps };
