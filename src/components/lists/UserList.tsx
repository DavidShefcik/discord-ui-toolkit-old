import React, { MouseEvent, ReactChild, useState, memo } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Icon from '@layout/Icon';
import Emoji from '@layout/Emoji';
import UserAvatar from '@layout/UserAvatar';
import UserTag from '@layout/UserTag';

import { IconNamesType } from '@internal/values/icons';

import groupBy from 'lodash.groupby';

import isPropIconEmojiOrComponent from '@internal/utils/isPropIconEmojOrComponent';

type UserItemOnClick = (id: string | number, event: MouseEvent<HTMLDivElement>) => void;
interface UserListItem {
  id: string | number;
  avatarSource: string;
  username: string;
  usernameColor?: string;
  categoryId?: string | number;
  dull?: boolean;
  statusText?: string;
  boldStatusText?: string;
  leftStatusIcon?: ReactChild | string;
  leftStatusIconColor?: string;
  rightStatusIcon?: ReactChild | string;
  rightStatusIconColor?: string;
  rightUserIcon?: ReactChild | string;
  rightUserIconColor?: string;
  userTagText?: string;
  userTagCheckmark?: boolean;
  userTagBlurple?: boolean;
}
interface UserListCategory {
  id: string | number;
  label: string;
  showItemCount?: boolean;
  rightIcon?: ReactChild | string;
  onRightIconClick?(id: string | number, event: MouseEvent<HTMLDivElement>): void;
}
type ListItemKey = string | number | undefined;
type OrganizedUserItem = Record<ListItemKey, UserListItem[]>;
interface ListItemProps {
  categoryKey: ListItemKey;
  organizedUserItems: OrganizedUserItem;
  categories?: UserListCategory[];
  activeItems?: Array<string | number | UserListItem>;
  onItemClick?: UserItemOnClick;
}
interface UserListProps {
  items: UserListItem[];
  backgroundColor?: string;
  categories?: UserListCategory[];
  showItemsWithoutCategory?: boolean;
  active?: Array<string | number | UserListItem>;
  onItemClick?: UserItemOnClick;
  width?: string;
  height?: string;
}

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    overflowX: 'hidden',
    overflowY: 'auto',
    boxSizing: 'border-box',
    padding: '16px 8px 16px 8px',
    // Disable text highlight select
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  categoryContainer: {
    height: '40px',
    padding: '24px 8px 0 16px',
    boxSizing: 'border-box',
    lineHeight: '16px',
    letterSpacing: '0.25px',
  },
  categoryRightIcon: {
    width: '16px',
    height: '16px',
    margin: '0 2px',
  },
  categoryLabelContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'discord-normal',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  categoryLabel: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  itemCountLabel: {
    whiteSpace: 'nowrap',
  },
  userContainer: {
    position: 'relative',
    width: '100%',
    display: 'block',
    padding: '1px 0',
    boxSizing: 'border-box',
    borderRadius: '4px',
    color: 'var(--channels-default)',
  },
  userContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    height: '42px',
    padding: '0 8px',
    boxSizing: 'border-box',
  },
  userItemHovered: {
    backgroundColor: 'var(--background-modifier-hover)',
  },
  userItemActive: {
    backgroundColor: 'var(--background-modifier-selected)',
  },
  avatarContainer: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px',
  },
  userInfoContainer: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  nameContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontSize: '16px',
    lineHeight: '20px',
    fontFamily: 'discord-normal',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  rightUserIconContainer: {
    padding: '0 4px',
  },
  bottomTextContainer: {
    marginTop: '-2px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    lineHeight: '16px',
    color: 'var(--channels-default)',
    fontFamily: 'discord-normal',
  },
  leftStatusIcon: {
    height: '14px',
    width: '14px',
    marginRight: '4px',
  },
  statusText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  boldStatusText: {
    fontWeight: 600,
  },
  rightStatusIcon: {
    height: '16px',
    width: '16px',
    marginLeft: '4px',
  },
});

function UserListItemComponent({
  id,
  avatarSource,
  usernameColor = 'var(--channels-default)',
  username,
  dull = false,
  statusText,
  boldStatusText,
  leftStatusIcon,
  leftStatusIconColor = 'var(--channels-default)',
  rightStatusIcon,
  rightStatusIconColor = 'var(--channels-default)',
  rightUserIcon,
  rightUserIconColor = 'var(--channels-default)',
  userTagText,
  userTagCheckmark = false,
  userTagBlurple = true,
  active,
  onClick,
}: UserListItem & { active: boolean; onClick: UserItemOnClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={css(styles.userContainer)}
      style={{ cursor: onClick && 'pointer', opacity: dull && !hovered ? 0.3 : 1 }}
      onMouseEnter={() => onClick && setHovered(true)}
      onMouseLeave={() => onClick && setHovered(false)}
      onClick={(event) => onClick && onClick(id, event)}
    >
      <div
        className={css([styles.userContent, active ? styles.userItemActive : hovered ? styles.userItemHovered : null])}
      >
        <div className={css(styles.avatarContainer)}>
          <UserAvatar avatarSource={avatarSource} size="small" />
        </div>
        <div className={css(styles.userInfoContainer)}>
          <div className={css(styles.nameContainer)}>
            <div className={css(styles.name)} style={{ color: usernameColor }}>
              {username}
            </div>
            {userTagText && (
              <div className={css(styles.rightUserIconContainer)}>
                <UserTag text={userTagText} checkmark={userTagCheckmark} blurple={userTagBlurple} />
              </div>
            )}
            {rightUserIcon && (
              <div className={css(styles.rightUserIconContainer)} aria-label="Right User Icon">
                {isPropIconEmojiOrComponent(rightUserIcon) === 'icon' ? (
                  <Icon icon={rightUserIcon as IconNamesType} size="14px" iconColor={rightUserIconColor} />
                ) : isPropIconEmojiOrComponent(rightUserIcon) === 'emoji' ? (
                  <Emoji emoji={rightUserIcon as string} size="14px" />
                ) : (
                  rightUserIcon
                )}
              </div>
            )}
          </div>
          {(leftStatusIcon || statusText || rightStatusIcon) && (
            <div className={css(styles.bottomTextContainer)}>
              <div className={css(styles.status)}>
                {leftStatusIcon && (
                  <div className={css(styles.leftStatusIcon)} aria-label="Left Status Icon">
                    {isPropIconEmojiOrComponent(leftStatusIcon) === 'icon' ? (
                      <Icon icon={leftStatusIcon as IconNamesType} size="14px" iconColor={leftStatusIconColor} />
                    ) : isPropIconEmojiOrComponent(leftStatusIcon) === 'emoji' ? (
                      <Emoji emoji={leftStatusIcon as string} size="14px" />
                    ) : (
                      leftStatusIcon
                    )}
                  </div>
                )}
                {statusText && (
                  <div className={css(styles.statusText)}>
                    {statusText}
                    {boldStatusText && <span className={css(styles.boldStatusText)}> {boldStatusText}</span>}
                  </div>
                )}
                {rightStatusIcon && (
                  <div className={css(styles.rightStatusIcon)} aria-label="Right Status Icon">
                    {isPropIconEmojiOrComponent(rightStatusIcon) === 'icon' ? (
                      <Icon icon={rightStatusIcon as IconNamesType} size="16px" iconColor={rightStatusIconColor} />
                    ) : isPropIconEmojiOrComponent(rightStatusIcon) === 'emoji' ? (
                      <Emoji emoji={rightStatusIcon as string} size="16px" />
                    ) : (
                      rightStatusIcon
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const MemoizedItemComponent = memo(UserListItemComponent);

function UserListCategoryComponent({
  id,
  label,
  showItemCount = true,
  itemCount,
  rightIcon,
  onRightIconClick,
}: UserListCategory & { itemCount: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={css(styles.categoryContainer)}>
      <div
        className={css(styles.categoryLabelContainer)}
        style={{ color: hovered ? 'var(--interactive-hover)' : 'var(--channels-default)' }}
        onMouseEnter={() => onRightIconClick && setHovered(true)}
        onMouseLeave={() => onRightIconClick && setHovered(false)}
      >
        <div className={css(styles.categoryLabel)}>
          {label}
          {showItemCount && <span className={css(styles.itemCountLabel)}> - {itemCount.toString()}</span>}
        </div>
        {rightIcon && (
          <div
            className={css(styles.categoryRightIcon)}
            style={{ cursor: onRightIconClick && 'pointer' }}
            aria-label="Right Category Icon"
          >
            {isPropIconEmojiOrComponent(rightIcon) === 'icon' ? (
              <Icon
                icon={rightIcon as IconNamesType}
                size="16px"
                iconColor={hovered ? 'var(--interactive-hover)' : 'var(--channels-default)'}
                onClick={(icon, event) => onRightIconClick && onRightIconClick(id, event)}
              />
            ) : isPropIconEmojiOrComponent(rightIcon) === 'emoji' ? (
              <Emoji
                emoji={rightIcon as string}
                size="16px"
                onClick={(emoji, event) => onRightIconClick && onRightIconClick(id, event)}
              />
            ) : (
              rightIcon
            )}
          </div>
        )}
      </div>
    </div>
  );
}
const MemoizedCategoryComponent = memo(UserListCategoryComponent);

function ListItem({ categoryKey, organizedUserItems, categories = [], activeItems, onItemClick }: ListItemProps) {
  const category = categoryKey !== undefined && categories ? categories.find(({ id }) => categoryKey == id) : null;

  return (
    <>
      {category && (
        <MemoizedCategoryComponent
          key={`category-${category.id}`}
          itemCount={category ? organizedUserItems[category.id].length : 0}
          {...category}
        />
      )}
      {organizedUserItems[categoryKey].map((item: UserListItem) => (
        <MemoizedItemComponent
          key={`item-${item.id}`}
          {...item}
          active={activeItems?.includes(typeof item === 'object' ? item.id : item)}
          onClick={onItemClick}
        />
      ))}
    </>
  );
}
export default function UserList({
  items,
  backgroundColor = 'var(--background-secondary)',
  categories = [],
  showItemsWithoutCategory = true,
  active,
  onItemClick,
  width = '224px',
  height = '100%',
}: UserListProps) {
  const organizedUserItems = groupBy(
    items.filter(({ categoryId }) => categoryId !== undefined && categoryId !== null),
    'categoryId'
  ) as OrganizedUserItem;

  return (
    <div style={{ backgroundColor, width, height }} className={css(styles.container)}>
      {Object.keys(organizedUserItems).map((key: string | number | undefined) => (
        <ListItem
          key={`list-item-${key}`}
          categoryKey={key}
          activeItems={active}
          onItemClick={onItemClick}
          organizedUserItems={organizedUserItems}
          categories={categories}
        />
      ))}
      {showItemsWithoutCategory &&
        items
          .filter(({ categoryId }) => categoryId === undefined || categoryId === null)
          .map((item) => (
            <MemoizedItemComponent
              key={`user-list-item-${item.id}`}
              {...item}
              active={active?.includes(typeof item === 'object' ? item.id : item)}
              onClick={onItemClick}
            />
          ))}
    </div>
  );
}

export { UserListItem, UserListCategory, UserListProps };
