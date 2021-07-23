import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite';
import useOutsideClickAlerter from '@internal/hooks/useOutsideClickAlerter';
import Emoji from '@layout/Emoji';
import IconComponent from '@layout/Icon';

import { IconNamesType } from '@internal/values/icons';

interface SelectItem {
  id: string | null;
  label: string;
  heplerText?: string;
  icon?: IconNamesType;
  emoji?: string;
}
interface InternalSelectItemProps {
  onClick?(clickedId: string | number | null): void;
}
interface DropdownItemProps {
  children: ReactNode;
  selected: boolean;
}
interface SelectProps {
  value: SelectItem | string | number | null;
  onChange(value: string | number | null): void;
  items: SelectItem[];
  dropdownLocation?: 'top' | 'bottom';
  unselectedAsOption?: boolean;
  unselectedLabel?: string;
  unselectedHelperText?: string;
  containerWidth?: string;
  disabled?: boolean;
  error?: boolean;
}

const styles = StyleSheet.create({
  select: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: 'var(--select-background)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    height: '40px',
    position: 'relative',
    transition: 'border-color .15s ease 0s',
    boxSizing: 'border-box',
    outline: 0,
    // Disable text highlight select
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  selectOpen: {
    borderColor: 'var(--select-border-hover)',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
  },
  selectClosed: {
    borderColor: 'var(--select-border)',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    ':hover': {
      borderColor: 'var(--select-border-hover)',
    },
  },
  selectDisabled: {
    cursor: 'not-allowed',
    borderColor: 'var(--select-border)',
    opacity: 0.5,
  },
  selectError: {
    borderColor: 'var(--red)',
  },
  selectItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: '1 1 0%',
    flexWrap: 'wrap',
    position: 'relative',
    boxSizing: 'border-box',
    height: '40px',
    backgroundColor: 'transparent',
    outline: 0,
  },
  selectItemContent: {
    maxWidth: 'calc(100% - 8px)',
    margin: '0 2px',
    position: 'absolute',
    whiteSpace: 'nowrap',
    top: '50%',
    transform: 'translateY(-50%)',
    boxSizing: 'border-box',
    opacity: 1,
    display: 'block',
  },
  chevron: {
    color: 'var(--select-chevron)',
    display: 'flex',
    paddingRight: '8px',
    transition: 'color 150ms ease 0s',
    boxSizing: 'border-box',
    cursor: 'pointer',
    opacity: 1,
  },
  chevronIcon: {
    display: 'inline-block',
    fill: 'currentcolor',
    lineHeight: 1,
    stroke: 'currentcolor',
    strokeWidth: 0,
  },
  labelContainer: {
    flex: '1 1 0%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'baseline',
    position: 'relative',
    overflow: 'hidden',
    padding: '2px 8px',
  },
  label: {
    fontFamily: 'discord-normal',
    color: 'var(--text-normal)',
    whiteSpace: 'nowrap',
    margin: '0 4px',
    fontSize: '16px',
    lineHeight: '20px',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
  },
  leftImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    minWidth: '48px',
    textTransform: 'uppercase',
    boxSizing: 'border-box',
    color: 'var(--text-normal)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    opacity: 0.3,
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 600,
    fontFamily: 'discord-bold',
    marginTop: 0,
    marginBottom: 0,
  },
  dropdownMenu: {
    backgroundColor: 'var(--background-secondary)',
    borderRadius: '0 0 4px 4px',
    boxShadow: '0px 1px 5px 0px rgb(32 34 37 / 50%)',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    boxSizing: 'border-box',
    border: '1px solid var(--background-tertiary)',
    color: 'var--text-normal)',
  },
  bottomDropdown: {
    top: '100%',
    marginBottom: '-1px',
    marginTop: '-1px',
  },
  topDropdown: {
    bottom: '100%',
    marginBottom: '-1px',
  },
  dropdownContent: {
    maxHeight: '300px',
    overflowY: 'auto',
    position: 'relative',
    boxSizing: 'border-box',
    padding: '0',
  },
  dropdownItem: {
    cursor: 'pointer',
    outline: 0,
  },
  dropdownItemBase: {
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: 'var(--select-item-hover)',
    },
  },
  dropdownItemSelected: {
    backgroundColor: 'var(--select-border-hover)',
  },
});

function isSelectItem(item: SelectItem | string | number | null): item is SelectItem {
  return (item as SelectItem)?.id !== undefined;
}

function Chevron() {
  return (
    <span className={css(styles.chevron)}>
      <svg
        height="20"
        width="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        focusable="false"
        className={css(styles.chevronIcon)}
      >
        <path d="M4.516 7.548c0.436-0.4461.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />{' '}
      </svg>
    </span>
  );
}

function SelectItemComponent({ id, label, heplerText, icon, emoji, onClick }: SelectItem & InternalSelectItemProps) {
  const helperTextVisible = heplerText && heplerText.length > 0;

  if (icon && emoji) {
    throw new Error('Select item cannot have both emoji and an icon.');
  }

  return (
    <div className={css(styles.selectItem)} onClick={() => onClick && onClick(id)}>
      <div className={css(styles.selectItemContent)}>
        <div className={css(styles.labelContainer)}>
          {icon ? (
            <div style={{ alignSelf: 'center' }}>
              <IconComponent icon={icon} size={16} iconColor="var(--text-normal)" />
            </div>
          ) : emoji ? (
            <div style={{ alignSelf: 'center' }}>
              <Emoji emoji={emoji} color={false} size={16} />
            </div>
          ) : null}
          <span className={css(styles.label)}>{label}</span>
          {helperTextVisible && <span className={css(styles.helperText)}>{heplerText}</span>}
        </div>
      </div>
    </div>
  );
}

function DropdownItem({ children, selected }: DropdownItemProps) {
  const dropdownStyle = selected ? styles.dropdownItemSelected : styles.dropdownItemBase;

  return <div className={css([styles.dropdownItem, dropdownStyle])}>{children}</div>;
}

export default function Select({
  value,
  onChange,
  items,
  dropdownLocation = 'bottom',
  unselectedLabel,
  unselectedAsOption = false,
  unselectedHelperText,
  containerWidth = '100%',
  disabled = false,
  error = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string | number>(null);

  const selectContainerRef = useRef<HTMLDivElement>();

  useOutsideClickAlerter({
    ref: selectContainerRef,
    onOutsideClick: () => setOpen(false),
  });

  let selectStyle = styles.selectClosed;
  if (open) {
    selectStyle = styles.selectOpen;
  }
  if (disabled) {
    selectStyle = styles.selectDisabled;
  }
  if (error) {
    selectStyle = styles.selectError;
  }

  useEffect(() => {
    if (value !== undefined) {
      let newValue = isSelectItem(value) ? value.id : value;
      if (!newValue && !unselectedLabel) {
        newValue = items[0].id;
      }

      setCurrentId(newValue);
    }
  }, [value]);

  return (
    <div style={{ display: 'inline-block', width: containerWidth, position: 'relative' }} ref={selectContainerRef}>
      <div className={css([styles.select, selectStyle])} onClick={() => !disabled && setOpen(!open)} role="button">
        {unselectedLabel && !currentId ? (
          <SelectItemComponent id={null} label={unselectedLabel} heplerText={unselectedHelperText} />
        ) : (
          <SelectItemComponent {...items.find((item) => item.id === currentId)} />
        )}
        <Chevron />
      </div>
      {open && (
        <div
          className={css([
            styles.dropdownMenu,
            dropdownLocation === 'bottom' ? styles.bottomDropdown : styles.topDropdown,
          ])}
        >
          <div className={css(styles.dropdownContent)}>
            {unselectedLabel && unselectedAsOption && (
              <DropdownItem selected={currentId === null}>
                <SelectItemComponent
                  onClick={() => {
                    setCurrentId(null);
                    onChange(null);
                    setOpen(false);
                  }}
                  id={null}
                  label={unselectedLabel}
                  heplerText={unselectedHelperText}
                />
              </DropdownItem>
            )}
            {items.map((item) => (
              <DropdownItem selected={currentId === item.id} key={item.id}>
                <SelectItemComponent
                  onClick={(clickedId: string | number) => {
                    setCurrentId(clickedId);
                    onChange(clickedId);
                    setOpen(false);
                  }}
                  {...item}
                />
              </DropdownItem>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { SelectItem, SelectProps };
