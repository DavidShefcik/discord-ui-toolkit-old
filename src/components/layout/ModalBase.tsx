import React, { ReactNode, useRef, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';

import useOutsideClickAlerter from '@internal/hooks/useOutsideClickAlerter';
import useAnimateMount from '@internal/hooks/useAnimateMount';

interface ModalBaseProps {
  visible: boolean;
  setVisible(visible: boolean): void;
  children: ReactNode;
  width?: string;
  minHeight?: string;
  closeOnOutsideClick?: boolean;
  animated?: boolean;
}

const backgroundOpenAnimation = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 0.85,
  },
};
const backgroundCloseAnimation = {
  from: {
    opacity: 0.85,
  },
  to: {
    opacity: 0,
  },
};
const modalOpenAnimation = {
  from: {
    opacity: 0,
    transform: 'scale(0)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1)',
  },
};
const modalCloseAnimation = {
  from: {
    opacity: 1,
    transform: 'scale(1)',
  },
  to: {
    opacity: 0,
    transform: 'scale(0)',
  },
};

const animationBase = {
  animationIterationCount: 1,
};
const animatedBase = {
  ...animationBase,
  animationDuration: '175ms',
};
const notAnimatedBase = {
  ...animationBase,
  animationDuration: '0',
};

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'none',
    zIndex: 1000,
  },
  background: {
    backgroundColor: 'hsl(0, calc(var(--saturation-factor, 1) * 0%), 0%)',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transform: 'translateZ(0)',
    opacity: 0.85,
  },
  backgroundAnimated: {
    transition: 'opacity 175ms forwards',
  },
  backgroundOpenAnimation: {
    animationName: [backgroundOpenAnimation],
    ...animatedBase,
  },
  backgroundOpenWithoutAnimation: {
    animationName: [backgroundOpenAnimation],
    ...notAnimatedBase,
  },
  backgroundCloseAnimation: {
    animationName: [backgroundCloseAnimation],
    ...animatedBase,
  },
  backgroundCloseWithoutAnimation: {
    animationName: [backgroundCloseAnimation],
    ...notAnimatedBase,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0',
    boxSizing: 'border-box',
    height: '100vh',
  },
  modal: {
    boxShadow: '0 0 0 1px rgba(32, 34, 37, 0.6), 0 2px 10px 0 rgba(0, 0, 0, 0.2)',
    maxHeight: '660px',
    overflowY: 'hidden',
    overflowX: 'auto',
    borderRadius: '5px',
    margin: '0 auto',
    position: 'relative',
    backgroundColor: 'var(--background-primary)',
    display: 'flex',
    flexDirection: 'column',
  },
  modalAnimated: {
    transition: 'opacity 175ms forwards, transform 175ms forwards',
  },
  modalOpenAnimation: {
    animationName: [modalOpenAnimation],
    ...animatedBase,
  },
  modalOpenWithoutAnimation: {
    animationName: [modalOpenAnimation],
    ...notAnimatedBase,
  },
  modalCloseAnimation: {
    animationName: [modalCloseAnimation],
    ...animatedBase,
  },
  modalCloseWithoutAnimation: {
    animationName: [modalCloseAnimation],
    ...notAnimatedBase,
  },
});

export default function ModalBase({
  visible,
  setVisible,
  children,
  width = '440px',
  minHeight = '200px',
  closeOnOutsideClick = true,
  animated = true,
}: ModalBaseProps) {
  const shouldRender = useAnimateMount({ isMounted: visible, timingInMS: animated ? 170 : 0 });

  const modalContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [visible]);

  useOutsideClickAlerter({
    ref: modalContainerRef,
    onOutsideClick: () => {
      if (closeOnOutsideClick) {
        setVisible(false);
      }
    },
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={css(styles.container)}>
      <div
        className={css([
          styles.background,
          animated && styles.backgroundAnimated,
          visible
            ? animated
              ? styles.backgroundOpenAnimation
              : styles.backgroundOpenWithoutAnimation
            : animated
            ? styles.backgroundCloseAnimation
            : styles.backgroundCloseWithoutAnimation,
        ])}
      />
      <div className={css(styles.content)}>
        <div
          ref={modalContainerRef}
          style={{ width, minHeight }}
          className={css([
            styles.modal,
            animated && styles.modalAnimated,
            visible
              ? animated
                ? styles.modalOpenAnimation
                : styles.modalOpenWithoutAnimation
              : animated
              ? styles.modalCloseAnimation
              : styles.modalCloseWithoutAnimation,
          ])}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export { ModalBaseProps };
