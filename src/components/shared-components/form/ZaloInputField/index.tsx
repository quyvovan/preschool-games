import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import {
  Box,
  InputAdornment,
  StandardTextFieldProps,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SettingSupplierEmailForm } from '@/containers/partners/partner-message-setting-detail/types';
import { IContactInformationInSetting } from '@/types/partner-setting';
import {
  formatPhoneNumberToString,
  removeFirstZero,
  removeSpaceAtLast,
  removeSpaceWithZero,
} from '@/utils';
import { VIETNAMESE_MOBILE_COUNTRY_CODE } from '@/utils/constants';
import { formatByTypePhoneNumber, getLengthPhoneNumber } from '@/utils/phone';
import { HtmlTooltipStyled } from '../../LogoStack/styles';
import { TextMaskTypeEnum } from './constants';

interface IZaloInputFieldProps extends StandardTextFieldProps {
  defaultValue: string;
  placeholder?: string;
  partnerIndex: number;
  status: boolean | null;
  shouldRemoveZero?: boolean;
  cbOnChange: (value: string) => void;
  listenError?: (isError: boolean) => void;
}

const ZaloInputField = (props: IZaloInputFieldProps) => {
  const {
    defaultValue,
    partnerIndex,
    status = false,
    placeholder = '123 - 456 - 789',
    cbOnChange,
    shouldRemoveZero = true,
    listenError,
    ...rest
  } = props;

  const theme = useTheme();
  const { t } = useTranslation();
  const formContext = useFormContext<SettingSupplierEmailForm>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [textMaskMode, setTextMaskMode] = useState<TextMaskTypeEnum>(
    TextMaskTypeEnum.NineNumber
  );
  const [error, setError] = useState<string>('');

  const isStartWithZero = phoneNumber.startsWith('0');
  const isTenNumberValid =
    getLengthPhoneNumber(phoneNumber, false) === 10 && isStartWithZero;
  const isNineNumberValid =
    getLengthPhoneNumber(phoneNumber) === 9 && !isStartWithZero;
  const isError = Boolean(error);

  const details = formContext.watch().partners[partnerIndex].detail;
  const phones = details.map((detail: IContactInformationInSetting) =>
    formatPhoneNumberToString(detail.value, true)
  );
  const duplicates = phones.filter(
    (item: string, idx: number) => phones.indexOf(item) !== idx
  );

  useEffect(() => {
    setPhoneNumber(
      formatByTypePhoneNumber(defaultValue, TextMaskTypeEnum.NineNumber)
    );
  }, [defaultValue]);

  useEffect(() => {
    if (getLengthPhoneNumber(defaultValue, false) === 10) {
      setTextMaskMode(TextMaskTypeEnum.TenNumber);
    }
    if (getLengthPhoneNumber(defaultValue) === 9) {
      setTextMaskMode(TextMaskTypeEnum.NineNumber);
    }
  }, []);

  useEffect(() => {
    if (listenError) {
      listenError(isError);
    }
  }, [isError]);

  useEffect(() => {
    if (textMaskMode === TextMaskTypeEnum.TenNumber && !isTenNumberValid) {
      setError('validate:phone_number_must_contain_10_digits');
    }

    if (textMaskMode === TextMaskTypeEnum.NineNumber && !isNineNumberValid) {
      setError('validate:phone_number_must_contain_9_digits');
    }

    if (
      (isTenNumberValid || isNineNumberValid) &&
      duplicates.includes(formatPhoneNumberToString(phoneNumber, true))
    ) {
      setError('phone_is_already_in_use_try_another_phone');
    }

    if (phoneNumber.length === 0) {
      setError('validate:phone_number_is_required');
    }

    if (
      (isTenNumberValid || isNineNumberValid) &&
      !duplicates.includes(formatPhoneNumberToString(phoneNumber, true))
    ) {
      setError('');
    }
  }, [phoneNumber, duplicates]);

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (
      (textMaskMode === TextMaskTypeEnum.TenNumber &&
        getLengthPhoneNumber(newValue, false) > 10) ||
      (textMaskMode === TextMaskTypeEnum.NineNumber &&
        getLengthPhoneNumber(newValue) > 9)
    ) {
      setError('');
      return;
    }

    if (newValue.length === 1) {
      if (newValue === '0') {
        setTextMaskMode(TextMaskTypeEnum.TenNumber);
        setError('validate:phone_number_must_contain_10_digits');
      } else {
        setTextMaskMode(TextMaskTypeEnum.NineNumber);
        setError('validate:phone_number_must_contain_9_digits');
      }
    }

    setPhoneNumber(formatByTypePhoneNumber(newValue, textMaskMode));
    cbOnChange(removeSpaceWithZero(newValue, shouldRemoveZero));
  };

  const handlePhoneNumberBlur = () => {
    const newValue = removeFirstZero(phoneNumber);

    if (isTenNumberValid) {
      setTextMaskMode(TextMaskTypeEnum.NineNumber);
      setPhoneNumber(newValue);
      cbOnChange(removeSpaceWithZero(newValue, shouldRemoveZero));
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.code === 'Backspace' && phoneNumber.length === 1) {
      setTextMaskMode(TextMaskTypeEnum.TenNumber);
    }
    if (
      event.code === 'Backspace' &&
      phoneNumber[phoneNumber.length - 1] === ' '
    ) {
      setPhoneNumber(removeSpaceAtLast(phoneNumber));
    }
  };

  const renderStatusPhone = () => {
    if (status === null) {
      return null;
    }

    if (status) {
      return (
        <InputAdornment
          position="end"
          sx={{
            cursor: 'pointer',
          }}
        >
          <HtmlTooltipStyled
            title={
              <Box>
                <Typography
                  color={theme.palette.customColors.tableText}
                  fontSize={theme.spacing(3.5)}
                  lineHeight={theme.spacing(5)}
                >
                  {t('zalo_account_has_followed_oda_zalo')}
                </Typography>
              </Box>
            }
          >
            <PrivacyTipOutlinedIcon color="success" />
          </HtmlTooltipStyled>
        </InputAdornment>
      );
    }
    return (
      <InputAdornment
        position="end"
        sx={{
          cursor: 'pointer',
        }}
      >
        <HtmlTooltipStyled
          title={
            <Box>
              <Typography
                color={theme.palette.customColors.tableText}
                fontSize={theme.spacing(3.5)}
                lineHeight={theme.spacing(5)}
              >
                {t('zalo_account_has_not_followed_oda_zalo')}
              </Typography>
            </Box>
          }
        >
          <PrivacyTipOutlinedIcon color="error" />
        </HtmlTooltipStyled>
      </InputAdornment>
    );
  };

  return (
    <TextField
      {...rest}
      fullWidth
      value={phoneNumber}
      InputLabelProps={{
        shrink: true,
      }}
      label={t('phone')}
      onChange={handlePhoneNumberChange}
      onBlur={handlePhoneNumberBlur}
      onKeyDown={handleKeyDown}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Typography>+{VIETNAMESE_MOBILE_COUNTRY_CODE}</Typography>
          </InputAdornment>
        ),
        endAdornment: renderStatusPhone(),
      }}
      inputProps={{
        autoComplete: 'off',
        placeholder,
      }}
      sx={{
        marginBottom: 0,
        minWidth: theme.spacing(67.5),
        '.MuiInputBase-root': {
          height: theme.spacing(10),
          '& .MuiInputBase-input': {
            padding: theme.spacing(2, 3, 2, 0),
          },
        },
      }}
      error={isError}
      helperText={t(error)}
      required
    />
  );
};

export default ZaloInputField;
