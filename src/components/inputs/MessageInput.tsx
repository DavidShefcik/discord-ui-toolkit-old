import React, { useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';
import IconComponent from '@layout/Icon';

import { IconNamesType } from '@internal/values/icons';

interface MessageInputSideItem {
  id: string;
  value: IconNamesType;
  onClick?(icon: IconNamesType): void;
}
interface MessageInputProps {
  value: string;
  onChange(value: string): void;
  onEnterPress?(value: string): void;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  autoComplete?: boolean;
  spellcheck?: boolean;
  leftItems?: MessageInputSideItem[];
  rightItems?: MessageInputSideItem[];
  underInputText?: string;
  aboveInputVariant?: 'error' | 'notice';
  aboveInputText?: string;
  aboveInputOnClick?(): void;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: 'var(--channeltextarea-background)',
    maxHeight: '50vh',
    borderRadius: '8px',
    position: 'relative',
    zIndex: 3,
  },
  inner: {
    paddingLeft: '16px',
    display: 'flex',
    flexDirection: 'row',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '44px',
    position: 'sticky',
    top: 0,
  },
  textArea: {
    padding: 0,
    position: 'relative',
    resize: 'none',
    border: 'none',
    appearance: 'none',
    boxSizing: 'border-box',
    lineHeight: '1.375rem',
    outline: 0,
    width: '100%',
    minHeight: '44px',
  },
  textAreaBase: {
    outline: 0,
    padding: '11px 10px 11px 0',
    boxSizing: 'border-box',
    left: 0,
    right: '10px',
    textAlign: 'left',
    fontSize: '16px',
    fontFamily: 'discord-normal',
  },
  placeholder: {
    display: 'block',
    height: '100%',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    color: 'var(--text-muted)',
    zIndex: 0,
    position: 'absolute',
  },
  input: {
    width: '100%',
    minHeight: '44px',
    lineHeight: '1.375rem',
    outline: 0,
    boxSizing: 'border-box',
    padding: '11px 10px 11px 0',
    right: '10px',
    textAlign: 'left',
    fontSize: '16px',
    fontFamily: 'discord-normal',
    'caret-color': 'var(--text-normal)',
    color: 'var(--text-normal)',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    'overflow-wrap': 'break-word',
    position: 'relative',
    zIndex: 10,
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  underInput: {
    position: 'absolute',
    bottom: '-23px',
    height: '24px',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '24px',
    overflowY: 'hidden',
    color: 'var(--text-normal)',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 12px',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',
  },
  aboveInputBase: {
    outline: 0,
    position: 'absolute',
    top: '-22px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
    height: '24px',
    paddingBottom: '4px',
    width: '100%',
    bottom: 0,
    borderRadius: '8px 8px 0 0',
    opacity: 0.95,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  aboveInputNotice: {
    backgroundColor: 'var(--background-accent)',
  },
  aboveInputError: {
    backgroundColor: 'var(--red)',
  },
  aboveInputText: {
    textAlign: 'left',
    color: 'white',
    fontFamily: 'discord-bold',
    fontWeight: 500,
    padding: '0 12px',
    fontSize: '14px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

function MessageInputSideItemComponent({ value, onClick }: MessageInputSideItem) {
  return (
    <IconComponent
      icon={value as IconNamesType}
      iconColor="var(--interactive-normal)"
      iconHoverColor="var(--interactive-hover)"
      onClick={(icon) => onClick(icon)}
      size={24}
      animated={false}
    />
  );
}

export default function MessageInput({
  value,
  onChange,
  onEnterPress,
  placeholder,
  disabled = false,
  width = '100%',
  autoComplete = false,
  spellcheck = false,
  leftItems,
  rightItems,
  aboveInputText,
  aboveInputVariant,
  aboveInputOnClick,
  underInputText,
}: MessageInputProps) {
  const defaultValue = useRef(value);

  const onKeyDownEvent = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onEnterPress(value);
    }
  };

  const onInputEvent = (event) => {
    onChange(event.target.innerText);
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative', width }}>
      {aboveInputText && aboveInputText.length > 0 && aboveInputVariant && (
        <div
          className={css([
            styles.aboveInputBase,
            aboveInputVariant === 'notice' ? styles.aboveInputNotice : styles.aboveInputError,
          ])}
          style={{ cursor: aboveInputOnClick && 'pointer' }}
          role="button"
          onClick={aboveInputOnClick}
        >
          <span className={css(styles.aboveInputText)}>{aboveInputText}</span>
        </div>
      )}
      <div className={css(styles.container)}>
        <div className={css(styles.inner)}>
          {leftItems && leftItems.length > 0 && (
            <div className={css(styles.iconWrapper)} style={{ padding: '0 16px', marginLeft: '-16px' }}>
              {leftItems.map((item, index) => (
                <span key={item.id} style={{ paddingRight: leftItems.length - 1 !== index && '8px' }}>
                  <MessageInputSideItemComponent {...item} />
                </span>
              ))}
            </div>
          )}
          <div className={css([styles.textArea, disabled && styles.disabled])}>
            {!value || value.length === 0 ? (
              <span className={css([styles.textAreaBase, styles.placeholder])}>{placeholder}</span>
            ) : null}
            <div
              className={css([styles.textAreaBase, styles.input])}
              role="textbox"
              aria-multiline="true"
              data-can-focus={!disabled}
              aria-disabled={disabled}
              aria-autocomplete={autoComplete ? 'list' : 'none'}
              aria-label={placeholder}
              contentEditable={!disabled}
              autoCorrect="off"
              spellCheck={spellcheck}
              onKeyDown={onKeyDownEvent}
              onInput={onInputEvent}
              suppressContentEditableWarning
            >
              {defaultValue.current}
            </div>
          </div>
          {rightItems && rightItems.length > 0 && (
            <div className={css(styles.iconWrapper)} style={{ paddingRight: '12px' }}>
              {rightItems.map((item, index) => (
                <span key={item.id} style={{ paddingRight: rightItems.length - 1 !== index && '8px' }}>
                  <MessageInputSideItemComponent {...item} />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {underInputText && underInputText.length > 0 && <div className={css(styles.underInput)}>{underInputText}</div>}
    </div>
  );
}

export { MessageInputProps, MessageInputSideItem };
