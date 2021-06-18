import React, { ReactNode, useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';

import ThemeContext from '@internal/context/ThemeContext';

import Button from '@components/inputs/Button';
import ModalBase from './ModalBase';

type ModalProps = {
  visible: boolean;
  setVisible(visible: boolean): void;
  title: string;
  children: ReactNode;
  submitText?: string;
  submitColor?: 'blurple' | 'green' | 'red';
  submitButtonFull?: boolean;
  submitButtonLoading?: boolean;
  submitButtonDisabled?: boolean;
  onSubmitClick(): void;
  cancelText?: string;
  onCancelClick?(): void;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  titleContainer: {
    padding: '16px',
    overflowX: 'hidden',
  },
  titleBase: {
    color: 'var(--header-primary)',
    fontSize: '20px',
    lineHeight: '24px',
  },
  oldText: {
    fontFamily: 'discord-normal',
  },
  newText: {
    fontFamily: 'discord-fun-normal',
  },
  childrenContainer: {
    flexGrow: 1,
    padding: '0 8px 0px 16px',
    minHeight: '0px',
    maxHeight: '350px',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: '16px',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    flexWrap: 'nowrap',
    backgroundColor: 'var(--background-secondary)',
  },
});

export default function Modal({
  visible,
  setVisible,
  title,
  submitText = 'Ok',
  children,
  submitColor = 'blurple',
  submitButtonFull = false,
  submitButtonLoading = false,
  submitButtonDisabled = false,
  onSubmitClick,
  cancelText,
  onCancelClick,
}: ModalProps) {
  const { newMarketingLayout } = useContext<ThemeContextValues>(ThemeContext);

  return (
    <ModalBase visible={visible} setVisible={setVisible}>
      <div className={css(styles.container)}>
        <div className={css(styles.titleContainer)}>
          <div className={css([styles.titleBase, newMarketingLayout ? styles.newText : styles.oldText])}>{title}</div>
        </div>
        <div className={css(styles.childrenContainer)}>{children}</div>
        <div className={css(styles.buttonContainer)}>
          <Button
            type={submitColor === 'blurple' ? 'blurple' : submitColor === 'green' ? 'green' : 'red_filled'}
            size={submitButtonFull ? 'full' : 'normal'}
            text={submitText}
            loading={submitButtonLoading}
            disabled={submitButtonDisabled}
            onClick={() => {
              onSubmitClick();
              setVisible(false);
            }}
          />
          {cancelText && cancelText.length > 0 && (
            <Button
              type="only_text"
              size="normal"
              text={cancelText}
              onClick={() => {
                if (onCancelClick) {
                  onCancelClick();
                }
                setVisible(false);
              }}
            />
          )}
        </div>
      </div>
    </ModalBase>
  );
}

export { ModalProps };
