import { Theme } from '@mui/material/styles';

const Radio = (theme: Theme) => ({
  MuiRadio: {
    styleOverrides: {
      root: {
        color: theme.palette.customColors.tableText,
      },
    },
  },
});
export default Radio;
