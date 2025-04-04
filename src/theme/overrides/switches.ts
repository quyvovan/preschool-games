// ** MUI Imports
import { Theme } from '@mui/material/styles';

const Switch = (theme: Theme) => ({
  MuiSwitch: {
    styleOverrides: {
      '&.Mui-track': {
        backgroundColor: theme.palette.primary.main,
      },
      switchBase: {
        '&.Mui-checked': {
          color: theme.palette.common.white,
          '&.Mui-disabled': {
            color: theme.palette.common.white,
          },
        },
      },
      '&.Mui-checked': {
        color: theme.palette.common.white,
      },
      track: {
        backgroundColor: theme.palette.text.secondary,
        opacity: 1,
        '.Mui-checked.Mui-checked + &': {
          opacity: 1,
        },
        '.Mui-disabled.Mui-checked + &': {
          opacity: 0.4,
        },
      },
    },
  },
});

export default Switch;
