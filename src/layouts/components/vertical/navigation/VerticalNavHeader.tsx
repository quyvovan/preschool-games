import { Settings } from '@/context/settingsContext';
import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { ReactNode } from 'react';

// import logo from '../../../../../public/images/logo/logo.svg';

interface Props {
  /* eslint-disable */
  hidden: boolean;
  settings: Settings;
  toggleNavVisibility: () => void;
  saveSettings: (values: Settings) => void;
  verticalNavMenuBranding?: (props?: any) => ReactNode;
}

const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  backgroundColor: theme.palette.common.white,
}));

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out',
}));

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  cursor: 'pointer',
});

const VerticalNavHeader = (props: Props) => {
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props;

  const theme = useTheme();

  return (
    <MenuHeaderWrapper className="nav-header" sx={{ px: 0, py: 8 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href="/">
          <StyledLink>
            {/* <img src={`${logo.src}`} alt="logo" /> */}
            logo
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;
