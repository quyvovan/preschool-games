import MuiSwipeableDrawer, {
  SwipeableDrawerProps,
} from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { Settings } from '@/context/settingsContext';

interface Props {
  hidden: boolean;
  navWidth: number;
  settings: Settings;
  navVisible: boolean;
  children: ReactNode;
  setNavVisible: (value: boolean) => void;
  saveSettings: (values: Settings) => void;
}

const SwipeableDrawerStyled = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',
  boxShadow: '4px 0px 15px rgb(0 0 0 / 5%)',
  zIndex: 1,
  '& ul': {
    listStyle: 'none',
  },
  '& .MuiListItem-gutters': {
    paddingLeft: 4,
    paddingRight: 4,
  },
  '& .MuiDrawer-paper': {
    left: 'unset',
    right: 'unset',
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out',
    borderRight: 0,
  },
});

const Drawer = (props: Props) => {
  const { hidden, children, navWidth, navVisible, setNavVisible } = props;

  // Drawer Props for Mobile & Tablet screens
  const MobileDrawerProps = {
    open: navVisible,
    onOpen: () => setNavVisible(true),
    onClose: () => setNavVisible(false),
    ModalProps: {
      keepMounted: true, // Better open performance on mobile.
    },
  };

  // Drawer Props for Desktop screens
  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null,
  };

  return (
    <>
      <SwipeableDrawerStyled
        variant={hidden ? 'temporary' : 'permanent'}
        {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
        PaperProps={{ sx: { width: navWidth } }}
        sx={{
          width: navWidth,
        }}
      >
        {children}
      </SwipeableDrawerStyled>
    </>
  );
};

export default Drawer;
