import { Typography, styled } from '@mui/material';

export const ModalTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(8.5),
  fontWeight: 500,
  textAlign: 'center',
}));
