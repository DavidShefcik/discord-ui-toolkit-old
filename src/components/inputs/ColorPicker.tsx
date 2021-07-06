import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Saturation, Hue } from 'react-color/lib/components/common';
import { CustomPicker, CustomPickerProps } from 'react-color';

import TextInput from './TextInput';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'var(--background-primary)',
    border: '1px solid var(--background-tertiary)',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  saturationSliderContainer: {
    position: 'relative',
    width: '100%',
    height: '150px',
    borderRadius: '3px',
  },
  hueSliderContainer: {
    height: '8px',
    margin: '8px 0',
    position: 'relative',
  },
  hueGrabberContainer: {
    position: 'absolute',
    left: '0%',
  },
  hueGrabber: {
    width: '8px',
    marginTop: '-3px',
    borderRadius: '3px',
    height: '16px',
    boxShadow: 'rgba(0, 0, 0, 0.6) 0px 0px 2px',
    background: 'rgb(255, 255, 255)',
    transform: 'translateX(-2px)',
  },
  inputContainer: {
    marginTop: '8px',
  },
});

interface ColorPickerProps {
  value: string;
  onChange(value: string): void;
  width?: string;
}

function HuePointer() {
  return (
    <div className={css(styles.hueGrabberContainer)}>
      <div className={css(styles.hueGrabber)} />
    </div>
  );
}

function CustomColorPicker(props: CustomPickerProps<any>) {
  return (
    <>
      <div className={css(styles.saturationSliderContainer)}>
        <Saturation {...props} />
      </div>
      <div className={css(styles.hueSliderContainer)}>
        <Hue {...props} pointer={HuePointer} />
      </div>
    </>
  );
}

const CustomColorPickerWithHOC = CustomPicker(CustomColorPicker);

export default function ColorPicker({ value, onChange, width = '100%' }: ColorPickerProps) {
  const [internalColor, setInternalColor] = useState(value);

  useEffect(() => {
    setInternalColor(value);
  }, [value]);

  return (
    <div style={{ display: 'inline-block', width }}>
      <div className={css(styles.container)}>
        <CustomColorPickerWithHOC
          color={internalColor.replace(/#/g, '')}
          onChange={(val) => {
            setInternalColor(val.hex.replace(/#/g, ''));
          }}
          onChangeComplete={(val) => {
            onChange(val.hex.replace(/#/g, ''));
          }}
        />
        <div className={css(styles.inputContainer)}>
          <TextInput
            value={internalColor}
            onChange={(val) => {
              onChange(val);
            }}
            maxLength={6}
            prefix="#"
          />
        </div>
      </div>
    </div>
  );
}

export { ColorPickerProps };
