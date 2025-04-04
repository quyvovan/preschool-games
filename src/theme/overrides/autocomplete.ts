// ** MUI Imports
import { Theme } from '@mui/material/styles';
import { translate } from '@/i18n/translate';
import { hexToRGBA } from '@/utils';

const Autocomplete = (theme: Theme) => ({
  MuiAutocomplete: {
    defaultProps: {
      noOptionsText: translate('no_result_found'),
    },
    styleOverrides: {
      root: {
        '& .MuiInputBase-formControl': {
          gap: theme.spacing(0.75),

          '.MuiAutocomplete-tagSizeMedium:not(.MuiChip-root)': {
            margin: theme.spacing(0, 0.75),
            lineHeight: theme.spacing(4),
          },

          '&.MuiInputBase-sizeSmall': {
            '& .MuiChip-root': {
              height: theme.spacing(6),
              background: hexToRGBA(theme.palette.common.black, 0.08),
            },
            '& .MuiChip-label': {
              fontSize: theme.spacing(3),
            },
          },
        },
      },
      listbox: {
        '.MuiAutocomplete-option:not(:has(.MuiCheckbox-root))': {
          padding: theme.spacing(3, 4),
        },
      },
    },
  },
});

export default Autocomplete;
