import React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface UserAvatarProps {
  avatarSource: string;
  size: 'small' | 'medium' | 'large';
}

const styles = StyleSheet.create({
  small: {
    width: '32px',
    height: '32px',
  },
  medium: {
    width: '80px',
    height: '80px',
  },
  large: {
    width: '120px',
    height: '120px',
  },
  avatar: {
    borderRadius: '50%',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // Disable image dragging
    '-webkit-user-drag': 'none',
    '-moz-user-drag': 'none',
    '-ms-user-drag': 'none',
    'user-select': 'none',
  },
});

export default function UserAvatar({ avatarSource, size = 'small' }: UserAvatarProps) {
  return (
    <div className={css([size === 'small' ? styles.small : size === 'medium' ? styles.medium : styles.large])}>
      <img className={css(styles.avatar)} src={avatarSource} alt="Avatar" />
    </div>
  );
}

export { UserAvatarProps };
