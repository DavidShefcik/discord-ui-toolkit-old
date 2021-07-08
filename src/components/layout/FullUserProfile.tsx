import React, { ReactNode, useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';

import useThemeContext from '@internal/hooks/useThemeContext';

import Button, { ButtonTypes } from '@inputs/Button';
import UserTag from './UserTag';
import ProfileAvatar from '@internal/components/ProfileAvatar';
import ProfileSectionComponent, { ProfileSection } from '@internal/components/ProfileSection';

interface FullUserProfileTab {
  id: number | string;
  label: string;
  content: ReactNode;
  sections?: ProfileSection[];
}
interface FullUserProfileProps {
  avatarSource: string;
  username: string;
  discriminator?: string;
  userTagText?: string;
  userTagCheckmark?: boolean;
  userTagBlurple?: boolean;
  headerBackgroundColor?: string;
  headerImageSource?: string;
  activityBackgroundColor?: string;
  activityTitle?: string;
  activitySubtitle?: string;
  tabs?: FullUserProfileTab[];
  defaultTab?: number;
  children?: ReactNode;
  actionButtonText?: string;
  actionButtonType?: ButtonTypes;
  actionButtonDisabled?: boolean;
  actionButtonLoading?: boolean;
  actionButtonOnClick?(): void;
}

const styles = StyleSheet.create({
  container: {
    width: '600px',
    borderRadius: '5px',
    overflow: 'hidden',
    position: 'relative',
  },
  contentContainer: {
    overflowX: 'auto',
    overflowY: 'hidden',
    boxSizing: 'border-box',
  },
  tabsContainer: {
    width: '100%',
    height: '55px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    overflowY: 'hidden',
    overflowX: 'auto',
    borderBottom: '1px solid var(--background-modifier-accent)',
    paddingLeft: '20px',
    boxSizing: 'border-box',
  },
  tabLabel: {
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    display: 'flex',
    alignItems: 'center',
    marginRight: '40px',
    fontSize: '14px',
    fontFamily: 'discord-normal',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: 'var(--interactive-normal)',
    outline: 0,
    ':hover': {
      borderBottomColor: 'var(--interactive-hover)',
      color: 'var(--interactive-hover)',
    },
  },
  currentTabLabel: {
    cursor: 'default',
    borderBottomColor: 'var(--interactive-active)',
    color: 'var(--interactive-active)',
    ':hover': {
      borderBottomColor: 'var(--interactive-active)',
      color: 'var(--interactive-active)',
    },
  },
  oldUserProfile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
  },
  oldUserHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  oldUserInfoContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oldUsernameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
  },
  oldUsername: {
    fontSize: '20px',
    color: 'var(--header-primary)',
    fontFamily: 'discord-normal',
  },
  oldDiscriminator: {
    fontSize: '14px',
    color: 'var(--interactive-normal)',
    fontFamily: 'discord-normal',
    display: 'inline',
    verticalAlign: 'baseline',
  },
  activityContainerBase: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    width: '100%',
  },
  activityContainerOld: {
    padding: '15px 20px 10px 20px',
  },
  activityContainerNew: {
    padding: '0 16px 5px 16px',
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
  banner: {
    width: '100%',
    height: '120px',
  },
  newUserHeader: {
    position: 'relative',
  },
  newAvatarContainer: {
    position: 'absolute',
    top: '-68px',
    left: '16px',
  },
  newButtonContainer: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    left: '160px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  newUserInfoContainer: {
    marginBottom: '20px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '76px',
    marginLeft: '16px',
    marginRight: '16px',
    fontFamily: 'discord-normal',
  },
  newUserInfoTextBase: {
    lineHeight: '24px',
    fontSize: '20px',
  },
  newUsername: {
    color: 'var(--header-primary)',
  },
  newDiscriminator: {
    color: 'var(--header-secondary)',
  },
});

function NewUserProfile({
  avatarSource,
  username,
  discriminator,
  userTagText,
  userTagCheckmark = false,
  userTagBlurple = false,
  headerBackgroundColor = 'var(--background-tertiary)',
  activityTitle,
  activitySubtitle,
  actionButtonText,
  actionButtonType = 'green',
  actionButtonDisabled = false,
  actionButtonLoading = false,
  actionButtonOnClick,
  headerImageSource,
}: Omit<FullUserProfileProps, 'activityBackgroundColor' | 'defaultTab' | 'tabLabelColor' | 'tabs' | 'children'>) {
  return (
    <div>
      <div
        style={{
          backgroundColor: headerBackgroundColor,
          backgroundImage: headerImageSource && `url(${headerImageSource})`,
        }}
        className={css(styles.banner)}
      />
      <div className={css(styles.newUserHeader)}>
        <div className={css(styles.newAvatarContainer)}>
          <ProfileAvatar avatarSource={avatarSource} size="large" border />
        </div>
        {actionButtonText && (
          <div className={css(styles.newButtonContainer)}>
            <Button
              text={actionButtonText}
              type={actionButtonType}
              disabled={actionButtonDisabled}
              loading={actionButtonLoading}
              onClick={() => actionButtonOnClick && actionButtonOnClick()}
              size="custom"
              height="32px"
              width="100px"
            />
          </div>
        )}
      </div>
      <div className={css(styles.newUserInfoContainer)}>
        <span className={css([styles.newUsername, styles.newUserInfoTextBase])}>
          {username}
          {discriminator && (
            <span className={css([styles.newDiscriminator, styles.newUserInfoTextBase])}>#{discriminator}</span>
          )}
        </span>
        {userTagText && (
          <>
            <div style={{ paddingLeft: '6px' }} />
            <UserTag text={userTagText} checkmark={userTagCheckmark} blurple={userTagBlurple || false} />
          </>
        )}
      </div>
      {(activityTitle || activitySubtitle) && (
        <div className={css([styles.activityContainerBase, styles.activityContainerNew])}>
          <span className={css([styles.activityTitleBase, styles.activityTitleNew])}>{activityTitle}</span>
          <span className={css(styles.activitySubtitle)}>{activitySubtitle}</span>
        </div>
      )}
    </div>
  );
}

function OldUserProfile({
  avatarSource,
  username,
  discriminator,
  userTagText,
  userTagCheckmark = false,
  userTagBlurple = false,
  headerBackgroundColor,
  activityBackgroundColor,
  activityTitle,
  activitySubtitle,
  actionButtonText,
  actionButtonType = 'green',
  actionButtonDisabled = false,
  actionButtonLoading = false,
  actionButtonOnClick,
}: Omit<FullUserProfileProps, 'defaultTab' | 'tabLabelColor' | 'tabs' | 'headerImageSource' | 'children'>) {
  return (
    <div
      style={{
        backgroundColor: headerBackgroundColor
          ? headerBackgroundColor
          : activityBackgroundColor
          ? activityBackgroundColor
          : 'var(--background-tertiary)',
        borderBottom: !activityBackgroundColor && '1px solid var(--background-modifier-accent)',
      }}
    >
      <div className={css(styles.oldUserHeader)}>
        <div className={css(styles.oldUserInfoContainer)}>
          <ProfileAvatar avatarSource={avatarSource} size="medium" />
          <div className={css(styles.oldUsernameContainer)}>
            <span className={css(styles.oldUsername)}>
              {username}
              {discriminator && <span className={css(styles.oldDiscriminator)}>#{discriminator}</span>}
            </span>
            {userTagText && (
              <>
                <div style={{ paddingLeft: '10px' }} />
                <UserTag text={userTagText} checkmark={userTagCheckmark} blurple={userTagBlurple || false} />
              </>
            )}
          </div>
        </div>
        {actionButtonText && (
          <Button
            text={actionButtonText}
            type={actionButtonType}
            disabled={actionButtonDisabled}
            loading={actionButtonLoading}
            onClick={() => actionButtonOnClick && actionButtonOnClick()}
            size="custom"
            height="32px"
            width="100px"
          />
        )}
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
    </div>
  );
}

export default function FullUserProfile(props: FullUserProfileProps) {
  const { newMarketingLayout } = useThemeContext();

  const { children, tabs, defaultTab, activityBackgroundColor } = props;

  // const [currentTabId, setCurrentTabId] = useState((defaultTab === 0 ? defaultT) || tabs ? tabs[0].id : null);
  const [currentTabId, setCurrentTabId] = useState(defaultTab !== undefined ? defaultTab : tabs ? tabs[0].id : null);
  const [currentTab, setCurrentTab] = useState<FullUserProfileTab>(null);

  useEffect(() => {
    if ((currentTabId || currentTabId === 0) && tabs) {
      const tab = tabs.find(({ id }) => id == currentTabId);
      setCurrentTab(tab || null);
    }
  }, [currentTabId]);

  return (
    <div
      style={{
        backgroundColor: newMarketingLayout ? 'var(--background-floating)' : 'var(--background-secondary)',
      }}
      className={css(styles.container)}
    >
      {newMarketingLayout ? <NewUserProfile {...props} /> : <OldUserProfile {...props} />}
      {tabs && (
        <div
          style={{
            backgroundColor: newMarketingLayout
              ? 'transparent'
              : activityBackgroundColor
              ? activityBackgroundColor
              : 'var(--background-tertiary)',
          }}
          className={css(styles.tabsContainer)}
        >
          {tabs.map(({ id, label }) => (
            <div
              key={id}
              className={css([styles.tabLabel, id === currentTabId && styles.currentTabLabel])}
              onClick={() => setCurrentTabId(id)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
      <div
        style={{ height: tabs || children ? '240px' : 'auto', padding: tabs || children ? '16px 12px 8px 20px' : '0' }}
        className={css(styles.contentContainer)}
      >
        {currentTab && (
          <div>
            {currentTab.content}
            {currentTab.sections &&
              currentTab.sections.map((section) => <ProfileSectionComponent key={section.label} {...section} />)}
          </div>
        )}
        {children && children}
      </div>
    </div>
  );
}

export { FullUserProfileTab, FullUserProfileProps };
