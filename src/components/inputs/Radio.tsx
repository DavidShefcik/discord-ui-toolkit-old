import React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface RadioItem {
  id: string | number;
  title: string;
  description?: string;
  borderLeftColor?: string;
}
interface RadioProps {
  items: RadioItem[];
  onChange(newValue: string | number): void;
  value?: string | number;
  containerWidth?: string;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    cursor: 'pointer',
    borderRadius: '4px',
    marginBottom: '8px',
    borderLeftStyle: 'solid',
    borderLeftWidth: '3px',
    padding: '10px',
    outline: 0,
  },
  itemUnselected: {
    backgroundColor: 'var(--background-secondary)',
    color: 'var(--interactive-normal)',
    ':hover': {
      backgroundColor: 'var(--checkbox-hover)',
      color: 'var(--interactive-hover)',
    },
  },
  itemSelected: {
    backgroundColor: 'var(--background-tertiary)',
    color: 'var(--interactive-active)',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 600,
    margin: 0,
    fontFamily: 'discord-bold',
    // Disable text highlight select
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  titleBottomMargin: {
    marginBottom: '4px',
  },
  description: {
    fontSize: '14px',
    lineHeight: '18px',
    margin: 0,
    fontFamily: 'discord-normal',
    // Disable text highlight select
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  radioContainer: {
    width: '24px',
    marginRight: '8px',
  },
  radioIconForeground: {
    color: 'var(--radio-group-dot-foreground)',
  },
});

export default function Radio({ items, onChange, value = null, containerWidth }: RadioProps) {
  return (
    <div style={{ width: containerWidth, display: 'inline-block' }}>
      <div className={css(styles.container)} role="radiogroup">
        {items.map((item) => {
          const { id, title, description, borderLeftColor } = item;

          const titleVisible = title && title.length > 0;
          const descriptionVisible = description && description.length > 0;
          const currentItemSelected = value === id;
          const itemSelectClass = currentItemSelected ? styles.itemSelected : styles.itemUnselected;

          return (
            <div
              key={id}
              className={css([styles.itemContainer, itemSelectClass])}
              style={{ borderLeftColor: borderLeftColor ?? 'transparent' }}
              role="radio"
              aria-checked={value === id}
              onClick={() => {
                onChange(id);
              }}
            >
              <div className={css(styles.radioContainer)}>
                <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="currentColor"
                  />
                  {currentItemSelected && (
                    <>
                      <circle cx="12" cy="12" r="5" className={css(styles.radioIconForeground)} fill="currentColor" />
                    </>
                  )}
                </svg>
              </div>
              <div className={css(styles.textContainer)}>
                {titleVisible && (
                  <p className={css([styles.title, descriptionVisible && styles.titleBottomMargin])}>{title}</p>
                )}
                {descriptionVisible && <p className={css(styles.description)}>{description}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { RadioItem, RadioProps };
