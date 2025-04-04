import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar';
import { styled, useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';
import { Settings } from '@/context/settingsContext';

interface Props {
  hidden: boolean;
  settings: Settings;
  toggleNavVisibility: () => void;
  verticalAppBarContent?: (props?: any) => ReactNode;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  backgroundColor: theme.palette.common.white,
  color: theme.palette.text.primary,
  boxShadow: '0px 4px 20px rgb(0 0 0 / 12%)',
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out',
}));

const LayoutAppBar = (props: Props) => {
  const {
    hidden: _hidden,
    settings,
    verticalAppBarContent: userVerticalAppBarContent,
    toggleNavVisibility: _toggleNavVisibility,
  } = props;

  const theme = useTheme();

  const { contentWidth } = settings;

  return (
    <AppBar
      elevation={0}
      color="default"
      className="layout-navbar"
      position="static"
    >
      <Toolbar
        className="navbar-content-container"
        sx={{
          ...(contentWidth === 'boxed' && {
            '@media (min-width:1440px)': {
              maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)`,
            },
          }),
        }}
      >
        {(userVerticalAppBarContent && userVerticalAppBarContent(props)) ||
          null}
      </Toolbar>
    </AppBar>
  );
};

export default LayoutAppBar;
