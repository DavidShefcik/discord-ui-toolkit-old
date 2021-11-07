import React, { MouseEvent, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

import iconsList from '@internal/values/icons';

import { IconNamesType } from '@internal/values/icons';

interface IconProps {
  icon: IconNamesType;
  iconColor?: string;
  iconHoverColor?: string;
  size?: string | number;
  animated?: boolean;
  onClick?(icon: IconNamesType, event: MouseEvent<HTMLDivElement>): void;
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
  const hoverable = onClick !== undefined;

  if (!iconSvg) {
    throw new Error(`Icon "${icon}" not found.`);
  }

  return (
    <div
      className={css(styles.container)}
      style={{
        color: hovered && hoverable ? iconHoverColor : iconColor,
        cursor: hovered && hoverable && 'pointer',
        width: size,
        height: size,
        transition: animated ? 'all .17s ease' : 'all 0s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick && onClick(icon, event);
      }}
      aria-label={icon}
    >
      {iconSvg}
    </div>
  );
}

export { IconProps };
