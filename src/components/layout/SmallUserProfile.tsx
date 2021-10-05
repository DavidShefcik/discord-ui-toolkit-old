import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite';

import useThemeContext from '@internal/hooks/useThemeContext';

import UserTag from './UserTag';
import ProfileAvatar from '@internal/components/ProfileAvatar';
import ProfileSectionComponent, { ProfileSection } from '@internal/components/ProfileSection';

interface SmallUserProfileProps {
  avatarSource: string;
  username: string;
  discriminator?: string;
  userTagText?: string;
  userTagCheckmark?: boolean;
  userTagBlurple?: boolean;
  avatarHoverText?: string;
  onAvatarClick?(avatarSource: string): void;
  headerBackgroundColor?: string;
  headerImageSource?: string;
  activityBackgroundColor?: string;
  activityTitle?: string;
  activitySubtitle?: string;
  sections?: ProfileSection[];
  children?: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: '5px',
    overflow: 'hidden',
    position: 'relative',
  },
  userInfoContainerBase: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  userInfoContainerOld: {
    padding: '15px 0',
  },
  newAvatarContainer: {
    position: 'absolute',
    top: '16px',
    left: '16px',
  },
  banner: {
    width: '300px',
    height: '60px',
  },
  header: {
    display: 'block',
    padding: '64px 16px 16px',
    backgroundColor: 'var(--background-floating)',
    overflow: 'hidden',
    position: 'relative',
    borderBottom: '1px solid var(--background-modifier-accent)',
  },
  userInfoTextBase: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  userInfoTextOld: {
    justifyContent: 'center',
    paddingTop: '8px',
  },
  userInfoTextNew: {
    justifyContent: 'flex-start',
  },
  userText: {
    fontFamily: 'discord-normal',
  },
  usernameBase: {
    color: 'var(--interactive-active)',
  },
  usernameOld: {
    fontSize: '18px',
  },
  usernameNew: {
    fontSize: '20px',
  },
  discriminatorOld: {
    color: 'var(--interactive-hover)',
    fontSize: '18px',
  },
  discriminatorNew: {
    color: 'var(--header-secondary)',
    fontSize: '20px',
  },
  activityContainerBase: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
  },
  activityContainerOld: {
    padding: '10px',
  },
  activityContainerNew: {
    padding: '16px 16px 0 16px',
  },
  activityTitleBase: {
    fontFamily: 'discord-bold',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  activityTitleOld: {
    color: 'var(--interactive-active)',
  },
  activityTitleNew: {
    color: 'var(--header-secondary)',
  },
  activitySubtitle: {
    paddingTop: '5px',
    fontFamily: 'discord-normal',
    fontSize: '14px',
    color: 'var(--text-normal)',
  },
  contentContainer: {
    boxSizing: 'border-box',
    padding: '16px',
  },
});

function OldUserProfile({
  avatarSource,
  username,
  discriminator,
  userTagText,
  userTagCheckmark = false,
  userTagBlurple,
  avatarHoverText,
  onAvatarClick,
  headerBackgroundColor = 'var(--background-tertiary)',
  activityBackgroundColor = 'var(--blurple-dark)',
  activityTitle,
  activitySubtitle,
}: Omit<SmallUserProfileProps, 'headerImageSource' | 'sections' | 'children'>) {
  return (
    <>
      <div
        style={{ backgroundColor: headerBackgroundColor }}
        className={css([styles.userInfoContainerBase, styles.userInfoContainerOld, styles.userText])}
      >
        <ProfileAvatar
          avatarSource={avatarSource}
          avatarHoverText={avatarHoverText}
          onAvatarClick={onAvatarClick}
          size="medium"
        />
        <div className={css([styles.userInfoTextBase, styles.userInfoTextOld])}>
          <span className={css([styles.usernameBase, styles.usernameOld])}>{username}</span>
          {discriminator && <span className={css(styles.discriminatorOld)}>#{discriminator}</span>}
          {userTagText && (
            <>
              <div style={{ paddingLeft: '5px' }} />
              <UserTag text={userTagText} checkmark={userTagCheckmark} blurple={userTagBlurple || false} />
            </>
          )}
        </div>
      </div>
      {(activityTitle || activitySubtitle) && (
        <div
          style={{ backgroundColor: activityBackgroundColor }}
          className={css([styles.activityContainerBase, styles.activityContainerOld])}
        >
          <span className={css([styles.activityTitleBase, styles.activityTitleOld])}>{activityTitle}</span>
          <span className={css(styles.activitySubtitle)}>{activitySubtitle}</span>
        </div>
      )}
    </>
  );
}

function NewUserProfile({
  avatarSource,
  username,
  discriminator,
  userTagText,
  userTagCheckmark = false,
  userTagBlurple,
  avatarHoverText,
  onAvatarClick,
  headerBackgroundColor = 'var(--background-tertiary)',
  headerImageSource,
  activityTitle,
  activitySubtitle,
}: Omit<SmallUserProfileProps, 'sections' | 'children' | 'activityBackgroundColor'>) {
  return (
    <>
      <div
        style={{
          backgroundColor: headerBackgroundColor,
          backgroundImage: headerImageSource && `url(${headerImageSource})`,
        }}
        className={css(styles.banner)}
      />
      <div className={css(styles.header)}>
        <div className={css([styles.userInfoTextBase, styles.userInfoTextNew, styles.userText])}>
          <span className={css([styles.usernameBase, styles.usernameNew])}>{username}</span>
          {discriminator && <span className={css(styles.discriminatorNew)}>#{discriminator}</span>}
          {userTagText && (
            <>
              <div style={{ paddingLeft: '5px' }} />
              <UserTag text={userTagText} checkmark={userTagCheckmark} blurple={userTagBlurple || false} />
            </>
          )}
        </div>
      </div>
      <div className={css(styles.newAvatarContainer)}>
        <ProfileAvatar
          avatarSource={avatarSource}
          avatarHoverText={avatarHoverText}
          onAvatarClick={onAvatarClick}
          size="medium"
          border
        />
      </div>
      {(activityTitle || activitySubtitle) && (
        <div className={css([styles.activityContainerBase, styles.activityContainerNew])}>
          <span className={css([styles.activityTitleBase, styles.activityTitleOld])}>{activityTitle}</span>
          <span className={css(styles.activitySubtitle)}>{activitySubtitle}</span>
        </div>
      )}
    </>
  );
}

export default function SmallUserProfile(props: SmallUserProfileProps) {
  const { newMarketingColors } = useThemeContext();

  const { sections, children } = props;

  return (
    <div
      style={{
        width: newMarketingColors ? '300px' : '225px',
        backgroundColor: newMarketingColors ? 'var(--background-floating)' : 'var(--background-secondary)',
      }}
      className={css(styles.container)}
    >
      {newMarketingColors ? <NewUserProfile {...props} /> : <OldUserProfile {...props} />}
      {(sections || children) && (
        <div className={css(styles.contentContainer)}>
          {sections && sections.map((section) => <ProfileSectionComponent key={section.label} {...section} />)}
          {children}
        </div>
      )}
    </div>
  );
}

export { SmallUserProfileProps };
