import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  SmallUserProfile,
  SmallUserProfileProps,
  ProfileSection,
  GreenNewDefaultAvatar,
  GreenOldDefaultAvatar,
  DiscordProvider,
  DiscordProviderProps,
} from 'discord-ui-toolkit';

export default {
  component: SmallUserProfile,
  title: 'Discord UI Toolkit/Layout/SmallUserProfile',
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
    avatarHoverText: {
      defaultValue: 'View Profile',
      description: 'The text to show on top of the avatar upon hover.',
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
  },
} as Meta;

const sections: ProfileSection[] = [
  {
    label: 'First Section',
    content: <span>First Section Content</span>,
  },
  {
    label: 'Second Section',
    content: <span>Second Section Content</span>,
  },
];

export const DefaultnewMarketingColors: Story<SmallUserProfileProps & DiscordProviderProps> = (props) => {
  return (
    <DiscordProvider {...props} newMarketingColors={true}>
      <SmallUserProfile username="Username" avatarSource={GreenNewDefaultAvatar} />
    </DiscordProvider>
  );
};

export const newMarketingColors: Story<SmallUserProfileProps & DiscordProviderProps> = (props) => {
  return (
    <DiscordProvider {...props} newMarketingColors={true}>
      <SmallUserProfile
        {...props}
        avatarSource={GreenNewDefaultAvatar}
        onAvatarClick={(avatarSource) => console.log(avatarSource)}
        sections={sections}
      >
        <p>New marketing colors</p>
      </SmallUserProfile>
    </DiscordProvider>
  );
};

export const DefaultOldMarketingLayout: Story<SmallUserProfileProps & DiscordProviderProps> = (props) => {
  return (
    <DiscordProvider {...props} newMarketingColors={false}>
      <SmallUserProfile username="Username" avatarSource={GreenOldDefaultAvatar} />
    </DiscordProvider>
  );
};

export const OldMarketingLayout: Story<SmallUserProfileProps & DiscordProviderProps> = (props) => {
  return (
    <DiscordProvider {...props} newMarketingColors={false}>
      <SmallUserProfile
        {...props}
        avatarSource={GreenOldDefaultAvatar}
        onAvatarClick={(avatarSource) => console.log(avatarSource)}
        sections={sections}
      >
        <p>Old marketing colors</p>
      </SmallUserProfile>
    </DiscordProvider>
  );
};
