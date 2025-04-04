// ** React Imports
// ** MUI Imports
// ** Next Imports
import NextLink from '@/components/shared-components/NextLink';
// ** Configs Import
import themeConfig from '@/configs/themeConfig';
// ** Types
import { Settings } from '@/context/settingsContext';
// ** Custom Components Imports
import UserIcon from '@/layouts/components/UserIcon';
import { NavLink } from '@/layouts/types';
// ** Utils
// import { getBuyUrl } from '@/utils';
import { handleURLQueries } from '@/utils/utils';
import Box, { BoxProps } from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { ElementType, ReactNode } from 'react';

interface Props {
  item: NavLink;
  settings: Settings;
  navVisible?: boolean;
  toggleNavVisibility: () => void;
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton, {
  shouldForwardProp: (prop: string) => !['activeColor'].includes(prop),
})<
  ListItemButtonProps & {
    component?: ElementType;
    target?: '_blank' | undefined;
    activeColor: string;
  }
>(({ theme, activeColor }) => ({
  width: '100%',
  color: theme.palette.text.primary,
  padding: theme.spacing(2.25, 3.5),
  transition: 'opacity .25s ease-in-out',

  '& .MuiTypography-root': {
    fontWeight: 500,
  },
  '&.active, &.active:hover': {
    backgroundColor: activeColor,
  },

  '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
    color: `${theme.palette.common.white} !important`,
  },
}));

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' }),
});

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility }: Props) => {
  // ** Hooks
  const router = useRouter();
  const IconTag: ReactNode = item.icon;
  const theme = useTheme();

  const isNavLinkActive = () => {
    return (
      (item.path !== '/' && item.path && router.pathname.includes(item.path)) ||
      handleURLQueries(router, item.path)
    );
  };

  const getActiveNavLinkColor = (() => {
    const color = theme.palette.primary.main;
    // if (router.pathname.includes(getBuyUrl())) {
    //   color = theme.palette.error.main;
    // }
    return color;
  })();

  return (
    <ListItem
      disablePadding
      className="nav-link"
      disabled={item.disabled || false}
      sx={{ mt: 1.5, px: '0 !important' }}
    >
      <NextLink
        sx={{ width: '100%' }}
        href={item.path === undefined ? '/' : `${item.path}`}
      >
        <MenuNavLink
          className={isNavLinkActive() ? 'active' : ''}
          {...(item.openInNewTab ? { target: '_blank' } : null)}
          onClick={(e) => {
            if (item.path === undefined) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (navVisible) {
              toggleNavVisibility();
            }
          }}
          activeColor={getActiveNavLinkColor}
          sx={{
            py: 3.5,
            px: 4,
            borderRadius: 1.75,
            fontWeight: 500,
            ...(item.disabled
              ? { pointerEvents: 'none' }
              : { cursor: 'pointer' }),
          }}
        >
          <ListItemIcon
            sx={{
              mr: 2.5,
              color: 'text.primary',
              transition: 'margin .25s ease-in-out',
            }}
          >
            <UserIcon icon={IconTag} />
          </ListItemIcon>

          <MenuItemTextMetaWrapper>
            <Typography
              variant="body1"
              {...(themeConfig.menuTextTruncate && { noWrap: true })}
            >
              {item.title}
            </Typography>
            {item.badgeContent ? (
              <Chip
                label={item.badgeContent}
                color={item.badgeColor || 'primary'}
                sx={{
                  height: 20,
                  fontWeight: 500,
                  marginLeft: 1.25,
                  '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' },
                }}
              />
            ) : null}
          </MenuItemTextMetaWrapper>
        </MenuNavLink>
      </NextLink>
    </ListItem>
  );
};

export default VerticalNavLink;
