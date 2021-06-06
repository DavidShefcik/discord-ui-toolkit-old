import React, { ReactChild } from 'react';
import { StyleSheet, css } from 'aphrodite';

type FormItemProps = {
  label: string;
  children: ReactChild;
  containerWidth?: string;
  error?: boolean;
  errorMessage?: string;
  requiredIndicator?: boolean;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: '20px',
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'var(--channels-default)',
    fontSize: '12px',
    lineHeight: '16px',
    marginBottom: '8px',
    fontWeight: 600,
    fontFamily: 'discord-bold',
    textTransform: 'uppercase',
  },
  labelError: {
    color: 'var(--red)',
  },
  requiredIndicator: {
    color: 'var(--red)',
    padding: '0 1px',
  },
  errorMessage: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '12px',
    fontWeight: 500,
    fontFamily: 'discord-normal',
    fontStyle: 'italic',
    textTransform: 'none',
  },
  errorSeperator: {
    padding: '0 4px',
  },
});

export default function FormItem({
  label,
  children,
  containerWidth = '100%',
  error = false,
  errorMessage = '',
  requiredIndicator = false,
}: FormItemProps) {
  return (
    <div style={{ width: containerWidth, display: 'inline-block' }}>
      <div className={css(styles.container)}>
        <span className={css([styles.label, error && styles.labelError])}>
          {label}
          {requiredIndicator && <span className={css(styles.requiredIndicator)}>*</span>}
          {error && errorMessage.length > 0 && (
            <span className={css(styles.errorMessage)}>
              <span className={css(styles.errorSeperator)}>-</span>
              {errorMessage}
            </span>
          )}
        </span>
        {children}
      </div>
    </div>
  );
}

export { FormItemProps };
