import React, { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Slider, SliderProps, SliderInterval, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: Slider,
  title: 'Discord UI Toolkit/Inputs/Slider',
  argTypes: {
    theme: {
      defaultValue: 'dark',
      description: 'The UI toolkit theme.',
      control: {
        type: 'inline-radio',
        options: ['dark', 'light'],
      },
    },
    newMarketingLayout: {
      defaultValue: false,
      description: "Use the new colors from Discord's 2021 rebranding.",
      control: {
        type: 'boolean',
      },
    },
    width: {
      defaultValue: '100%',
      description: 'The width of the slider.',
      control: {
        type: 'text',
      },
    },
    min: {
      defaultValue: 0,
      description: 'The minimum value of the slider.',
      control: {
        type: 'number',
      },
    },
    max: {
      defaultValue: 100,
      description: 'The maximum value of the slider.',
      control: {
        type: 'number',
      },
    },
    intervals: {
      description: 'The intervals on the slider.',
      table: {
        disabled: true,
      },
    },
    disabled: {
      description: 'Should the slider be disabled.',
      table: {
        disabled: true,
      },
    },
    units: {
      defaultValue: '',
      description: 'The unit to display on the interval labels.',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

const intervals: SliderInterval[] = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '16',
    value: 16,
  },
  {
    label: '50',
    value: 50,
    green: true,
  },
  {
    label: '42',
    value: 42,
  },
  {
    label: '75',
    value: 75,
  },
  {
    label: '92',
    value: 92,
  },
  {
    label: '100',
    value: 100,
  },
  {
    label: '110',
    value: 110,
  },
];

export const Default: Story<SliderProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [sliderValue, setSliderValue] = useState(50);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  return (
    <DiscordProvider {...props}>
      <Slider {...props} value={sliderValue} onChange={(val) => setSliderValue(val)} />
    </DiscordProvider>
  );
};

export const Disabled: Story<SliderProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [sliderValue, setSliderValue] = useState(50);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  return (
    <DiscordProvider {...props}>
      <Slider {...props} value={sliderValue} onChange={(val) => setSliderValue(val)} intervals={intervals} disabled />
    </DiscordProvider>
  );
};

export const Markers: Story<SliderProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [sliderValue, setSliderValue] = useState(50);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  return (
    <DiscordProvider {...props}>
      <Slider
        {...props}
        value={sliderValue}
        onChange={(val) => setSliderValue(val)}
        intervals={intervals}
        stickToMarkers
      />
    </DiscordProvider>
  );
};
