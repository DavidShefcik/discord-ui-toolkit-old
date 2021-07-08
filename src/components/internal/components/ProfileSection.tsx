import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite';

interface ProfileSection {
  label: string;
  content: ReactNode;
}

const styles = StyleSheet.create({
  label: {
    marginBottom: '8px',
    fontSize: '12px',
    color: 'var(--header-secondary)',
    fontFamily: 'discord-normal',
    textTransform: 'uppercase',
  },
  content: {
    marginTop: '12px',
    marginBottom: '16px',
  },
});

export default function ProfileSectionComponent({ label, content }: ProfileSection) {
  return (
    <div>
      <div className={css(styles.label)}>{label}</div>
      <div className={css(styles.content)}>{content}</div>
    </div>
  );
}

export { ProfileSection };
