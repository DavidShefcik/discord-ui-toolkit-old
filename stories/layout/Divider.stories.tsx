import React from 'react';
import { Story, Meta } from '@storybook/react';
import { StyleSheet, css } from 'aphrodite';
import { Divider, DividerProps, ThemeProvider, ThemeProviderProps } from 'discord-ui-toolkit';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '250px',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default {
  component: Divider,
  title: 'Discord UI Toolkit/Layout/Divider',
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
    width: {
      defaultValue: '100%',
      description: 'Width of the divider.',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Template: Story<DividerProps & ThemeProviderProps> = (props) => (
  <ThemeProvider {...props}>
    <div className={css(styles.container)}>
      <Divider {...props} />
    </div>
  </ThemeProvider>
);
