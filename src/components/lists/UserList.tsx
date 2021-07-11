import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Icon from '@layout/Icon';
import Emoji from '@layout/Emoji';
import UserAvatar from '@layout/UserAvatar';
import UserTag from '@layout/UserTag';

import { iconNames, IconNamesType } from '@internal/values/icons';

import groupBy from 'lodash.groupby';

interface UserListItem {
  id: string | number;
  avatarSource: string;
  username: string;
  usernameColor?: string;
  categoryId?: string | number;
  dull?: boolean;
  statusText?: string;
  boldStatusText?: string;
  leftStatusIcon?: string;
  leftStatusIconColor?: string;
  rightStatusIcon?: string;
  rightStatusIconColor?: string;
  rightUserIcon?: string;
  rightUserIconColor?: string;
  userTagText?: string;
  userTagCheckmark?: boolean;
  userTagBlurple?: boolean;
  onClick?(id: string | number): void;
}
interface UserListCategory {
  id: string | number;
  label: string;
  showItemCount?: boolean;
  rightIcon?: string;
  onRightIconClick?(id: string | number): void;
}
type ListItemKey = string | number | undefined;
type OrganizedUserItem = Record<ListItemKey, UserListItem[]>;
interface ListItemProps {
  categoryKey: ListItemKey;
  organizedUserItems: OrganizedUserItem;
  categories?: UserListCategory[];
}
interface UserListProps {
  items: UserListItem[];
  categories: UserListCategory[];
  showItemsWithoutCategory?: boolean;
  width?: string;
}

const styles = StyleSheet.create({
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
    marginLeft: '8px',
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

const isPropIconOrEmoji = (value: string): 'icon' | 'emoji' => {
  if ((iconNames as string[]).includes(value)) {
    return 'icon';
  } else {
    return 'emoji';
  }
};

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
  onClick,
}: UserListItem) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={css(styles.userContainer)}
      style={{ cursor: onClick && 'pointer', opacity: dull && !hovered ? 0.3 : 1 }}
      onMouseEnter={() => onClick && setHovered(true)}
      onMouseLeave={() => onClick && setHovered(false)}
      onClick={() => onClick && onClick(id)}
    >
      <div
        className={css(styles.userContent)}
        style={{ backgroundColor: hovered && 'var(--background-modifier-hover)' }}
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
                {isPropIconOrEmoji(rightUserIcon) === 'icon' ? (
                  <Icon icon={rightUserIcon as IconNamesType} size="14px" iconColor={rightUserIconColor} />
                ) : (
                  <Emoji emoji={rightUserIcon} size="14px" />
                )}
              </div>
            )}
          </div>
          {(leftStatusIcon || statusText || rightStatusIcon) && (
            <div className={css(styles.bottomTextContainer)}>
              <div className={css(styles.status)}>
                {leftStatusIcon && (
                  <div className={css(styles.leftStatusIcon)} aria-label="Left Status Icon">
                    {isPropIconOrEmoji(leftStatusIcon) === 'icon' ? (
                      <Icon icon={leftStatusIcon as IconNamesType} size="14px" iconColor={leftStatusIconColor} />
                    ) : (
                      <Emoji emoji={leftStatusIcon} size="14px" />
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
                    {isPropIconOrEmoji(rightStatusIcon) === 'icon' ? (
                      <Icon icon={rightStatusIcon as IconNamesType} size="16px" iconColor={rightStatusIconColor} />
                    ) : (
                      <Emoji emoji={rightStatusIcon} size="16px" />
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
            {isPropIconOrEmoji(rightIcon) === 'icon' ? (
              <Icon
                icon={rightIcon as IconNamesType}
                size="16px"
                iconColor={hovered ? 'var(--interactive-hover)' : 'var(--channels-default)'}
                onClick={() => onRightIconClick && onRightIconClick(id)}
              />
            ) : (
              <Emoji emoji={rightIcon} size="16px" onClick={() => onRightIconClick && onRightIconClick(id)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
function ListItem({ categoryKey, organizedUserItems, categories = [] }: ListItemProps) {
  const category = categoryKey !== undefined && categories ? categories.find(({ id }) => categoryKey == id) : null;

  return (
    <>
      {category && (
        <UserListCategoryComponent
          key={`category-${category.id}`}
          itemCount={category ? organizedUserItems[category.id].length : 0}
          {...category}
        />
      )}
      {organizedUserItems[categoryKey].map((item: UserListItem) => (
        <UserListItemComponent key={`item-${item.id}`} {...item} />
      ))}
    </>
  );
}
export default function UserList({
  items,
  categories,
  showItemsWithoutCategory = true,
  width = '224px',
}: UserListProps) {
  const organizedUserItems = groupBy(
    items.filter(({ categoryId }) => categoryId !== undefined && categoryId !== null),
    'categoryId'
  ) as OrganizedUserItem;

  return (
    <div style={{ display: 'inline-block', width }}>
      {Object.keys(organizedUserItems).map((key: string | number | undefined) => (
        <ListItem
          key={`list-item-${key}`}
          categoryKey={key}
          organizedUserItems={organizedUserItems}
          categories={categories}
        />
      ))}
      {showItemsWithoutCategory &&
        items
          .filter(({ categoryId }) => categoryId === undefined || categoryId === null)
          .map((item) => <UserListItemComponent key={`user-list-item-${item.id}`} {...item} />)}
    </div>
  );
}

export { UserListItem, UserListCategory, UserListProps };
