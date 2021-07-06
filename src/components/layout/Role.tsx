import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

interface RoleProps {
  text: string;
  color?: string;
  hoverRemoveIcon?: boolean;
  hoverRemoveIconColor?: string;
  onClick?(text: string): void;
}

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '11px',
    boxSizing: 'border-box',
    height: '22px',
    margin: '0 4px 4px 0',
    padding: '4px',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  roleCircle: {
    borderRadius: '50%',
    width: '12px',
    height: '12px',
    marginRight: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 0,
  },
  roleRemoveIcon: {
    width: '10px',
    height: '10px',
  },
  roleText: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--interactive-active)',
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: '4px',
  },
});

export default function Role({
  text,
  color = '#ffffff',
  hoverRemoveIcon = false,
  hoverRemoveIconColor = '#2f3136',
  onClick,
}: RoleProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={css(styles.container)}
      style={{ borderColor: color, cursor: onClick && 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={css(styles.content)}>
        <div
          className={css(styles.roleCircle)}
          style={{ backgroundColor: color }}
          role="button"
          aria-label="Role Circle"
          onClick={() => onClick && onClick(text)}
        >
          {hoverRemoveIcon && hovered && (
            <svg
              className={css(styles.roleRemoveIcon)}
              role="button"
              aria-label="Role Remove Icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill={hoverRemoveIconColor}
                d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
              />
            </svg>
          )}
        </div>
        <div className={css(styles.roleText)}>{text}</div>
      </div>
    </div>
  );
}

export { RoleProps };
