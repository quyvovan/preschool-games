import { ChildCareRounded } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {
  Box,
  BoxProps,
  Chip,
  Collapse,
  CollapseProps,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { ElementType, ReactNode, useState } from 'react';
import NextLink from '@/components/shared-components/NextLink';
import themeConfig from '@/configs/themeConfig';
// import { getBuyUrl } from '@/utils';
import UserIcon from '../../UserIcon';

const MAX_QUANTITY_TO_SHOW = 99;

const VerticalNavMultiLevel = ({
  item,
  navVisible,
  toggleNavVisibility,
}: any) => {
  const router = useRouter();
  const theme = useTheme();

  const MenuNavLink = styled(ListItemButton, {
    shouldForwardProp: (prop: string) => !['activeColor'].includes(prop),
  })<
    ListItemButtonProps & {
      component?: ElementType;
      target?: '_blank' | undefined;
      activeColor: string;
    }
  >(({ activeColor }) => ({
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

  const CollapseStyled = styled(Collapse)<CollapseProps>({
    '& .MuiButtonBase-root': {
      padding: theme.spacing(3.5, 4),
      borderRadius: theme.spacing(1.5),
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.palette.grey[300],
      },
    },
  });

  const IconTag: ReactNode = item.icon;

  const isParentNavLinkActive = (path: string) => {
    return path !== '/' && path && router.pathname.includes(path);
  };

  const itemPathActive = (() => {
    let lastPathIncludedLength = 0;
    let lastPathActive: null | string = null;
    item.subMenu?.forEach((subItem: any) => {
      if (
        router.asPath.includes(subItem.path) &&
        subItem.path.length > lastPathIncludedLength
      ) {
        lastPathIncludedLength = subItem.path.length;
        lastPathActive = subItem.path;
      }
    });

    return lastPathActive;
  })();

  const getActiveNavLinkColor = (() => {
    let color = theme.palette.primary.main;
    // if (router.pathname.includes(getBuyUrl())) {
    //   color = theme.palette.error.main;
    // }
    return color;
  })();

  const [open, setOpen] = useState(false);

  return (
    <ListItem
      disablePadding
      className="nav-link"
      disabled={item.disabled || false}
      sx={{
        mt: 1.5,
        px: '0 !important',
        borderRadius: theme.spacing(1.5),
        display: 'block',
        backgroundColor: isParentNavLinkActive(item.path)
          ? '#F3F2F7'
          : undefined,
      }}
    >
      <MenuNavLink
        component="a"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        activeColor={getActiveNavLinkColor}
        sx={{
          py: 3.5,
          px: 4,
          borderRadius: theme.spacing(1.5),
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
            position: 'relative',
          }}
        >
          {item.showDotIcon && (
            <Box
              sx={{
                background: theme.palette.orange.secondary,
                width: theme.spacing(2.5),
                height: theme.spacing(2.5),
                borderRadius: '50%',
                position: 'absolute',
                left: '50%',
                top: theme.spacing(-0.5),
                ml: 1,
              }}
            />
          )}
          <UserIcon icon={IconTag} />
        </ListItemIcon>

        <MenuItemTextMetaWrapper>
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            {item.title}
          </Typography>

          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </MenuItemTextMetaWrapper>
      </MenuNavLink>

      <CollapseStyled in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.subMenu.map((child: any) => {
            return (
              <NextLink
                key={child?.title}
                href={item.path === undefined ? '/' : `${child.path}`}
              >
                <MenuNavLink
                  component="a"
                  className={itemPathActive === child.path ? 'active' : ''}
                  {...(child.openInNewTab ? { target: '_blank' } : null)}
                  onClick={(e) => {
                    if (child.path === undefined) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                    if (navVisible) {
                      toggleNavVisibility();
                    }
                  }}
                  activeColor={getActiveNavLinkColor}
                  sx={{
                    ...((ChildCareRounded as any)?.disabled
                      ? { pointerEvents: 'none' }
                      : { cursor: 'pointer' }),
                  }}
                >
                  {!!child?.icon?.length && (
                    <ListItemIcon
                      sx={{
                        mr: 2.5,
                        color: 'text.primary',
                        transition: 'margin .25s ease-in-out',
                      }}
                    >
                      <UserIcon icon={child.icon} />
                    </ListItemIcon>
                  )}

                  <MenuItemTextMetaWrapper>
                    <Typography pl={8} variant="body1">
                      {child.title}
                    </Typography>

                    {child.quantity !== undefined && child.quantity > 0 && (
                      <Box
                        sx={{
                          ml: 2,
                          color: theme.palette.common.white,
                          background: theme.palette.orange.secondary,
                          fontSize: theme.spacing(3),
                          borderRadius: theme.spacing(10),
                          px: 1.5,
                        }}
                      >
                        {child.quantity > MAX_QUANTITY_TO_SHOW
                          ? `${MAX_QUANTITY_TO_SHOW}+`
                          : child.quantity}
                      </Box>
                    )}

                    {child.badgeContent ? (
                      <Chip
                        label={item.badgeContent}
                        color={item.badgeColor || 'primary'}
                        sx={{
                          height: 20,
                          fontWeight: 500,
                          marginLeft: 1.25,
                          '& .MuiChip-label': {
                            px: 1.5,
                            textTransform: 'capitalize',
                          },
                        }}
                      />
                    ) : null}
                  </MenuItemTextMetaWrapper>
                </MenuNavLink>
              </NextLink>
            );
          })}
        </List>
      </CollapseStyled>
    </ListItem>
  );
};

export default VerticalNavMultiLevel;
