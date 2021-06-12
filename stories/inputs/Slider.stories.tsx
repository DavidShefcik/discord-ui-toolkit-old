// import React, { useState, useEffect } from 'react';
// import { Story, Meta } from '@storybook/react';
// import { Slider, SliderProps, SliderInterval, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

// export default {
//   component: Slider,
//   title: 'Discord UI Toolkit/Inputs/Slider',
//   argTypes: {
//     theme: {
//       defaultValue: 'dark',
//       description: 'The UI toolkit theme.',
//       control: {
//         type: 'inline-radio',
//         options: ['dark', 'light'],
//       },
//     },
//     newMarketingLayout: {
//       defaultValue: false,
//       description: "Use the new colors from Discord's 2021 rebranding.",
//       control: {
//         type: 'boolean',
//       },
//     },
//     containerWidth: {
//       defaultValue: '100%',
//       description: 'The width of the slider container.',
//       control: {
//         type: 'text',
//       },
//     },
//     value: {
//       defaultValue: 10,
//       description: 'The value of the slider.',
//       control: {
//         type: 'number',
//       },
//     },
//     disabled: {
//       defaultValue: false,
//       description: 'Should the slider be disabled.',
//       control: {
//         type: 'boolean',
//       },
//     },
//     max: {
//       defaultValue: 100,
//       description: 'The maximum value of the slider.',
//       control: {
//         type: 'number',
//       },
//     },
//     min: {
//       defaultValue: 0,
//       description: 'The minimum value of the slider.',
//       control: {
//         type: 'number',
//       },
//     },
//     stickToMarkers: {
//       defaultValue: true,
//       description: 'If the value should only be values specified in the markers.',
//       control: {
//         type: 'boolean',
//       },
//     },
//   },
// } as Meta;

// export const Template: Story<SliderProps & DiscordProviderProps> = (props) => {
//   const { value } = props;
//   const sliderValues: SliderInterval[] = [
//     {
//       value: 0,
//       label: '0',
//     },
//     {
//       value: 1,
//       label: '1',
//     },
//     {
//       value: 10,
//       label: '10',
//     },
//     {
//       value: 16,
//       label: '16',
//     },
//     {
//       value: 25,
//       label: '25',
//     },
//     {
//       value: 33,
//       label: '33',
//     },
//     {
//       value: 50,
//       label: '50',
//     },
//     {
//       value: 57,
//       label: '57',
//     },
//     {
//       value: 66,
//       label: '66',
//     },
//     {
//       value: 75,
//       label: '75',
//     },
//     {
//       value: 86,
//       label: '86',
//     },
//     {
//       value: 100,
//       label: '100',
//     },
//   ];

//   const [sliderValue, setSliderValue] = useState(10);

//   useEffect(() => {
//     setSliderValue(value);
//   }, [value]);

//   const onChange = (newValue: number) => {
//     setSliderValue(newValue);
//   };

//   return (
//     <DiscordProvider {...props}>
//       <Slider {...props} values={sliderValues} value={sliderValue} onChange={onChange} />
//     </DiscordProvider>
//   );
// };
