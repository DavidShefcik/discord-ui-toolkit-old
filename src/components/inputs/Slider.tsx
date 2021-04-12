import React, { useState, useEffect, ChangeEvent, DragEventHandler } from 'react';
import { StyleSheet, css } from 'aphrodite';

type SliderInterval = {
  value: number;
  label?: string;
};
type SliderProps = {
  value: number;
  values: SliderInterval[];
  onChange(value: number): void;
  containerWidth?: string;
  defaultValue?: number;
  units?: string;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '40px',
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
    height: '100%',
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
    cursor: 'ew-resize',
    outline: 0,
  },
  mark: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '24px',
    marginLeft: '-12px',
    top: '-8px',
    userFocus: 'none',
  },
  markLabel: {
    fontFamily: 'discord-bold',
    color: 'var(--slider-label-color)',
    paddingLeft: '1px',
    fontWeight: 700,
    fontSize: '10px',
    marginBottom: '4px',
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
  units = '',
}: SliderProps) {
  const [grabbed, setGrabbed] = useState(false);
  const [filledWidth, setFilledWidth] = useState('0%');

  useEffect(() => {
    const nearestValue = findNearestValue(value, values);
    setFilledWidth(`${calcValueWidth(nearestValue)}%`);
    onChange(nearestValue);
  }, [value]);

  if (values.some((val) => val.value < 0 || val.value > 100)) {
    throw new Error('Value cannot be less than 0 or greater than 100.');
  }

  const grabberDrag = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ display: 'inline-block', width: containerWidth }}>
      <div className={css(styles.container)}>
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
        <div className={css(styles.track)}>
          <div className={css(styles.grabber)} onDragStart={grabberDrag} draggable style={{ left: filledWidth }} />
        </div>
      </div>
    </div>
  );
}

export { SliderInterval, SliderProps, calcValueWidth, findNearestValue };
