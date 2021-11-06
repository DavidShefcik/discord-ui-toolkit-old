import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ContentEditable from 'react-contenteditable';

import IconComponent from '@layout/Icon';

import { IconNamesType } from '@internal/values/icons';

interface MessageInputSideItem {
  id: string | number;
  value: IconNamesType;
  onClick?(id: string | number): void;
}
interface MessageInputProps {
  value: string;
  onChange(value: string): void;
  onEnterPress?(value: string): void;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  spellcheck?: boolean;
  leftItems?: MessageInputSideItem[];
  rightItems?: MessageInputSideItem[];
  underInputText?: string;
  aboveInputVariant?: 'error' | 'notice';
  aboveInputText?: string;
  aboveInputOnClick?(): void;
}

function MessageInputSideItemComponent({ id, value, onClick }: MessageInputSideItem) {
  return (
    <IconComponent
      icon={value as IconNamesType}
      iconColor="var(--interactive-normal)"
      iconHoverColor="var(--interactive-hover)"
      onClick={onClick && (() => onClick(id))}
      size={24}
      animated={false}
    />
  );
}

interface MessageInputState {
  internalValue: string;
}

/**
 * We have to use a class component due to issues with react-contenteditable
 * and hooks. See: https://github.com/lovasoa/react-contenteditable/issues/161
 */
export default class MessageInput extends Component<MessageInputProps, MessageInputState> {
  constructor(props: MessageInputProps) {
    super(props);

    this.state = {
      internalValue: this.props.value,
    };
  }

  componentDidUpdate(prevProps: MessageInputProps) {
    if (prevProps.value !== this.props.value && this.props.value !== this.state.internalValue) {
      this.setState({
        internalValue: this.props.value,
      });
    }
  }

  handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    let newValue = value;

    // Prevent a single newline due to a bug where the placeholder would
    // not be visible even if it looked like the input was empty
    if (newValue === '\n') {
      newValue = '';
    }

    this.setState(
      {
        internalValue: newValue,
      },
      () => {
        this.props.onChange(this.state.internalValue);
      }
    );
  };

  handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const { onEnterPress } = this.props;
    const { internalValue } = this.state;

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onEnterPress && onEnterPress(internalValue);
    }
  };

  render() {
    const {
      width = '100%',
      aboveInputText,
      aboveInputVariant = 'notice',
      aboveInputOnClick,
      underInputText,
      placeholder,
      disabled,
      spellcheck,
      leftItems,
      rightItems,
    } = this.props;
    const { internalValue } = this.state;

    const aboveInputVisible = aboveInputText && aboveInputText.length > 0 && aboveInputVariant;

    return (
      <div className={css(styles.container)} style={{ width, marginTop: aboveInputVisible && '24px' }}>
        {aboveInputVisible && (
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
        <div className={css(styles.inputContainer)}>
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
              <ContentEditable
                className={css([styles.textAreaBase, styles.input])}
                placeholder={placeholder}
                spellCheck={!!spellcheck}
                disabled={!!disabled}
                html={internalValue}
                onChange={this.handleChange}
                // @ts-ignore
                onKeyDown={this.handleKeyDown}
                data-testid="message-input"
              />
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
}

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    position: 'relative',
  },
  inputContainer: {
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
    backgroundColor: 'transparent',
    border: 'none',
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

export { MessageInputProps, MessageInputSideItem };
