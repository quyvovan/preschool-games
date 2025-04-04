import { TextFieldProps } from '@mui/material';
import { DatePickerInputValueType, MuiDatePickerProps } from '@/types';

export interface IMyDateTimePickerProps {
  value: DatePickerInputValueType;
  onChange: (value: DatePickerInputValueType) => void;
  minuteStep?: number;
  datePickerProps?: Omit<
    MuiDatePickerProps,
    | 'value'
    | 'onChange'
    | 'renderInput'
    | 'onClose'
    | 'open'
    | 'value'
    | 'closeOnSelect'
  >;
  textFieldProps?: TextFieldProps;
}
