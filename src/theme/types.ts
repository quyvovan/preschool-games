declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      main: string;
      tableHeaderBg: string;
      primaryGradient: string;
      summaryBg: string;
      summaryTitleColor: string;
      colorCyan: string;
      tableBorder: string;
      tableText: string;
      boxShadow: string;
      tableBannerBg: string;
      magnolia: string;
      ceruleanBlue: string;
      greyBgColor?: string;
      selectedItemBg: string;
    };
    table: {
      border: string;
    };
    orange: {
      secondary: string;
    };
    black: {
      primary: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      main?: string;
      tableHeaderBg?: string;
      primaryGradient?: string;
      colorCyan?: string;
      tableBorder?: string;
    };
  }
}

export {};
