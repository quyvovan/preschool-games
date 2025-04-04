import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BoxContentStyled = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.palette.customColors.boxShadow,
  padding: theme.spacing(8),
}));

export const BoxUploadZoneStyled = styled(Box)(({ theme }) => ({
  minHeight: theme.spacing(43),
  border: `${theme.spacing(0.25)} dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(0.7),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  marginTop: theme.spacing(6),
}));
