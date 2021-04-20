import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';

type SliderInterval = {
  value: number;
  label: string;
};
type SliderProps = {
  value: number;
  onChange(value: number): void;
  containerWidth?: string;
  defaultValue?: number;
  max?: number;
  min?: number;
  stickToMarkers?: boolean;
  values?: SliderInterval[];
  disabled?: boolean;
  units?: string;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '40px',
  },
  disabled: {
    opacity: 0.6,
  },
  track: {
    position: 'absolute',
    top: 0,
    right: '5px',
    bottom: 0,
    left: '5px',
  },
  bar: {
    position: 'relative',
    top: '16px',
    height: '8px',
    borderRadius: '4px',
    display: 'block',
    overflow: 'hidden',
    backgroundColor: 'var(--slider-bar-background)',
  },
  barFill: {
    backgroundColor: 'var(--blurple)',
    height: '40px',
  },
  grabber: {
    position: 'absolute',
    width: '10px',
    height: '24px',
    marginLeft: '-5px',
    top: '50%',
    marginTop: '-13px',
    borderRadius: '3px',
    backgroundColor: '#fff',
    border: '1px solid #dcddde',
    boxShadow: '0 3px 1px 0 rgba(0, 0, 0, .05), 0 2px 2px 0 rgba(0, 0, 0, .1), 0 3px 3px 0 rgba(0, 0, 0, .05)',
    outline: 0,
  },
  grabberNormal: {
    cursor: 'ew-resize',
  },
  grabberDisabled: {
    cursor: 'not-allowed',
  },
  mark: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '24px',
    marginLeft: '-12px',
    top: '-8px',
  },
  markLabel: {
    fontFamily: 'discord-bold',
    color: 'var(--slider-label-color)',
    paddingLeft: '1px',
    fontWeight: 700,
    fontSize: '10px',
    marginBottom: '4px',
    'user-select': 'none',
  },
  defaultMarkLabel: {
    color: 'var(--green)',
  },
  markDash: {
    backgroundColor: 'var(--slider-bar-background)',
    height: '24px',
    width: '2px',
  },
});

const calcValueWidth = (val: number): number => 100 * (val * 0.01);
const findNearestValue = (val: number, values: SliderInterval[]): number => {
  const numValueArr = values.map((v) => v.value);
  const closest = numValueArr.reduce((prev, curr) => (Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev));
  return closest;
};

export default function Slider({
  value,
  values,
  onChange,
  containerWidth = '100%',
  defaultValue,
  max,
  min,
  stickToMarkers = false,
  disabled = false,
  units = '',
}: SliderProps) {
  const [filledWidth, setFilledWidth] = useState('0%');

  const trackRef = useRef<HTMLDivElement>();
  const grabberRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const nearestValue = findNearestValue(value, values);
    setFilledWidth(`${calcValueWidth(nearestValue)}%`);
    onChange(nearestValue);
  }, [value]);

  if (values.some((val) => val.value < 0 || val.value > 100)) {
    throw new Error('Value cannot be less than 0 or greater than 100.');
  }

  return (
    <div style={{ display: 'inline-block', width: containerWidth }}>
      <div className={css([styles.container, disabled && styles.disabled])}>
        <input type="number" readOnly value={value} style={{ display: 'none' }} />
        <div className={css(styles.track)}>
          {values.map((val) => (
            <div key={val.value} className={css(styles.mark)} style={{ left: `${calcValueWidth(val.value)}%` }}>
              <div className={css([styles.markLabel, val.value === defaultValue && styles.defaultMarkLabel])}>
                {val.label}
                {units}
              </div>
              <div className={css(styles.markDash)} />
            </div>
          ))}
        </div>
        <div className={css(styles.bar)}>
          <div className={css(styles.barFill)} style={{ width: filledWidth }} />
        </div>
        <div className={css(styles.track)} ref={trackRef}>
          <div
            className={css([styles.grabber, disabled ? styles.grabberDisabled : styles.grabberNormal])}
            ref={grabberRef}
            style={{ left: filledWidth }}
            role="slider"
            tabIndex={0}
            onKeyPress={() => {}}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            aria-disabled={disabled}
          >
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

export { SliderInterval, SliderProps, calcValueWidth, findNearestValue };
