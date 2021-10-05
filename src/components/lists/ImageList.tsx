import React, { ReactChild, useState, useEffect, memo } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Icon from '@layout/Icon';
import Emoji from '@layout/Emoji';
import MentionBadge from '@layout/MentionBadge';

import { IconNamesType } from '@internal/values/icons';

type ImageItemOnClick = (id: string | number) => void;
type InteractiveListItem = {
  mentionBadgeText?: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
  indicateUnread?: boolean;
};
type ImageListImageItem = InteractiveListItem & {
  type: 'image';
  source: string;
};
type ImageListDividerItem = {
  type: 'divider';
};
type ImageListIconItem = InteractiveListItem & {
  type: 'icon';
  source: string;
  iconColor?: string;
  iconHoverColor?: string;
  iconActiveColor?: string;
};
type ImageListEmojiItem = InteractiveListItem & {
  type: 'emoji';
  source: string;
  emojiColored?: boolean;
  emojiHoverColored?: boolean;
  emojiActiveColored?: boolean;
};
type ImageListCustomItem = InteractiveListItem & {
  type: 'custom';
  source: ReactChild;
};
type ImageListItem = { id: string | number; position: number } & (
  | ImageListImageItem
  | ImageListDividerItem
  | ImageListIconItem
  | ImageListEmojiItem
  | ImageListCustomItem
);

interface ImageListProps {
  items: ImageListItem[];
  backgroundColor?: string;
  direction?: 'vertical' | 'horizontal';
  active?: Array<string | number | ImageListItem>;
  onItemClick?: ImageItemOnClick;
  height?: string;
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflowX: 'hidden',
    overflowY: 'auto',
    display: 'inline-flex',
    boxSizing: 'border-box',
    padding: '4px 0',
    // Disable text highlight select
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
    // Hide scrollbar
    '::-webkit-scrollbar': {
      display: 'none',
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
    },
  },
  itemContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  verticalItemContainer: {
    margin: '4px 0',
    width: '72px',
  },
  horizontalItemContainer: {
    margin: '4px',
    width: '52px',
  },
  pill: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '8px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pillIndicator: {
    position: 'absolute',
    display: 'block',
    width: '8px',
    borderRadius: '0 4px 4px 0',
    marginLeft: '-4px',
    backgroundColor: 'var(--header-primary)',
    transition: 'all 0.2s ease',
  },
  itemContent: {
    position: 'relative',
    boxSizing: 'border-box',
    height: '48px',
    width: '48px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.1s ease-out, color 0.1s ease-out, border-radius 0.15s ease-out',
  },
  dividerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: '2px',
    width: '32px',
    borderRadius: '1px',
    backgroundColor: 'var(--background-modifier-accent)',
  },
  imageListItem: {
    display: 'block',
    width: '48px',
    height: '48px',
    objectFit: 'cover',
    // Disable image dragging
    '-webkit-user-drag': 'none',
    '-moz-user-drag': 'none',
    '-ms-user-drag': 'none',
    'user-select': 'none',
  },
  mentionBadgeContainer: {
    position: 'absolute',
    bottom: '-4px',
  },
});

function ImageListItemComponent(
  props: ImageListItem & {
    listDirection: Pick<ImageListProps, 'direction'>;
    active: boolean;
    onClick?: ImageItemOnClick;
  }
) {
  const [hovered, setHovered] = useState(false);

  if (props.type === 'divider') {
    return (
      <div className={css(styles.dividerContainer)}>
        <div
          className={css([styles.divider])}
          style={{
            transform: props.listDirection === 'vertical' ? 'rotate(0deg)' : 'rotate(90deg)',
            margin: props.listDirection === 'vertical' && '4px 0',
          }}
        />
      </div>
    );
  }

  const {
    id,
    source,
    active,
    hoverBackgroundColor = 'var(--green)',
    activeBackgroundColor = hoverBackgroundColor,
    mentionBadgeText,
    onClick,
    listDirection,
    indicateUnread = false,
  } = props;

  let component = null;
  switch (props.type) {
    case 'image':
      component = <img src={source as string} className={css(styles.imageListItem)} alt="List Item Image" />;
      break;
    case 'icon':
      const { iconColor = 'var(--text-normal)', iconHoverColor = '#ffffff', iconActiveColor = iconHoverColor } = props;
      component = (
        <Icon
          icon={source as IconNamesType}
          size="26px"
          animated
          iconColor={hovered ? iconHoverColor : active ? iconActiveColor : iconColor}
        />
      );
      break;
    case 'emoji':
      const { emojiColored = false, emojiHoverColored = true, emojiActiveColored = emojiHoverColored } = props;
      component = (
        <Emoji
          emoji={source as string}
          size="26px"
          color={hovered ? emojiHoverColored : active ? emojiActiveColored : emojiColored}
        />
      );
      break;
    case 'custom':
      component = source;
      break;
  }

  return (
    <div
      className={css([
        styles.itemContainer,
        listDirection === 'vertical' ? styles.verticalItemContainer : styles.horizontalItemContainer,
      ])}
      style={{
        cursor: onClick && 'pointer',
      }}
      onClick={onClick && (() => onClick(id))}
      data-testid="list-item"
    >
      {(active || hovered || indicateUnread) && (
        <div className={css(styles.pill)}>
          <span className={css(styles.pillIndicator)} style={{ height: active ? '40px' : hovered ? '20px' : '8px' }} />
        </div>
      )}
      <div
        className={css(styles.itemContent)}
        style={{
          borderRadius: active || hovered ? '30%' : '50%',
          backgroundColor: active
            ? activeBackgroundColor
            : hovered
            ? hoverBackgroundColor
            : 'var(--background-primary)',
        }}
        onMouseEnter={() => onClick && setHovered(true)}
        onMouseLeave={() => onClick && setHovered(false)}
      >
        {component}
      </div>
      {mentionBadgeText && (
        <div
          className={css(styles.mentionBadgeContainer)}
          style={{ right: listDirection === 'vertical' ? '8px' : '-4px' }}
        >
          <MentionBadge text={mentionBadgeText} border />
        </div>
      )}
    </div>
  );
}

const MemoizedItemComponent = memo(ImageListItemComponent);

export default function ImageList({
  items,
  backgroundColor = 'var(--background-tertiary)',
  direction = 'vertical',
  height = '100%',
  active,
  onItemClick,
}: ImageListProps) {
  return (
    <div
      className={css(styles.container)}
      style={{
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        backgroundColor,
        alignItems: direction === 'horizontal' && 'center',
        width: direction === 'vertical' ? '72px' : '100%',
        height,
      }}
    >
      {items
        .sort((a, b) => a.position - b.position)
        .map((item) => (
          <MemoizedItemComponent
            key={item.id}
            {...item}
            active={active?.includes(typeof item === 'object' ? item.id : item)}
            onClick={onItemClick}
            listDirection={direction as Pick<ImageListProps, 'direction'>}
          />
        ))}
    </div>
  );
}

export {
  ImageListImageItem,
  ImageListDividerItem,
  ImageListIconItem,
  ImageListEmojiItem,
  ImageListCustomItem,
  ImageListItem,
  ImageListProps,
};
