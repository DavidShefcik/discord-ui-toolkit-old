import React, { ChangeEvent } from 'react';
import { StyleSheet, css } from 'aphrodite';

type SwitchProps = {
  value: boolean;
  label?: string;
  subLabel?: string;
  containerWidth?: string;
  disabled?: boolean;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    cursor: 'pointer',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topLabelVisible: {
    justifyContent: 'space-between',
  },
  topLabelText: {
    flex: 1,
    display: 'block',
    overflow: 'hidden',
    color: 'var(--header-primary)',
    fontFamily: 'discord-normal',
    lineHeight: '24px',
    fontSize: '16px',
    fontWeight: 500,
    margin: 0,
  },
  bottomLabelText: {
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'discord-normal',
    color: 'var(--header-secondary)',
    marginTop: '8px',
    marginBottom: 0,
  },
  baseCheckbox: {
    borderRadius: '14px',
    cursor: 'pointer',
    position: 'relative',
    width: '40px',
    height: '24px',
    transition: 'all ease 0.17s',
  },
  enabled: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.3,
  },
  checked: {
    backgroundColor: 'var(--green)',
  },
  unChecked: {
    backgroundColor: 'var(--text-muted)',
  },
  slider: {
    display: 'block',
    position: 'absolute',
    width: '28px',
    height: '18px',
    margin: '3px',
  },
  checkboxInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    borderRadius: '14px',
    cursor: 'pointer',
  },
});

export default function Switch({
  value,
  label = '',
  subLabel = '',
  containerWidth = '100%',
  disabled = false,
  onChange,
}: SwitchProps) {
  const SwitchComponent = (
    <div
      className={css([
        styles.baseCheckbox,
        value ? styles.checked : styles.unChecked,
        disabled ? styles.disabled : styles.enabled,
      ])}
    >
      <svg
        className={css(styles.slider)}
        viewBox="0 0 28 20"
        preserveAspectRatio="xMinYMid meet"
        style={{ left: value ? '12px' : '-3px' }}
      >
        {value ? (
          <>
            <rect fill="white" x="4" y="0" height="20" width="20" rx="10" />
            <svg viewBox="0 0 20 20" fill="none">
              <path
                fill="rgba(67, 181, 129, 1)"
                d="M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z"
              />
              <path
                fill="rgba(67, 181, 129, 1)"
                d="M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z"
              />
            </svg>
          </>
        ) : (
          <>
            <rect fill="white" x="4" y="0" height="20" width="20" rx="10" />
            <svg viewBox="0 0 20 20" fill="none">
              <path
                fill="rgba(114, 118, 125, 1)"
                d="M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z"
              />
              <path
                fill="rgba(114, 118, 125, 1)"
                d="M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z"
              />
            </svg>
          </>
        )}
      </svg>
      <input
        className={css(styles.checkboxInput)}
        type="checkbox"
        checked={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );

  const labelVisible = label && label.length > 0;
  const subLabelVisible = subLabel && subLabel.length > 0;

  return (
    <div style={{ width: containerWidth, display: 'inline-block' }}>
      <label className={css(styles.container)}>
        <div className={css([styles.topContainer, labelVisible && styles.topLabelVisible])}>
          {labelVisible && <p className={css(styles.topLabelText)}>{label}</p>}
          {SwitchComponent}
        </div>
        {subLabelVisible && <p className={css(styles.bottomLabelText)}>{subLabel}</p>}
      </label>
    </div>
  );
}

export { SwitchProps };
