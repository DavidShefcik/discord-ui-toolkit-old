import React from 'react';
import { Story, Meta } from '@storybook/react';
import { DiscordProvider, DiscordProviderProps, OnClickContextMenuItem } from 'discord-ui-toolkit';

export default {
  component: DiscordProvider,
  title: 'Discord UI Toolkit/Layout/DiscordProvider',
  argTypes: {
    theme: {
      defaultValue: 'dark',
      description: 'The UI toolkit theme.',
      control: {
        type: 'inline-radio',
        options: ['dark', 'light'],
      },
    },
    newMarketingColors: {
      defaultValue: false,
      description: "Use the new colors from Discord's 2021 rebranding.",
      control: {
        type: 'boolean',
      },
    },
    enableCustomContextMenu: {
      defaultValue: true,
      description: 'Enable usage of a custom right click menu.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Template: Story<DiscordProviderProps> = (props) => (
  <DiscordProvider
    {...props}
    contextMenuItems={[
      {
        id: 0,
        text: 'Test',
        type: 'item',
        onClick: () => console.log('On click'),
        onShiftClick: () => console.log('On shift click'),
      },
      {
        id: 1,
        text: 'Test 2',
        type: 'item',
        onClick: () => console.log('On click'),
        onShiftClick: () => console.log('On shift click'),
      },
      {
        id: 2,
        type: 'divider',
      },
      {
        id: 3,
        text: 'Test 3',
        type: 'item',
        value: 'Test 3 value',
        onClick: (item: OnClickContextMenuItem) => console.log(item.value),
        onShiftClick: () => console.log('On shift click'),
        textColor: 'var(--red)',
        hoverBackgroundColor: 'var(--red)',
      },
    ]}
  >
    <p>Discord Provider</p>
  </DiscordProvider>
);
