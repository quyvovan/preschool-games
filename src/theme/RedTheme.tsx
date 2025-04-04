import { ThemeProvider, createTheme, useTheme } from '@mui/material';
import { ReactNode } from 'react';

const RedTheme = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  const errorTheme = createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      primary: {
        main: theme.palette.error.main,
        light: theme.palette.error.main,
        dark: theme.palette.error.main,
        contrastText: theme.palette.common.white,
      },
    },
  });

  return <ThemeProvider theme={errorTheme}>{children}</ThemeProvider>;
};
export default RedTheme;
