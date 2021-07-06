import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Icon from './Icon';

interface UserTagProps {
  text: string;
  checkmark?: boolean;
  blurple?: boolean;
}

const styles = StyleSheet.create({
  container: {
    height: '15px',
    padding: '0 4px',
    marginTop: '1px',
    borderRadius: '3px',
    display: 'inline-flex',
    position: 'relative',
    bottom: '1px',
    textTransform: 'uppercase',
    verticalAlign: 'top',
    alignItems: 'center',
    overflow: 'hidden',
  },
  containerBlurple: {
    backgroundColor: 'var(--blurple)',
  },
  containerWhite: {
    backgroundColor: 'white',
  },
  iconContainer: {
    width: '15px',
    height: '15px',
    marginLeft: '-4px',
    display: 'inline-block',
  },
  text: {
    fontFamily: 'discord-normal',
    fontSize: '10px',
    fontWeight: 500,
  },
  textBlurple: {
    color: 'var(--blurple)',
  },
  textWhite: {
    color: 'white',
  },
});

export default function UserTag({ text, checkmark = false, blurple = true }: UserTagProps) {
  return (
    <div className={css([styles.container, blurple ? styles.containerBlurple : styles.containerWhite])}>
      {checkmark && (
        <div className={css(styles.iconContainer)}>
          <Icon size={16} icon="checkmark" iconColor={blurple ? 'white' : 'var(--blurple)'} />
        </div>
      )}
      <span className={css([styles.text, blurple ? styles.textWhite : styles.textBlurple])}>{text}</span>
    </div>
  );
}

export { UserTagProps };
