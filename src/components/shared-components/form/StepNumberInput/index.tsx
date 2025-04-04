import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import {
  Box,
  BoxProps,
  IconButton,
  TextField,
  TextFieldProps,
  useTheme,
} from '@mui/material';
import deepmerge from 'deepmerge';
import {
  DEFAULT_NUMBER_DECIMAL_SCALE_MAX,
  NUMBER_DECIMAL_SCALE_MAX,
} from '@/constants';
import NumericFormatCustomInput, {
  INumericFormatCustomInputProps,
} from '../NumericFormatCustomInput';

export interface IStepNumberInputProps {
  value: number;
  valueStep?: number;
  onChange?: (value: number) => void;
  allowDecimal?: boolean;
  minValue?: number;
  maxValue?: number;
  error?: boolean;
  highlight?: boolean;
  helperMessage?: string;
  disabled?: boolean;
  sx?: BoxProps['sx'];
}

const DEFAULT_MAX_VALUE = 9999;

export const StepNumberInput = (props: IStepNumberInputProps) => {
  const {
    value,
    onChange,
    allowDecimal = false,
    valueStep = 1,
    minValue = 0,
    maxValue = DEFAULT_MAX_VALUE,
    error = false,
    highlight = false,
    helperMessage = '',
    disabled = false,
    sx = {},
  } = props;
  const theme = useTheme();

  const isDisableMinusBtn = value <= minValue;
  const isDisablePlusBtn = value >= maxValue;

  const valueStandardization = (newValue: number) => {
    if (newValue < minValue) return minValue;
    if (newValue > maxValue) return maxValue;
    return newValue;
  };

  const handleClickMinus = () => {
    let newValue = value - valueStep;
    if (newValue < minValue) {
      newValue = minValue;
    }

    onChange?.(valueStandardization(newValue));
  };

  const handleClickPlus = () => {
    let newValue = value + valueStep;
    if (newValue > maxValue) {
      newValue = maxValue;
    }

    onChange?.(valueStandardization(newValue));
  };

  const handleOnInputChange: TextFieldProps['onChange'] = (e) => {
    onChange?.(Number(e.target.value));
  };

  const hightLightColor = theme.palette.primary.main;

  const sxMerged = deepmerge.all<BoxProps['sx']>([
    {
      textAlign: 'left',
      '.step-number-input__inner': {
        display: 'inline-flex',
        alignItems: 'center',
        columnGap: 1,
        height: theme.spacing(10),
      },
      '.step-number-input__input-col': {
        width: theme.spacing(25),
      },
      '.MuiInputBase-input': {
        textAlign: 'center',
        fontWeight: 600,
        color: (() => {
          if (error) {
            return;
          }

          if (value <= 0) {
            return undefined;
          }

          return highlight && !disabled ? hightLightColor : undefined;
        })(),
      },
      '.MuiOutlinedInput-root': {
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: (() => {
            if (error) {
              return;
            }

            return highlight && !disabled ? hightLightColor : undefined;
          })(),
        },
      },
    },
    sx,
  ]);

  return (
    <Box className="step-number-input" sx={sxMerged}>
      <Box className="step-number-input__inner">
        <Box className="step-number-input__minus-col">
          <IconButton
            disabled={isDisableMinusBtn || disabled}
            onClick={handleClickMinus}
          >
            <RemoveCircleOutlineOutlinedIcon />
          </IconButton>
        </Box>

        <Box className="step-number-input__input-col">
          <TextField
            className="number-text-field"
            value={value}
            disabled={disabled}
            onChange={handleOnInputChange}
            fullWidth
            size="small"
            error={error}
            inputProps={
              {
                allowNegative: true,
                isAllowed: (values) => {
                  const newValue = Number(values.value);
                  return newValue >= minValue && newValue <= maxValue;
                },
                decimalScale: allowDecimal ? NUMBER_DECIMAL_SCALE_MAX : 0,
              } as INumericFormatCustomInputProps as any
            }
            InputProps={{
              inputComponent: NumericFormatCustomInput as any,
            }}
          />
        </Box>

        <Box className="step-number-input__plus-col">
          <IconButton
            disabled={isDisablePlusBtn || disabled}
            onClick={handleClickPlus}
          >
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      {helperMessage && (
        <Box
          className="step-number-input__helper-message"
          sx={{
            mt: 1,
            fontSize: theme.spacing(3),
            color: error ? theme.palette.error.main : undefined,
          }}
        >
          {helperMessage}
        </Box>
      )}
    </Box>
  );
};
