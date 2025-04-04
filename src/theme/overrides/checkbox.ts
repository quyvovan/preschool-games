import { Theme } from '@mui/material/styles';

const Checkbox = (theme: Theme) => ({
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
      },
    },
  },
});
export default Checkbox;
