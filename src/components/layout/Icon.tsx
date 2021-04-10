import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';

import iconsList from '../internal/values/icons';

type IconProps = {
  icon: Icon;
  iconColor?: string;
  iconHoverColor?: string;
  size?: number;
  onClick?(icon?: Icon): void;
};

const styles = StyleSheet.create({
  container: {
    transition: 'all .17s ease',
    outline: 0,
  },
});

export default function IconComponent({
  icon,
  iconColor = '#ffffff',
  iconHoverColor = iconColor,
  size = 72,
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
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      onClick={() => onClick && onClick(icon)}
      tabIndex={0}
      onKeyPress={() => {}}
    >
      {iconSvg}
    </div>
  );
}

export { IconProps };
