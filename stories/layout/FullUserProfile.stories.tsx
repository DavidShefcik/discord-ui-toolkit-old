import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  FullUserProfile,
  FullUserProfileProps,
  FullUserProfileTab,
  ButtonTypes,
  GreenNewDefaultAvatar,
  GreenOldDefaultAvatar,
  DiscordProvider,
  DiscordProviderProps,
} from 'discord-ui-toolkit';

export default {
  component: FullUserProfile,
  title: 'Discord UI Toolkit/Layout/FullUserProfile',
  argTypes: {
    theme: {
      defaultValue: 'dark',
      description: 'The UI toolkit theme.',
      control: {
        type: 'inline-radio',
        options: ['dark', 'light'],
      },
    },
    username: {
      defaultValue: 'Username',
      description: 'The username of the user.',
      control: {
        type: 'text',
      },
    },
    discriminator: {
      defaultValue: '1234',
      description: 'The username of the user.',
      control: {
        type: 'text',
      },
    },
    headerBackgroundColor: {
      defaultValue: '#7289da',
      description: 'The background color of the header.',
      control: {
        type: 'color',
      },
    },
    activityBackgroundColor: {
      defaultValue: '#677bc4',
      description: 'The background color of the activity section. (Only visible when using the old layout.)',
      control: {
        type: 'color',
      },
    },
    activityTitle: {
      defaultValue: 'Playing a game',
      description: 'The activity title text.',
      control: {
        type: 'text',
      },
    },
    activitySubtitle: {
      defaultValue: 'activity subtitle goes here',
      description: 'The activity title text.',
      control: {
        type: 'text',
      },
    },
    userTagText: {
      defaultValue: 'BOT',
      description: 'The text of the user tag.',
      control: {
        type: 'text',
      },
    },
    userTagCheckmark: {
      defaultValue: false,
      description: 'Show the checkmark icon.',
      control: {
        type: 'boolean',
      },
    },
    userTagBlurple: {
      defaultValue: false,
      description: 'Should the background color of the user tag be blurple.',
      control: {
        type: 'boolean',
      },
    },
    defaultTab: {
      defaultValue: 0,
      description: 'The default tab to show.',
      control: {
        type: 'number',
      },
    },
    actionButtonText: {
      defaultValue: 'Action Button',
      description: 'The text of the action button.',
      control: {
        type: 'text',
      },
    },
    actionButtonType: {
      defaultValue: 'green',
      description: 'The action button type.',
      control: {
        type: 'inline-radio',
        options: [
          'blurple',
          'greyple',
          'green',
          'red_filled',
          'red_empty',
          'white_empty',
          'only_text',
        ] as ButtonTypes[],
      },
    },
    actionButtonDisabled: {
      defaultValue: false,
      description: 'Should the action button be disabled.',
      control: {
        type: 'boolean',
      },
    },
    actionButtonLoading: {
      defaultValue: false,
      description: 'Should the action button be loading.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const tabs: FullUserProfileTab[] = [
  {
    id: 0,
    label: 'First Section',
    content: <span>First Section Content</span>,
  },
  {
    id: 1,
    label: 'Second Section',
    content: <span>Second Section Content</span>,
    sections: [
      {
        label: 'Section',
        content: <span>Section Content</span>,
      },
      {
        label: 'Section Two',
        content: <span>Section Two Content</span>,
      },
    ],
  },
  {
    id: 2,
    label: 'Third Section',
    content: <span>Third Section Content</span>,
  },
];

export const DefaultnewMarketingColors: Story<FullUserProfileProps & DiscordProviderProps> = (props) => {
  return (
    <DiscordProvider {...props} newMarketingColors={true}>
      <FullUserProfile username="Username" avatarSource={GreenNewDefaultAvatar} />
    </DiscordProvider>
  );
};

export const newMarketingColors: Story<FullUserProfileProps & DiscordProviderProps> = (props) => {
  return (
    <DiscordProvider {...props} newMarketingColors={true}>
      <FullUserProfile
        {...props}
        avatarSource={GreenNewDefaultAvatar}
        tabs={tabs}
        actionButtonOnClick={() => console.log('Action button click')}
      >
        <p>New marketing colors</p>
      </FullUserProfile>
    </DiscordProvider>
  );
};

export const DefaultOldMarketingLayout: Story<FullUserProfileProps & DiscordProviderProps> = (props) => {
  return (
    <DiscordProvider {...props} newMarketingColors={false}>
      <FullUserProfile username="Username" avatarSource={GreenOldDefaultAvatar} />
    </DiscordProvider>
  );
};

export const OldMarketingLayout: Story<FullUserProfileProps & DiscordProviderProps> = (props) => {
  return (
    <DiscordProvider {...props} newMarketingColors={false}>
      <FullUserProfile
        {...props}
        avatarSource={GreenOldDefaultAvatar}
        tabs={tabs}
        actionButtonOnClick={() => console.log('Action button click')}
      >
        <p>Old marketing colors</p>
      </FullUserProfile>
    </DiscordProvider>
  );
};
