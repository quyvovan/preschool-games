// ** MUI Imports
import { Theme } from '@mui/material/styles';
// ** Util Import
import { hexToRGBA } from '@/utils/hex-to-rgba';

const Tooltip = (theme: Theme) => ({
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: hexToRGBA(theme.palette.grey[700], 0.9),
        fontSize: theme.spacing(3),
        lineHeight: theme.spacing(4),
      },
      arrow: {
        color: hexToRGBA(theme.palette.grey[700], 0.9),
      },
    },
  },
});

export default Tooltip;
