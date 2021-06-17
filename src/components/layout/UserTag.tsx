import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Icon from './Icon';

type UserTagProps = {
  text: string;
  checkmark?: boolean;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'var(--blurple)',
    height: '15px',
    padding: '0 4px',
    marginTop: '1px',
    borderRadius: '3px',
    display: 'inline-flex',
    position: 'relative',
    bottom: '1px',
    flex: 0,
    textTransform: 'uppercase',
    verticalAlign: 'top',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    width: '15px',
    height: '15px',
    marginLeft: '-4px',
    display: 'inline-block',
  },
  text: {
    color: 'white',
    fontFamily: 'discord-normal',
    fontSize: '10px',
    fontWeight: 500,
  },
});

export default function UserTag({ text, checkmark = false }: UserTagProps) {
  return (
    <div className={css(styles.container)}>
      {checkmark && (
        <div className={css(styles.iconContainer)}>
          <Icon size={16} icon="checkmark" />
        </div>
      )}
      <span className={css(styles.text)}>{text}</span>
    </div>
  );
}

export { UserTagProps };
