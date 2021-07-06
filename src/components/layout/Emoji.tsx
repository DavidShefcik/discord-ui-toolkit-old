import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Twemoji from 'react-twemoji';

interface EmojiProps {
  emoji: string;
  color?: boolean;
  size?: number;
  onClick?(emoji?: string): void;
}

const styles = StyleSheet.create({
  container: {
    outline: 0,
  },
  gray: {
    filter: 'grayscale(100%)',
  },
  emoji: {
    width: '100%',
    height: '100%',
  },
});

export default function Emoji({ emoji, color = true, size = 72, onClick }: EmojiProps) {
  return (
    <div
      className={css([styles.container, !color && styles.gray])}
      style={{ width: `${size}px`, height: `${size}px`, cursor: onClick ? 'pointer' : 'default' }}
      onClick={() => onClick(emoji)}
      role="button"
    >
      <Twemoji
        options={{
          className: css(styles.emoji),
          folder: 'svg',
          ext: '.svg',
        }}
      >
        {emoji}
      </Twemoji>
    </div>
  );
}

export { EmojiProps };
