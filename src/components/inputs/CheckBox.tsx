import React from 'react';
import { Checkbox as ReakitCheckBox, useCheckboxState } from 'reakit/Checkbox';
import { StyleSheet, css } from 'aphrodite';

type CheckBoxProps = {
  value: boolean;
  label?: string;
  labelSide?: 'left' | 'right';
  backgroundTransparent?: boolean;
  containerWidth?: string;
  disabled?: boolean;
};

const styles = StyleSheet.create({
  container: {
    padding: '10px',
    borderRadius: '3px',
    maxWidth: '100%',
    cursor: 'pointer',
    display: 'flex',
    postion: 'relative',
    alignItems: 'center',
    // Disable text highlight select
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  labelText: {
    fontFamily: 'Arial',
    fontSize: '14px',
    lineHeight: '18px',
  },
  default: {
    color: 'var(--text-normal)',
    backgroundColor: 'var(--background-secondary)',
    ':hover': {
      backgroundColor: 'var(--checkbox-hover)',
      color: 'var(--interactive-hover)',
    },
  },
  defaultTransparent: {
    backgroundColor: 'transparent',
    color: 'var(--text-normal)',
    ':hover': {
      backgroundColor: 'var(--checkbox-hover)',
      color: 'var(--interactive-hover)',
    },
  },
  checked: {
    backgroundColor: 'var(--background-tertiary)',
    color: 'var(--interactive-active)',
  },
  checkboxRight: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  checkboxLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  checkboxInput: {
    width: '24px',
    height: '24px',
    appearance: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    margin: 0,
    padding: 0,
  },
  checkbox: {
    width: '24px',
    height: '24px',
    borderWidth: '1px',
    borderStyle: 'solid',
    flex: '0 0 auto',
    boxSizing: 'border-box',
    borderRadius: '3px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    outline: 0,
  },
  checkboxPaddingRight: {
    marginRight: '8px',
  },
  checkboxPaddingLeft: {
    marginLeft: '8px',
  },
  checkboxUnselected: {
    borderColor: 'var(--checkbox-border)',
  },
  checkboxSelected: {
    borderColor: 'var(--blurple)',
    backgroundColor: 'var(--blurple)',
  },
});

export default function CheckBox({
  value,
  label = '',
  labelSide = 'right',
  backgroundTransparent = false,
  containerWidth = '100%',
  disabled = false,
}: CheckBoxProps) {
  const checkbox = useCheckboxState({ state: value });

  const labelVisible = label && label.length > 0;
  const defaultStyle = backgroundTransparent ? styles.defaultTransparent : styles.default;

  return (
    <div style={{ width: containerWidth, display: 'inline-block' }}>
      <label
        className={css([
          styles.container,
          !checkbox.state ? defaultStyle : styles.checked,
          labelVisible && (labelSide === 'right' ? styles.checkboxRight : styles.checkboxLeft),
        ])}
      >
        <ReakitCheckBox {...checkbox} disabled={disabled} className={css(styles.checkboxInput)} />
        {labelVisible && <span className={css(styles.labelText)}>{label}</span>}
        <div
          className={css([
            styles.checkbox,
            labelVisible && (labelSide === 'right' ? styles.checkboxPaddingRight : styles.checkboxPaddingLeft),
            !checkbox.state ? styles.checkboxUnselected : styles.checkboxSelected,
          ])}
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
            {!checkbox.state ? (
              <path
                fill="transparent"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"
              />
            ) : (
              <path
                fill="#ffffff"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"
              />
            )}
          </svg>
        </div>
      </label>
    </div>
  );
}

export { CheckBoxProps };
