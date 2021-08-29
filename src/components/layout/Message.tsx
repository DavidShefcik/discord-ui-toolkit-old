import React, { ReactNode, useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Text from './Text';
import UserTag from './UserTag';

interface MessageContent {
  id: string | number;
  text: string | ReactNode;
  mentioned?: boolean;
  editedText?: string;
}
interface MessageProps {
  username: string;
  avatarSource: string;
  content: MessageContent[];
  timeText?: string;
  width?: string;
  usernameOnClick?(username: string): void;
  usernameColor?: string;
  avatarOnClick?(avatarSource: string): void;
  userTagText?: string;
  userTagCheckmark?: boolean;
}

const styles = StyleSheet.create({
  container: {
    padding: '0.125rem 0 0.125rem 72px',
    position: 'relative',
    userSelect: 'text',
    flex: '0 0 auto',
    fontFamily: 'discord-normal',
    marginBottom: '10px',
    // Disable text highlight select
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  contents: {
    position: 'static',
    marginLeft: '0',
    paddingLeft: '0',
    textIndent: 0,
  },
  avatar: {
    position: 'absolute',
    left: '16px',
    marginTop: 'calc(4px - 0.15rem)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none',
    flex: '0 0 auto',
    zIndex: 2,
    outline: 0,
  },
  header: {
    overflow: 'hidden',
    display: 'block',
    position: 'relative',
    minHeight: '1.375rem',
    color: 'var(--text-muted)',
    'white-space': 'break-spaces',
  },
  headerText: {
    marginRight: '0.25rem',
  },
  username: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: '1.375rem',
    display: 'inline',
    verticalAlign: 'baseline',
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
    outline: 0,
    textDecoration: 'none',
  },
  usernameHover: {
    ':hover': {
      textDecoration: 'underline',
    },
  },
  userTagContainer: {
    verticalAlign: 'bottom',
  },
  smallText: {
    fontSize: '0.75rem',
    lineHeight: '1.375rem',
    color: 'var(--text-muted)',
    verticalAlign: 'baseline',
    marginLeft: '0.25rem',
    display: 'inline-block',
    height: '1.25rem',
    fontWeight: 500,
    fontFamily: 'discord-normal',
  },
  messageContent: {
    userSelect: 'text',
    marginLeft: '-72px',
    paddingLeft: '72px',
    overflow: 'hidden',
    position: 'relative',
    fontSize: '1rem',
    lineHeight: '1.375rem',
    'white-space': 'break-spaces',
    color: 'var(--text-normal)',
    fontWeight: 400,
    fontFamily: 'arial',
    textIndent: 0,
  },
  mention: {
    '::before': {
      backgroundColor: 'var(--info-warning-foreground)',
      content: '""',
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      bottom: 0,
      pointerEvents: 'none',
      width: '2px',
    },
  },
  editedText: {
    fontSize: '0.625rem',
    fontWeight: 400,
    userSelect: 'none',
  },
});

function MessageContentComponent({
  text,
  mentioned = false,
  editedText,
  firstItemHasMention,
}: MessageContent & { firstItemHasMention: boolean }) {
  return (
    <div
      style={{ backgroundColor: firstItemHasMention || !mentioned ? 'transparent' : 'var(--background-mentioned)' }}
      className={css(styles.messageContent, mentioned && styles.mention)}
    >
      <Text>{text}</Text>
      {editedText && <span className={css([styles.smallText, styles.editedText])}>{editedText}</span>}
    </div>
  );
}

export default function Message({
  username,
  avatarSource,
  timeText,
  content,
  width = '100%',
  usernameOnClick,
  usernameColor = 'var(--header-primary)',
  avatarOnClick,
  userTagText,
  userTagCheckmark = false,
}: MessageProps) {
  const [firstItemHasMention, setFirstItemHasMention] = useState(false);

  useEffect(() => {
    if (content.length > 0 && content[0].mentioned) {
      setFirstItemHasMention(true);
    } else if (firstItemHasMention && (content.length === 0 || !content[0].mentioned)) {
      setFirstItemHasMention(false);
    }
  }, [content]);

  if (content.length === 0) {
    return null;
  }

  return (
    <div
      style={{ width, backgroundColor: firstItemHasMention ? 'var(--background-mentioned)' : 'transparent' }}
      className={css([styles.container, firstItemHasMention && styles.mention])}
    >
      <div className={css(styles.contents)}>
        <img
          style={{ cursor: avatarOnClick ? 'pointer' : 'default' }}
          className={css(styles.avatar)}
          src={avatarSource}
          alt="Avatar"
          role="button"
          onClick={() => avatarOnClick(avatarSource)}
        />
        <div className={css([styles.header])}>
          <span className={css(styles.headerText)}>
            <span
              style={{ color: usernameColor, cursor: usernameOnClick ? 'pointer' : 'default' }}
              className={css([styles.username, usernameOnClick && styles.usernameHover])}
              role="button"
              onClick={() => usernameOnClick && usernameOnClick(username)}
            >
              {username}
            </span>
          </span>
          {userTagText && (
            <span className={css(styles.userTagContainer)}>
              <UserTag text={userTagText} checkmark={userTagCheckmark} />
            </span>
          )}
          {timeText && <span className={css(styles.smallText)}>{timeText}</span>}
        </div>
        {content.map((contentItem) => (
          <MessageContentComponent key={contentItem.id} {...contentItem} firstItemHasMention={firstItemHasMention} />
        ))}
      </div>
    </div>
  );
}

export { MessageProps, MessageContent };
