import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  value: Date;
  onChange(value: Date): void;
  maxDate?: Date;
  minDate?: Date;
}

export default function DatePickerComponent({ value, onChange, maxDate = new Date(), minDate }: DatePickerProps) {
  return (
    <DatePicker selected={value} onChange={(val: Date) => onChange(val)} inline minDate={minDate} maxDate={maxDate} />
  );
}

export { DatePickerProps };
