// ** MUI Imports
import { Theme } from '@mui/material/styles';
// ** Theme Config Imports
import themeConfig from '@/configs/themeConfig';

const Button = (theme: Theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 400,
        borderRadius: 5,
        lineHeight: 'initial',
        letterSpacing: '0.3px',
        padding: `${theme.spacing(2, 3)}`,
        minHeight: theme.spacing(10),
        fontSize: theme.spacing(4),
      },
      contained: {
        boxShadow: theme.shadows[3],
        padding: `${theme.spacing(1.875, 5.5)}`,
        '&.Mui-disabled': {
          color: theme.palette.text.secondary,
          backgroundColor: '#EBE9F1',
          '& .MuiTypography-root': {
            color: theme.palette.text.secondary,
          },
        },
      },
      outlined: {
        padding: `${theme.spacing(1.625, 5.25)}`,
        '&.MuiButton-outlinedSecondary': {
          color: theme.palette.text.primary,
          borderColor: theme.palette.text.primary,
          '&.Mui-disabled': {
            color: theme.palette.text.secondary,
            borderColor: theme.palette.text.secondary,
          },
        },
        '&.MuiButton-outlinedSuccess:not(.Mui-disabled)': {
          borderColor: theme.palette.success.main,
        },
      },
      sizeSmall: {
        padding: `${theme.spacing(1, 2.25)}`,
        '&.MuiButton-contained': {
          padding: `${theme.spacing(1, 3.5)}`,
        },
        '&.MuiButton-outlined': {
          padding: `${theme.spacing(0.75, 3.25)}`,
        },
      },
      sizeLarge: {
        padding: `${theme.spacing(2.125, 5.5)}`,
        '&.MuiButton-contained': {
          padding: `${theme.spacing(2.125, 6.5)}`,
        },
        '&.MuiButton-outlined': {
          padding: `${theme.spacing(1.875, 6.25)}`,
        },
      },
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: themeConfig.disableRipple,
    },
  },
});

export default Button;
