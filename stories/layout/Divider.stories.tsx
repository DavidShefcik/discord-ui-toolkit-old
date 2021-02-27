import React from 'react';
import { Story, Meta } from '@storybook/react';
import { StyleSheet, css } from 'aphrodite';
import { Divider, DividerProps, ThemeProvider, ThemeProviderProps } from '../../src/components';

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
    width: {
      defaultValue: '100%',
      description: 'Width of the divider.',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Template: Story<DividerProps & ThemeProviderProps> = (props) => {
  const { theme } = props;
  return (
    <ThemeProvider theme={theme}>
      <div className={css(styles.container)}>
        <Divider {...props} />
      </div>
    </ThemeProvider>
  );
};
