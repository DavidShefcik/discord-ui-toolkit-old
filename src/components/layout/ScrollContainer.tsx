import React, { ReactNode, forwardRef, LegacyRef, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';

type ScrollContainerRef = HTMLDivElement & {
  scrollToBottom(): void;
  scrollToTop(): void;
};

interface ScrollContainerProps {
  children: ReactNode;
  width?: string;
  allowXOverflow?: boolean;
  allowYOverflow?: boolean;
  autoScrollBehavior?: 'smooth' | 'instant';
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default forwardRef<ScrollContainerRef, ScrollContainerProps>(
  ({ children, width = '100%', allowXOverflow = false, allowYOverflow = true, autoScrollBehavior = 'smooth' }, ref) => {
    useEffect(() => {
      if (ref) {
        // @ts-ignore - Doesn't like the current property
        ref.current.scrollToTop = scrollToTop;
        // @ts-ignore - Doesn't like the current property
        ref.current.scrollToBottom = scrollToBottom;
      }
    }, [ref]);

    const scrollToTop = () => {
      if (ref) {
        // @ts-ignore - Doesn't like the current property
        const refDiv = ref.current;

        refDiv.scroll({
          top: 0,
          left: 0,
          behavior: autoScrollBehavior,
        });
      }
    };
    const scrollToBottom = () => {
      if (ref) {
        // @ts-ignore - Doesn't like the current property
        const refDiv = ref.current;

        refDiv.scroll({
          top: refDiv.scrollHeight,
          left: 0,
          behavior: autoScrollBehavior,
        });
      }
    };

    return (
      <div
        ref={ref}
        style={{ overflowX: allowXOverflow ? 'auto' : 'hidden', overflowY: allowYOverflow ? 'auto' : 'hidden', width }}
        className={css(styles.container)}
      >
        {children}
      </div>
    );
  }
);

export { ScrollContainerRef, ScrollContainerProps };
