import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

import useOutsideClickAlerter from '@internal/hooks/useOutsideClickAlerter';
import useAnimateMount from '@internal/hooks/useAnimateMount';

type ModalBaseProps = {
  visible: boolean;
  setVisible(visible: boolean): void;
  children: ReactNode;
  width?: string;
  closeOnOutsideClick?: boolean;
  animated?: boolean;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
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
    opacity: 0,
  },
  backgroundAnimated: {
    transition: 'opacity 175ms ease-in',
  },
  backgroundOpen: {
    opacity: 0.85,
  },
  backgroundClosed: {
    opacity: 0,
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
    minHeight: '200px',
    overflowY: 'hidden',
    overflowX: 'auto',
    borderRadius: '5px',
    margin: '0 auto',
    position: 'relative',
    backgroundColor: 'var(--background-primary)',
    opacity: 0,
    transform: 'scale(0)',
  },
  modalAnimated: {
    transition: 'opacity 175ms ease-in, transform 175ms ease-in',
  },
  modalOpen: {
    opacity: 1,
    transform: 'scale(1)',
  },
  modalClosed: {
    opacity: 0,
    transform: 'scale(0)',
  },
});

export default function ModalBase({
  visible,
  setVisible,
  children,
  width = '440px',
  closeOnOutsideClick = true,
  animated = true,
}: ModalBaseProps) {
  const shouldRender = useAnimateMount({ isMounted: visible, timingInMS: animated ? 200 : 0 });

  const modalContainerRef = useRef<HTMLDivElement>();

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
          visible ? styles.backgroundOpen : styles.backgroundClosed,
        ])}
      />
      <div className={css(styles.content)}>
        <div
          ref={modalContainerRef}
          style={{ width }}
          className={css([
            styles.modal,
            animated && styles.modalAnimated,
            visible ? styles.modalOpen : styles.modalClosed,
          ])}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export { ModalBaseProps };
