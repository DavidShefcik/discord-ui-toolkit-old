import React, { MouseEvent } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Twemoji from 'react-twemoji';

interface EmojiProps {
  emoji: string;
  color?: boolean;
  size?: string | number;
  onClick?(emoji: string, event: MouseEvent<HTMLDivElement>): void;
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
      style={{ width: size, height: size, cursor: onClick && 'pointer' }}
      onClick={(event) => {
        event.stopPropagation();
        onClick && onClick(emoji, event);
      }}
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
