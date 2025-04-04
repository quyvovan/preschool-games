import { ThemeOptions } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { Settings } from '@/context/settingsContext';
import breakpoints from './breakpoints';
import palette from './palette';
import shadows from './shadows';
import spacing from './spacing';

const themeOptions = (settings: Settings): ThemeOptions => {
  // ** Vars
  const { mode, themeColor } = settings;

  const themeConfig = {
    palette: palette(mode, themeColor),
    typography: {
      fontSize: 14,
      fontFamily: [
        'Noto Sans',
        'Inter',
        'sans-serif',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    shadows: shadows(mode),
    ...spacing,
    breakpoints: breakpoints(),
    shape: {
      borderRadius: 6,
    },
    mixins: {
      toolbar: {
        minHeight: 64,
      },
    },
  };

  return deepmerge(themeConfig, {
    palette: {
      primary: {
        // @ts-ignore
        ...themeConfig?.palette?.[themeColor],
      },
    },
  });
};

export default themeOptions;
