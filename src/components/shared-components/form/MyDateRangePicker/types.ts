import { TextFieldProps } from '@mui/material';
import {
  DateRangePickerInputValueType,
  MuiDateRangePickerProps,
} from '@/types';

export interface IMyDateRangePickerProps {
  value: DateRangePickerInputValueType;
  setValue: (
    value: DateRangePickerInputValueType
  ) => void | DateRangePickerInputValueType;
  showShortcutPanel?: boolean;
  /** 
    If you provide data for this field, when the user press "reset" button,
    the value of the date picker will return to value of this field
  */
  initialValue?: DateRangePickerInputValueType;
  renderInput?: MuiDateRangePickerProps['renderInput'];
  textFieldProps?: TextFieldProps;
  dateRangePickerProps?: Pick<
    MuiDateRangePickerProps,
    'PaperProps' | 'inputFormat' | 'maxDate' | 'minDate'
  >;
  isCustomDateRangeShortcut?: boolean;
  focusMinMaxDateRange?: boolean;
}
