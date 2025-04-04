import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, InputAdornment, Radio, Stack, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import {
  DateRange,
  DateRangePicker as DateRangePickerMui,
  DateRangePickerProps,
} from '@mui/x-date-pickers-pro/DateRangePicker';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals';
import dayjs, { Dayjs } from 'dayjs';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RangeShortcut,
  RangeShortcutType,
  rangeShortcuts,
} from '@/components/shared-components/date-range-picker/DateRangePicker.const';
import { CustomActionBar } from '@/components/shared-components/date-range-picker/components/CustomActionBar';
import useLocale from '@/hooks/useLocale';
import { useSettings } from '@/hooks/useSettings';
import {
  DATE_FORMAT_DD_MMM_YYYY_SLASH,
  dayOfWeekFormatter,
  formatDate,
} from '@/utils';

const DateRangePickerMuiStyled = styled(DateRangePickerMui)(() => ({
  '& .MuiTypography-root': {
    fontWeight: '600',
  },
}));

const DateRangePickerComponent = ({
  paperContent,
  value: valueProps,
  range: rangeProps,
  open: openProps = false,
  showTerm = true,
  ...props
}: Partial<Omit<DateRangePickerProps<any, any>, 'onChange'>> & {
  paperContent?: JSX.Element;
  range?: RangeShortcutType;
  onClear?: () => void;
  onCancel?: () => void;
  onAccept?: () => void;
  open?: boolean;
  showTerm?: boolean;
  onChange?: (value: DateRange<any>, range: RangeShortcutType) => void;
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { settings } = useSettings();

  const [value, setValue] = React.useState<any>([null, null]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentRange, setCurrentRange] = React.useState<RangeShortcutType>(
    RangeShortcut.allTime as RangeShortcutType
  );
  const locale = useLocale();

  useEffect(() => {
    setOpen(openProps);
  }, [openProps]);

  useEffect(() => {
    if (rangeProps) {
      if (!rangeProps || rangeProps === RangeShortcut.allTime) {
        setValue([null, null]);
      } else {
        setValue([
          valueProps?.[0] ?? value?.[0] ?? null,
          valueProps?.[1] ?? value?.[1] ?? null,
        ]);
      }
    }
  }, [valueProps]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (rangeProps) {
        setCurrentRange(rangeProps as RangeShortcutType);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [rangeProps]);

  const buildHandleRangeClick =
    (_setValue: React.Dispatch<React.SetStateAction<DateRange<Dayjs>>>) =>
    (range: RangeShortcutType) => {
      const today = dayjs();
      setCurrentRange(range);
      switch (range) {
        case RangeShortcut.allTime:
          _setValue([null, null]);
          break;
        case RangeShortcut.today:
          _setValue([today.subtract(0, 'day'), today]);
          break;
        case RangeShortcut.thisMonth:
          _setValue([today.startOf('month'), today.endOf('month')]);
          break;
        case RangeShortcut.previousMonth:
          _setValue([
            today.add(-1, 'month').startOf('month'),
            today.add(-1, 'month').endOf('month'),
          ]);
          break;
        default:
          _setValue([null, null]);
          break;
      }
    };

  const staticRangeShortcutsPanel = useCallback(
    ({
      children,
      ...other
    }: {
      setValue?: React.Dispatch<React.SetStateAction<DateRange<Dayjs>>>;
      children: React.ReactNode;
    }) => {
      const handleRangeClick = React.useCallback(
        (range: RangeShortcutType) =>
          setValue && buildHandleRangeClick(setValue)(range),
        [setValue]
      );

      return (
        <>
          <Box
            {...other}
            sx={{
              backgroundColor: theme.palette.customColors.magnolia,
            }}
          >
            {paperContent}
          </Box>
          {showTerm && (
            <Stack direction="row" spacing={2}>
              {rangeShortcuts.map(({ range, label }, inx) => (
                <Stack
                  direction="row"
                  sx={{
                    cursor: 'pointer',
                  }}
                  alignItems="center"
                  key={inx?.toString()}
                  onClick={() => handleRangeClick(range as RangeShortcutType)}
                >
                  <Radio checked={range === currentRange} />
                  <Typography>{label}</Typography>
                </Stack>
              ))}
            </Stack>
          )}
          <Divider />
          {children}
        </>
      );
    },
    [paperContent, currentRange]
  );

  const onDateChange = useCallback((newValue: DateRange<any>) => {
    if (!newValue?.[0] || !newValue[1]) {
      setValue(newValue);
      setCurrentRange(RangeShortcut.other as RangeShortcutType);
      return;
    }
    setValue(newValue);
  }, []);

  const _dayOfWeekFormatter = useCallback(
    (day: string) => dayOfWeekFormatter(day, settings?.language),
    [settings]
  );

  const closeModal = useCallback(() => {
    if (openProps === undefined) {
      setOpen(false);
    }
  }, [openProps]);

  const actionBar = useCallback(
    (actionProps: any) =>
      CustomActionBar({
        ...actionProps,
        onClear: () => {
          props?.onClear?.();
          closeModal();
          setValue([null, null]);
          setCurrentRange(RangeShortcut.allTime as RangeShortcutType);
        },
        onCancel: () => {
          props?.onCancel?.();
          closeModal();
          setCurrentRange(rangeProps as RangeShortcutType);
          actionProps?.onCancel();
        },
        onAccept: () => {
          props?.onAccept?.();
          closeModal();
          props?.onChange?.(value, currentRange);
          actionProps?.onAccept();
        },
      }),
    [value, currentRange]
  );

  const renderInput = useCallback(
    (startProps: MuiTextFieldProps, endProps: MuiTextFieldProps) => {
      const _value =
        startProps?.inputProps?.value || endProps?.inputProps?.value
          ? `${formatDate(
              startProps?.inputProps?.value,
              DATE_FORMAT_DD_MMM_YYYY_SLASH,
              locale
            )} ~ ${
              endProps?.inputProps?.value
                ? formatDate(
                    endProps?.inputProps?.value,
                    DATE_FORMAT_DD_MMM_YYYY_SLASH,
                    locale
                  )
                : ''
            }`
          : '';

      return (
        <TextField
          {...startProps}
          label=""
          inputProps={{
            ...startProps.inputProps,
            value: _value,
            placeholder: t('select_term'),
            onChange: () => undefined,
            style: {
              height: theme.spacing(3.25),
            },
          }}
          error={false}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <ArrowDropDownIcon color="secondary" />
              </InputAdornment>
            ),
          }}
        />
      );
    },
    []
  );

  const close = useCallback(() => {
    closeModal();
    props?.onClose?.();
    setTimeout(() => {
      setCurrentRange(
        rangeProps ?? (RangeShortcut.allTime as RangeShortcutType)
      );
    }, 500);
  }, [rangeProps]);

  return (
    <LocalizationProvider adapterLocale={locale} dateAdapter={AdapterDayjs}>
      <DateRangePickerMuiStyled
        PaperProps={{
          sx: {
            '.MuiTypography-subtitle1': {
              textTransform: 'capitalize',
            },
          },
        }}
        {...props}
        DialogProps={{
          fullWidth: true,
        }}
        onClose={close}
        value={value}
        open={open}
        onChange={onDateChange}
        components={{
          PaperContent: staticRangeShortcutsPanel,
          ActionBar: actionBar,
        }}
        closeOnSelect={false}
        dayOfWeekFormatter={_dayOfWeekFormatter}
        renderInput={props?.renderInput || renderInput}
      />
    </LocalizationProvider>
  );
};

export const DateRangePicker = memo(DateRangePickerComponent);
