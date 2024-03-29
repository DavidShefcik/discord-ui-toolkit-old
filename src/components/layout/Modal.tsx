import React, { ReactNode, MouseEvent } from 'react';
import { StyleSheet, css } from 'aphrodite';

import useThemeContext from '@internal/hooks/useThemeContext';

import Button from '@components/inputs/Button';
import ModalBase from './ModalBase';

interface ModalProps {
  visible: boolean;
  setVisible(visible: boolean): void;
  title: string;
  children: ReactNode;
  onSubmitClick(event: MouseEvent<HTMLButtonElement>): void;
  alwaysCloseOnButtonPress?: boolean;
  closeOnEscapeKeyPress?: boolean;
  onEscapeKeyPress?(event: KeyboardEvent): void;
  submitText?: string;
  submitColor?: 'blurple' | 'green' | 'red';
  submitButtonFull?: boolean;
  submitButtonLoading?: boolean;
  submitButtonDisabled?: boolean;
  cancelText?: string;
  onCancelClick?(event: MouseEvent<HTMLButtonElement>): void;
}

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
  children,
  onSubmitClick,
  alwaysCloseOnButtonPress = true,
  closeOnEscapeKeyPress = true,
  onEscapeKeyPress,
  submitText = 'Ok',
  submitColor = 'blurple',
  submitButtonFull = false,
  submitButtonLoading = false,
  submitButtonDisabled = false,
  cancelText,
  onCancelClick,
}: ModalProps) {
  const { newMarketingColors } = useThemeContext();

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    onSubmitClick(event);
    if (alwaysCloseOnButtonPress) {
      setVisible(false);
    }
  };
  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    if (onCancelClick) {
      onCancelClick(event);
    }
    if (alwaysCloseOnButtonPress) {
      setVisible(false);
    }
  };

  return (
    <ModalBase
      visible={visible}
      setVisible={setVisible}
      closeOnEscapeKeyPress={closeOnEscapeKeyPress}
      onEscapeKeyPress={onEscapeKeyPress}
    >
      <div className={css(styles.container)}>
        <div className={css(styles.titleContainer)}>
          <div className={css([styles.titleBase, newMarketingColors ? styles.newText : styles.oldText])}>{title}</div>
        </div>
        <div className={css(styles.childrenContainer)}>{children}</div>
        <div className={css(styles.buttonContainer)}>
          <Button
            type={submitColor === 'blurple' ? 'blurple' : submitColor === 'green' ? 'green' : 'red_filled'}
            size={submitButtonFull ? 'full' : 'normal'}
            text={submitText}
            loading={submitButtonLoading}
            disabled={submitButtonDisabled}
            onClick={handleSubmit}
          />
          {cancelText && cancelText.length > 0 && (
            <Button type="only_text" size="normal" text={cancelText} onClick={handleClose} />
          )}
        </div>
      </div>
    </ModalBase>
  );
}

export { ModalProps };
