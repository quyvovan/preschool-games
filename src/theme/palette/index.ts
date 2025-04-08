// ** Type Imports
import { PaletteMode } from '@mui/material';
import { ThemeColor } from '@/layouts/types';
import { hexToRGBA } from '@/utils';

const DefaultPalette = (mode: PaletteMode, themeColor: ThemeColor) => {
  // ** Vars
  const lightColor = '58, 53, 65';
  const darkColor = '231, 227, 252';
  const mainColor = mode === 'light' ? lightColor : darkColor;

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return '#C6A7FE';
    }
    if (themeColor === 'secondary') {
      return '#9C9FA4';
    }
    if (themeColor === 'success') {
      return '#93DD5C';
    }
    if (themeColor === 'error') {
      return '#F46A6A';
    }
    if (themeColor === 'warning') {
      return '#FFCF5C';
    }
    if (themeColor === 'cyan') {
      return '#2196F3';
    }
    return '#6ACDFF';
  };

  return {
    customColors: {
      main: mainColor,
      primaryGradient: primaryGradient(),
      tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#3D3759',
      tableBannerBg: '#F5F4F8',
      colorCyan: '#2196F3',
      summaryBg: 'rgba(243, 242, 247, 0.8)',
      tableText: '#908BA5',
      summaryTitleColor: '#908BA5',
      tableBorder: '#EBE9F1',
      orderStatus: {
        draft: '#B9B9C3',
        shipped: '#F59535',
        completed: '#2196F3',
        canceled: '#F46A6A',
        delivered: '#40B65F',
        orderUpdated: '#6E6B7B',
        confirmed: '#6E6B7B',
        outForDelivery: '#29B9C2',
        unconfirmed: '#B9B9C3',
      },
      orderStatusChip: {
        draft: '#858585',
        shipped: '#E58435',
        completed: '#2196F3',
        canceled: '#F46A6A',
        delivered: '#40B65F',
        orderUpdated: '#333333',
        confirmed: '#333333',
        outForDelivery: '#29B9C2',
        unconfirmed: '#858585',
      },
      vendorStatus: {
        local: '#908BA5',
        linked: '#40B65F',
      },
      magnolia: '#F3F2F7',
      ceruleanBlue: '#3C52B2',
      readNotiBg: '#E4E4E4',
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.06)',
      tableBorderColor: '1px solid rgba(0, 0, 0, 0.12)',
      greyBgColor: '#F3F3F7',
      selectedItemBg: 'rgba(64, 182, 95, 0.08)',
    },
    common: {
      black: '#000',
      white: '#FFF',
    },
    mode,
    primary: {
      light: '#40B65F',
      main: '#40B65F',
      dark: '#40B65F',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#9C9FA4',
      main: '#8A8D93',
      dark: '#777B82',
      contrastText: '#FFF',
    },
    success: {
      light: '#40B65F',
      main: '#40B65F',
      dark: '#40B65F',
      contrastText: '#FFF',
    },
    error: {
      light: '#F46A6A',
      main: '#F46A6A',
      dark: '#F46A6A',
      contrastText: '#FFF',
    },
    warning: {
      light: '#FFCA64',
      main: '#FFB400',
      dark: '#E09E00',
      contrastText: '#FFF',
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
      contrastText: '#FFF',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#F4F4F4',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#303030',
    },
    orange: {
      secondary: '#E58435',
    },
    black: {
      primary: '#373435',
    },
    text: {
      primary: `#fff`,
      secondary: `#B9B9C3`,
      disabled: `rgba(${mainColor}, 0.22)`,
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? '#343839' : '#312D4B',
      default: mode === 'light' ? '#343839' : '#28243D', 
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.3)`,
      disabledBackground: `rgba(${mainColor}, 0.18)`,
      focus: `rgba(${mainColor}, 0.12)`,
    },
    table: {
      border: `1px solid ${hexToRGBA('#000000', 0.12)}`,
    },
  };
};

export default DefaultPalette;
