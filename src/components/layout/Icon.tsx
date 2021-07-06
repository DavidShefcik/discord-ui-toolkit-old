import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

import iconsList from '@internal/values/icons';

interface IconProps {
  icon: Icon;
  iconColor?: string;
  iconHoverColor?: string;
  size?: number;
  animated?: boolean;
  onClick?(icon?: Icon): void;
}

const styles = StyleSheet.create({
  container: {
    outline: 0,
  },
});

export default function IconComponent({
  icon,
  iconColor = '#ffffff',
  iconHoverColor = iconColor,
  size = 72,
  animated = false,
  onClick,
}: IconProps) {
  const [hovered, setHovered] = useState(false);

  const iconSvg = iconsList.find(({ name }) => name === icon)?.icon;
  const hoverable = iconHoverColor !== undefined || onClick !== undefined;

  if (!iconSvg) {
    throw new Error(`Icon "${icon}" not found.`);
  }

  return (
    <div
      className={css(styles.container)}
      style={{
        color: hovered && hoverable ? iconHoverColor : iconColor,
        cursor: hovered && hoverable ? 'pointer' : 'default',
        width: `${size}px`,
        height: `${size}px`,
        transition: animated ? 'all .17s ease' : 'all 0s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      onClick={() => onClick && onClick(icon)}
    >
      {iconSvg}
    </div>
  );
}

export { IconProps };
