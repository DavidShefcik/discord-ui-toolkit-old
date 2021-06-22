import React, { ReactNode, useState, useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';

import ThemeContext from '@internal/context/ThemeContext';

import UserAvatar from './UserAvatar';
import UserTag from './UserTag';

type SmallUserProfileSection = {
  label: string;
  content: ReactNode;
};
type SmallUserProfileProps = {
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
  sections?: SmallUserProfileSection[];
  children?: ReactNode;
};

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
  avatarBase: {
    position: 'relative',
    width: '80px',
    height: '80px',
    overflow: 'hidden',
    borderRadius: '50%',
  },
  newAvatarContainer: {
    position: 'absolute',
    top: '16px',
    left: '16px',
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
  avatarHoverBorder: {
    top: '6px',
    left: '6px',
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
    border: '6px solid var(--background-floating)',
    backgroundColor: 'var(--background-floating)',
    borderRadius: '50%',
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
  fieldLabel: {
    marginBottom: '8px',
    fontSize: '12px',
    color: 'var(--header-secondary)',
    fontFamily: 'discord-normal',
    textTransform: 'uppercase',
  },
  fieldContent: {
    marginTop: '12px',
    marginBottom: '16px',
  },
});

function Avatar({
  avatarSource,
  avatarHoverText,
  onAvatarClick,
  border = false,
}: Pick<SmallUserProfileProps, 'avatarSource' | 'avatarHoverText' | 'onAvatarClick'> & { border?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={css(styles.avatarBase)}
      style={{ cursor: onAvatarClick && 'pointer' }}
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
      onClick={() => onAvatarClick && onAvatarClick(avatarSource)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {avatarHoverText && (
        <div
          className={css([
            styles.avatarHover,
            hovered ? styles.avatarHoverVisible : styles.avatarHoverHidden,
            border && styles.avatarHoverBorder,
          ])}
        >
          {avatarHoverText}
        </div>
      )}
      <span className={css([styles.avatar, border && styles.avatarBorder])}>
        <UserAvatar size="large" avatarSource={avatarSource} />
      </span>
    </span>
  );
}

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
        <Avatar avatarSource={avatarSource} avatarHoverText={avatarHoverText} onAvatarClick={onAvatarClick} />
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
        <Avatar avatarSource={avatarSource} avatarHoverText={avatarHoverText} onAvatarClick={onAvatarClick} border />
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
  const { newMarketingLayout } = useContext<ThemeContextValues>(ThemeContext);

  const { sections, children } = props;

  return (
    <div
      style={{
        width: newMarketingLayout ? '300px' : '225px',
        backgroundColor: newMarketingLayout ? 'var(--background-floating)' : 'var(--background-secondary)',
      }}
      className={css(styles.container)}
    >
      {newMarketingLayout ? <NewUserProfile {...props} /> : <OldUserProfile {...props} />}
      {(sections || children) && (
        <div className={css(styles.contentContainer)}>
          {sections &&
            sections.map(({ label, content }) => (
              <div key={label}>
                <div className={css(styles.fieldLabel)}>{label}</div>
                <div className={css(styles.fieldContent)}>{content}</div>
              </div>
            ))}
          {children}
        </div>
      )}
    </div>
  );
}

export { SmallUserProfileSection, SmallUserProfileProps };
