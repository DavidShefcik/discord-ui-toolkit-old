import React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface MentionBadgeProps {
  text: string;
  border?: boolean;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'hsl(359, calc(var(--saturation-factor, 1) * 82.6%), 59.4%)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    boxSizing: 'border-box',
    padding: '0 4px',
    width: 'auto',
    height: 'auto',
    minWidth: '16px',
    minHeight: '16px',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '16px',
    color: '#ffffff',
    fontFamily: 'discord-normal',
  },
  border: {
    display: 'inline-flex',
    border: '3px solid var(--background-tertiary)',
    borderRadius: '11px',
    overflow: 'hidden',
  },
});

export default function MentionBadge({ text, border = false }: MentionBadgeProps) {
  const mentionBadge = <div className={css(styles.container)}>{text}</div>;

  if (border) {
    return <div className={css(styles.border)}>{mentionBadge}</div>;
  }

  return mentionBadge;
}

export { MentionBadgeProps };
