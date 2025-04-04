import { Theme } from '@mui/material/styles';
import { hexToRGBA } from '@/utils';

const LinearProgress = (theme: Theme) => ({
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: hexToRGBA(theme.palette.text.secondary, 0.4),
      },
    },
  },
});
export default LinearProgress;
