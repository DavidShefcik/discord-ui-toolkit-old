import React, { useState, memo } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Icon from '@layout/Icon';
import Emoji from '@layout/Emoji';
import MentionBadge from '@layout/MentionBadge';

import { IconNamesType } from '@internal/values/icons';

import groupBy from 'lodash.groupby';

import isPropIconOrEmoji from '@internal/utils/isPropIconOrEmoji';

interface RightIcons {
  id: string | number;
  icon: string;
  onClick?(id: string | number, icon: string): void;
  showOnlyOnActive?: boolean;
  showOnlyOnHover?: boolean;
}
interface ChannelListItem {
  id: string | number;
  text: string;
  position: number;
  categoryId?: string | number;
  active?: boolean;
  onClick?(id: string | number): void;
  leftIcon?: string;
  rightIcons?: RightIcons[];
  dull?: boolean;
  disabled?: boolean;
  mentionBadgeText?: string;
  indicateUnread?: boolean;
  visibleWhileCategoryCollapsed?: boolean;
}
interface ChannelListCategory {
  id: string | number;
  label: string;
  position: number;
  rightIcon?: string;
  onRightIconClick?(id: string | number): void;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}
type OrganizedListItem =
  | (ChannelListItem & { type: 'item' })
  | (ChannelListCategory & { type: 'category'; items: ChannelListItem[] });
interface ChannelListProps {
  items: ChannelListItem[];
  categories: ChannelListCategory[];
  width?: string;
}

const styles = StyleSheet.create({
  listItemContainer: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // Disable text highlight select
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  listItemContent: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    padding: '1px 8px',
    boxSizing: 'border-box',
    marginLeft: '8px',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '6px 0',
  },
  listItemHovered: {
    backgroundColor: 'var(--background-modifier-hover)',
  },
  listItemActive: {
    backgroundColor: 'var(--background-modifier-selected)',
  },
  unreadIndicator: {
    backgroundColor: 'var(--interactive-active)',
    position: 'absolute',
    height: '8px',
    width: '4px',
    borderRadius: '0 4px 4px 0',
    top: '50%',
    left: '0',
    marginTop: '-4px',
  },
  leftIconContainer: {
    position: 'relative',
    marginRight: '6px',
  },
  channelTextContainer: {
    fontSize: '16px',
    fontFamily: 'discord-normal',
    fontWeight: 500,
    lineHeight: '20px',
    flex: '1 1 auto',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  channelText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  rightItemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightItemContainer: {
    marginLeft: '4px',
    height: '16px',
    display: 'flex',
    justifyContent: 'center',
  },
  categoryContainer: {
    position: 'relative',
    paddingTop: '16px',
    // Disable text highlight select
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  categoryContentContainer: {
    position: 'relative',
    boxSizing: 'border-box',
    height: '24px',
    padding: '0 8px 0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryContent: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  chevronIconContainer: {
    position: 'absolute',
    left: '2px',
    top: '6px',
    width: '12px',
    height: '12px',
    transition: 'transform 0.2s ease-out',
  },
  chevronRotated: {
    transform: 'rotate(-90deg)',
  },
  categoryTextContainer: {
    boxSizing: 'border-box',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textTransform: 'uppercase',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.25px',
    fontFamily: 'discord-bold',
    flex: '1 1 auto',
  },
  categoryText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    position: 'relative',
  },
  categoryRightItemsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

const isItem = (value: ChannelListItem | ChannelListCategory): value is ChannelListItem => {
  return (value as ChannelListItem).text !== undefined;
};
const isCategory = (value: ChannelListItem | ChannelListCategory): value is ChannelListCategory => {
  return (value as ChannelListCategory).label !== undefined;
};

function ChannelListItemComponent({
  id,
  text,
  active = false,
  disabled = false,
  dull = false,
  indicateUnread = false,
  leftIcon,
  rightIcons,
  mentionBadgeText,
  onClick,
}: ChannelListItem) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={css([styles.listItemContainer])}>
      {indicateUnread && <div className={css(styles.unreadIndicator)} />}
      <div
        style={{ cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : undefined }}
        className={css([
          styles.listItemContent,
          hovered && !disabled && !active && styles.listItemHovered,
          active && styles.listItemActive,
        ])}
        onMouseEnter={() => onClick && setHovered(true)}
        onMouseLeave={() => onClick && setHovered(false)}
        onClick={() => onClick && onClick(id)}
      >
        <div className={css(styles.listItemText)}>
          {leftIcon && (
            <div className={css(styles.leftIconContainer)} aria-label="list-item-left-icon">
              {isPropIconOrEmoji(leftIcon) === 'icon' ? (
                <Icon
                  icon={leftIcon as IconNamesType}
                  size="20px"
                  iconColor={dull && !active ? 'var(--interactive-muted)' : 'var(--text-muted)'}
                />
              ) : (
                <Emoji emoji={leftIcon} size="20px" color={false} />
              )}
            </div>
          )}
          <div
            style={{
              color: disabled
                ? 'var(--channels-default)'
                : dull && !active && !hovered
                ? 'var(--interactive-muted)'
                : active || indicateUnread
                ? 'var(--interactive-active)'
                : hovered && !disabled
                ? 'var(--interactive-hover)'
                : 'var(--channels-default)',
            }}
            className={css(styles.channelTextContainer)}
          >
            <div className={css(styles.channelText)}>{text}</div>
          </div>
          {((rightIcons && rightIcons.length > 0) || mentionBadgeText) && (
            <div className={css(styles.rightItemsContainer)}>
              {rightIcons &&
                rightIcons.map(({ id: iconId, icon, onClick, showOnlyOnActive, showOnlyOnHover }) => {
                  const component = (
                    <div key={iconId} className={css(styles.rightItemContainer)} aria-label="list-item-right-icon">
                      {isPropIconOrEmoji(icon) === 'icon' ? (
                        <Icon
                          icon={icon as IconNamesType}
                          size="16px"
                          iconColor={disabled ? 'var(--interactive-muted)' : 'var(--interactive-normal)'}
                          iconHoverColor={onClick && 'var(--interactive-hover)'}
                          onClick={onClick && ((icon) => onClick(id, icon))}
                        />
                      ) : (
                        <Emoji
                          emoji={icon}
                          size="16px"
                          color={false}
                          onClick={onClick && ((emoji) => onClick(id, emoji))}
                        />
                      )}
                    </div>
                  );

                  if (showOnlyOnActive || showOnlyOnHover) {
                    if (showOnlyOnActive && active) {
                      return component;
                    } else if (showOnlyOnHover && hovered) {
                      return component;
                    } else {
                      return null;
                    }
                  }

                  return component;
                })}
              {mentionBadgeText && (
                <div className={css(styles.rightItemContainer)}>
                  <MentionBadge text={mentionBadgeText} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const MemoizedItemComponent = memo(ChannelListItemComponent);

function ChannelListCategoryComponent({
  id,
  label,
  collapsible = true,
  defaultCollapsed = false,
  onRightIconClick,
  rightIcon,
  items,
}: ChannelListCategory & { items: ChannelListItem[] }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [hovered, setHovered] = useState(false);

  return (
    <div className={css(styles.categoryContainer)}>
      <div className={css(styles.categoryContentContainer)}>
        <div
          style={{
            cursor: collapsible && 'pointer',
            color: hovered ? 'var(--interactive-hover)' : 'var(--channels-default)',
          }}
          className={css(styles.categoryContent)}
          onMouseEnter={() => collapsible && setHovered(true)}
          onMouseLeave={() => collapsible && setHovered(false)}
          onClick={() => collapsible && setCollapsed(!collapsed)}
        >
          {collapsible && (
            <div className={css([styles.chevronIconContainer, collapsed && styles.chevronRotated])}>
              <Icon
                icon="down_chevron"
                size="12px"
                iconColor={hovered ? 'var(--interactive-hover)' : 'var(--channels-default)'}
              />
            </div>
          )}
          <div className={css(styles.categoryTextContainer)}>
            <div className={css(styles.categoryText)}>{label}</div>
          </div>
        </div>
        {rightIcon && (
          <div className={css(styles.categoryRightItemsContainer)} aria-label="list-category-right-icon">
            {isPropIconOrEmoji(rightIcon) === 'icon' ? (
              <Icon
                icon={rightIcon as IconNamesType}
                size="18px"
                iconColor="var(--channels-default)"
                iconHoverColor={onRightIconClick && 'var(--interactive-hover)'}
                onClick={onRightIconClick && (() => onRightIconClick(id))}
              />
            ) : (
              <Emoji
                emoji={rightIcon}
                size="18px"
                color={false}
                onClick={onRightIconClick && (() => onRightIconClick(id))}
              />
            )}
          </div>
        )}
      </div>
      {collapsed
        ? items
            .filter(({ visibleWhileCategoryCollapsed }) => visibleWhileCategoryCollapsed)
            .map((item) => <ChannelListItemComponent key={item.id} {...item} />)
        : items.map((item) => <ChannelListItemComponent key={item.id} {...item} />)}
    </div>
  );
}
const MemoizedCategoryComponent = memo(ChannelListCategoryComponent);

export default function ChannelList({ items, categories, width = '240px' }: ChannelListProps) {
  const itemsInCategory = items.filter(({ categoryId }) => categoryId !== undefined && categoryId !== null);
  const itemsNotInCategory = items.filter(({ categoryId }) => categoryId === undefined || categoryId === null);
  const categoryItems = groupBy(itemsInCategory, 'categoryId');

  const organizedCategories = categories ? categories.sort((a, b) => a.position - b.position) : [];
  const organizedItemsInCategories = Object.keys(categoryItems).map((key) => ({
    categoryId: key,
    items: categoryItems[key].sort((a, b) => a.position - b.position),
  }));
  const allItems: Array<OrganizedListItem> = [...organizedCategories, ...itemsNotInCategory]
    .map((item: ChannelListItem | ChannelListCategory) => {
      if (isItem(item)) {
        return {
          type: 'item' as const,
          ...item,
        };
      } else if (isCategory(item)) {
        const items = organizedItemsInCategories
          ? organizedItemsInCategories.find(({ categoryId }) => categoryId == item.id)?.items
          : [];
        return {
          type: 'category' as const,
          items,
          ...item,
        };
      }
    })
    .sort((a, b) => a.position - b.position);

  return (
    <div style={{ display: 'inline-block', width }}>
      {allItems.map((item) =>
        item.type === 'item' ? (
          <MemoizedItemComponent key={`channel-list-item-${item.id}`} {...item} />
        ) : (
          <MemoizedCategoryComponent key={`channel-list-category-${item.id}`} items={item.items} {...item} />
        )
      )}
    </div>
  );
}

export { ChannelListItem, ChannelListCategory, ChannelListProps };
