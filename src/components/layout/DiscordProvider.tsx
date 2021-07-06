import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';

import ThemeContext from '@internal/context/ThemeContext';

import '@assets/css/discord-ui-toolkit.css';

import useOutsideClickAlerter from '@internal/hooks/useOutsideClickAlerter';

type ContextMenuItem = { id: number } & (
  | {
      type: 'divider';
    }
  | {
      type: 'item';
      text: string;
      value?: string;
      textColor?: string;
      hoverTextColor?: string;
      backgroundColor?: string;
      hoverBackgroundColor?: string;
      onClick?(item: ContextMenuItem): void;
      onShiftClick?(item: ContextMenuItem): void;
    }
);
type OnClickContextMenuItem = Extract<ContextMenuItem, { type: 'item' }>;

interface DiscordProviderProps {
  children: ReactNode;
  theme?: Theme;
  newMarketingLayout?: boolean;
  enableCustomContextMenu?: boolean;
  contextMenuItems?: ContextMenuItem[];
}
interface ContextMenuProps {
  visible: boolean;
  setVisible(visible: boolean): void;
  top: string;
  left: string;
  items: ContextMenuItem[];
}

const styles = StyleSheet.create({
  container: {
    '::-webkit-scrollbar': {
      width: '16px',
      height: '16px',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: 'var(--scrollbar-auto-track)',
      border: '4px solid transparent',
      backgroundClip: 'padding-box',
      borderRadius: '8px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--scrollbar-auto-thumb)',
      minHeight: '40px',
      border: '4px solid transparent',
      backgroundClip: 'padding-box',
      borderRadius: '8px',
    },
  },
  modalOpen: {
    height: '100vh',
    overflow: 'hidden',
  },
  contextMenuContainer: {
    position: 'absolute',
    zIndex: 100,
  },
  contextMenuContent: {
    minWidth: '188px',
    maxWidth: '320px',
    height: 'auto',
    maxHeight: 'calc(100vh - 32px)',
    position: 'relative',
    boxSizing: 'border-box',
    padding: '6px 8px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--elevation-high)',
    backgroundColor: 'var(--background-floating)',
    borderRadius: '4px',
    // Disable text highlight select
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  contextMenuDivider: {
    margin: '4px',
    borderBottom: '1px solid var(--background-modifier-accent)',
  },
  contextMenuButton: {
    outline: 0,
    boxSizing: 'border-box',
    padding: '6px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '32px',
    width: '100%',
    margin: '2px 0',
    borderRadius: '2px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'discord-bold',
    cursor: 'pointer',
  },
  contextMenuButtonText: {
    display: 'block',
    flex: '1 1 auto',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

function ContextMenuButton({
  item,
  setVisible,
}: {
  item: Extract<ContextMenuItem, { type: 'item' }>;
  setVisible(visible: boolean): void;
}) {
  const [hovered, setHovered] = useState(false);

  const {
    text,
    backgroundColor = 'transparent',
    hoverBackgroundColor = 'var(--blurple)',
    textColor = 'var(--interactive-normal)',
    hoverTextColor = 'white',
    onClick,
    onShiftClick,
  } = item;

  const onContextMenuButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (item.type === 'item') {
      if (event.shiftKey) {
        if (onShiftClick) {
          onShiftClick(item);
        }
      } else if (onClick) {
        onClick(item);
      }
      setVisible(false);
    }
  };

  return (
    <div
      className={css(styles.contextMenuButton)}
      onClick={onContextMenuButtonClick}
      style={{
        color: hovered ? hoverTextColor : textColor,
        backgroundColor: hovered ? hoverBackgroundColor : backgroundColor,
      }}
      role="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={css(styles.contextMenuButtonText)}>{text}</div>
    </div>
  );
}

function RightClickMenu({ visible, setVisible, top, left, items }: ContextMenuProps) {
  const contextMenuContainer = useRef<HTMLDivElement>();

  useOutsideClickAlerter({
    ref: contextMenuContainer,
    onOutsideClick: () => {
      setVisible(false);
    },
  });

  if (!visible) {
    return null;
  }

  return (
    <div className={css(styles.contextMenuContainer)} ref={contextMenuContainer} style={{ top, left }}>
      <div className={css(styles.contextMenuContent)}>
        {items.map((item: ContextMenuItem) => (
          <React.Fragment key={item.id}>
            {item.type === 'divider' ? (
              <div className={css(styles.contextMenuDivider)} />
            ) : (
              <ContextMenuButton item={item} setVisible={setVisible} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function DiscordProvider({
  children,
  theme = 'dark',
  newMarketingLayout = false,
  enableCustomContextMenu = false,
  contextMenuItems = [],
}: DiscordProviderProps) {
  const [globalTheme, setGlobalTheme] = useState<Theme>(theme);
  const [globalNewMarketingLayout, setGlobalNewMarketingLayout] = useState(newMarketingLayout);
  const [customRightClickMenuVisible, setCustomRightClickMenuVisible] = useState(false);
  const [customRightClickMenuCords, setCustomRightClickMenuCords] = useState<{ x: string; y: string }>({
    x: '0px',
    y: '0px',
  });

  useEffect(() => {
    const contextMenuEvent = (event: MouseEvent) => {
      event.preventDefault();
      const xPos = `${event.pageX}px`;
      const yPos = `${event.pageY}px`;

      setCustomRightClickMenuVisible(true);
      setCustomRightClickMenuCords({
        x: xPos,
        y: yPos,
      });
    };

    if (enableCustomContextMenu) {
      document.addEventListener('contextmenu', contextMenuEvent, false);
    } else {
      document.removeEventListener('contextmenu', contextMenuEvent);
      setCustomRightClickMenuVisible(false);
    }

    return () => {
      document.removeEventListener('contextmenu', contextMenuEvent);
    };
  }, [enableCustomContextMenu]);

  useEffect(() => {
    setGlobalTheme(theme);
  }, [theme]);

  useEffect(() => {
    setGlobalNewMarketingLayout(newMarketingLayout);
  }, [newMarketingLayout]);

  return (
    <ThemeContext.Provider
      value={{
        theme: globalTheme,
        setTheme: setGlobalTheme,
        newMarketingLayout: globalNewMarketingLayout,
      }}
    >
      <div
        className={`discord-container discord-base ${
          newMarketingLayout ? 'discord-new-colors' : 'discord-old-colors'
        } ${globalTheme === 'dark' ? 'discord-dark' : 'discord-light'} ${css(styles.container)}`}
      >
        {enableCustomContextMenu && (
          <RightClickMenu
            visible={customRightClickMenuVisible}
            items={contextMenuItems}
            left={customRightClickMenuCords.x}
            top={customRightClickMenuCords.y}
            setVisible={(visible) => setCustomRightClickMenuVisible(visible)}
          />
        )}
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export { DiscordProviderProps, ContextMenuItem, OnClickContextMenuItem };
