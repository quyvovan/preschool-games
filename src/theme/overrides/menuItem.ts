import { Theme } from '@mui/material/styles';

const MenuItem = (theme: Theme) => ({
  MuiMenuItem: {
    styleOverrides: {
      root: {
        padding: theme.spacing(3, 4),
      },
    },
  },
});

export default MenuItem;
