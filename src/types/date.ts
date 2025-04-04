import { DatePickerProps, DateRangePickerProps } from '@mui/x-date-pickers-pro';
import { Dayjs } from 'dayjs';

export type DatePickerInputValueType = string | Dayjs | Date | null;

export type DatePickerOutputValueType = Dayjs;

export type DateRangePickerInputValueType = [
  DatePickerInputValueType,
  DatePickerInputValueType
];

/**
  Currently we use dayjs as the core of the date time processing.
  So we have to pass the correct generic type to the MUI components, 
  and this is the type that handles that.
  - TInputDate: the date format that the parsing method of the adapter can understand 
  - TDate:  the date representation of the adapter (dayjs)
*/
export type MuiDateRangePickerProps = DateRangePickerProps<
  DatePickerInputValueType,
  DatePickerOutputValueType
>;

export type MuiDatePickerProps = DatePickerProps<
  DatePickerInputValueType,
  DatePickerOutputValueType
>;
