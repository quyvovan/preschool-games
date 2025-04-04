import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import FooterLayoutWrapper from './components/auth/Footer';
import { UnAuthLayoutProps } from './types';

// Styled component
const UnAuthLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',

  '& .content-center': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(8),
  },

  '.layout-footer': {
    '.MuiGrid-item': {
      p: {
        margin: 0,
      },
    },
  },
  '.footer-divider-vertical': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    '.MuiDivider-vertical': {
      margin: 'auto 0',
      flexShrink: 0,
      borderWidth: '0px thin 0px 0px',
      borderStyle: 'solid',
      borderColor: 'rgba(0, 0, 0, 0.12)',
      height: theme.spacing(6),
      alignSelf: 'stretch',
    },
    a: {
      padding: theme.spacing(0, 2),
      color: theme.palette.customColors.colorCyan,
    },
  },
  '.field-locales': {
    maxWidth: theme.spacing(25),
  },
  '.auth-content': {
    overflowX: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    display: 'flex',
    paddingBottom: theme.spacing(19),
    minHeight: `100vh`,
    [`@media screen and (min-width: 1200px) and (min-height: 840px)`]: {
      minHeight: `100vh`,
    },
  },
}));

const BackgroundRandomStyled = styled(Box)<BoxProps>(() => ({
  display: 'block',
  height: '100%',
  minHeight: '100vh',
  overflow: 'hidden',
  position: 'fixed',
  width: '100%',
  // background: `url(${backgroundODA.src}) no-repeat center`,
  backgroundSize: 'cover',
}));

const UnAuthLayout = ({ children }: UnAuthLayoutProps) => (
  <UnAuthLayoutWrapper className="un-auth-layout-wrapper">
    <BackgroundRandomStyled />
    <Box className="auth-content">{children}</Box>
    <FooterLayoutWrapper />
  </UnAuthLayoutWrapper>
);

export default UnAuthLayout;
