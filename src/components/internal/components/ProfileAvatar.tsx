import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

import UserAvatar from '@layout/UserAvatar';

interface ProfileAvatarProps {
  avatarSource: string;
  size?: 'medium' | 'large';
  avatarHoverText?: string;
  onAvatarClick?(avatarSource: string): void;
  border?: boolean;
}

const styles = StyleSheet.create({
  avatarBase: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
  },
  medium: {
    width: '80px',
    height: '80px',
  },
  large: {
    width: '120px',
    height: '120px',
  },
  avatarHover: {
    boxSizing: 'border-box',
    fontSize: '10px',
    lineHeight: '12px',
    fontWeight: 700,
    height: '80px',
    width: '80px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textTransform: 'uppercase',
    boxShadow: 'inset 0 0 120px rgba(0, 0, 0, 0.75)',
    color: 'white',
    position: 'absolute',
    zIndex: 20,
    transition: 'opacity 0.1s ease',
  },
  avatarHoverVisible: {
    opacity: 1,
  },
  avatarHoverHidden: {
    opacity: 0,
  },
  avatar: {
    position: 'absolute',
    zIndex: 10,
  },
  avatarBorder: {
    borderColor: 'var(--background-floating)',
    borderStyle: 'solid',
    backgroundColor: 'var(--background-floating)',
    borderRadius: '50%',
  },
  avatarMediumBorder: {
    borderWidth: '6px',
  },
  avatarLargeBorder: {
    borderWidth: '8px',
  },
  avatarHoverMediumBorder: {
    top: '6px',
    left: '6px',
  },
  avatarHoverLargeBorder: {
    top: '8px',
    left: '8px',
  },
});

export default function ProfileAvatar({
  avatarSource,
  size = 'medium',
  avatarHoverText,
  onAvatarClick,
  border = false,
}: ProfileAvatarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={css([styles.avatarBase, size === 'medium' ? styles.medium : styles.large])}
      style={{ cursor: onAvatarClick && 'pointer' }}
      role="button"
      onClick={() => onAvatarClick && onAvatarClick(avatarSource)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {avatarHoverText && (
        <div
          className={css([
            styles.avatarHover,
            hovered ? styles.avatarHoverVisible : styles.avatarHoverHidden,
            border && (size === 'medium' ? styles.avatarHoverMediumBorder : styles.avatarHoverLargeBorder),
            size === 'medium' ? styles.medium : styles.large,
          ])}
        >
          {avatarHoverText}
        </div>
      )}
      <span
        className={css([
          styles.avatar,
          border && styles.avatarBorder,
          size === 'medium' ? styles.avatarMediumBorder : styles.avatarLargeBorder,
        ])}
      >
        <UserAvatar size={size} avatarSource={avatarSource} />
      </span>
    </span>
  );
}

export { ProfileAvatarProps };
