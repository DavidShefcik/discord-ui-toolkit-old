import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Button from '@inputs/Button';

type ToastProps = {
  text: string;
  visible: boolean;
  setVisible(visible: boolean): void;
  width?: string;
  okText?: string;
  onOkClick?(): void;
  error?: boolean;
  cancelText?: string;
  onCancelClick?(): void;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'var(--deprecated-card-bg)',
    boxShadow: 'var(--elevation-high)',
    padding: '10px 10px 10px 16px',
    overflow: 'hidden',
    borderRadius: '5px',
    transition: 'background-color .15s ease',
  },
  error: {
    backgroundColor: 'var(--red)',
  },
  content: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
  },
  text: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'var(--toast-text-color)',
    marginRight: '10px',
    fontFamily: 'discord-normal',
    fontSize: '16px',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  buttonContainer: {
    flex: '0 1 auto',
    marginLeft: '10px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
});

export default function Toast({
  text,
  visible,
  setVisible,
  width = '100%',
  okText,
  onOkClick,
  error = false,
  cancelText,
  onCancelClick,
}: ToastProps) {
  if (!visible) {
    return null;
  }

  return (
    <div style={{ width }} className={css([styles.container, error && styles.error])}>
      <div className={css(styles.content)}>
        <div className={css(styles.text)}>{text}</div>
        {(okText || cancelText) && (
          <div className={css(styles.buttonContainer)}>
            {cancelText && (
              <Button
                text={cancelText}
                type="only_text"
                size="small"
                onClick={() => {
                  setVisible(false);
                  if (onCancelClick) {
                    onCancelClick();
                  }
                }}
              />
            )}
            {okText && (
              <Button
                text={okText}
                type="green"
                size="small"
                onClick={() => {
                  setVisible(false);
                  if (onOkClick) {
                    onOkClick();
                  }
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { ToastProps };
