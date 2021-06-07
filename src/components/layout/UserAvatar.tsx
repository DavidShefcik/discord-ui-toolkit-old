import React from 'react';
import { StyleSheet, css } from 'aphrodite';

type UserAvatarProps = {
  avatarSource: string;
  size: 'small' | 'large';
};

const styles = StyleSheet.create({
  small: {
    width: '32px',
    height: '32px',
  },
  large: {
    width: '80px',
    height: '80px',
  },
  avatar: {
    borderRadius: '50%',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default function UserAvatar({ avatarSource, size = 'small' }: UserAvatarProps) {
  return (
    <div className={css([size === 'small' ? styles.small : styles.large])}>
      <img className={css(styles.avatar)} src={avatarSource} alt="" />
    </div>
  );
}

export { UserAvatarProps };
