import Box, { BoxProps } from '@mui/material/Box';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import { ReactNode, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Settings } from '@/context/settingsContext';
import { VerticalNavItemsType } from '@/layouts/types';
import { hexToRGBA } from '@/utils/hex-to-rgba';
import Drawer from './Drawer';
import VerticalNavHeader from './VerticalNavHeader';
import VerticalNavItems from './VerticalNavItems';

interface Props {
  hidden: boolean;
  navWidth: number;
  settings: Settings;
  children: ReactNode;
  navVisible: boolean;
  toggleNavVisibility: () => void;
  setNavVisible: (value: boolean) => void;
  verticalNavItems?: VerticalNavItemsType;
  saveSettings: (values: Settings) => void;
  verticalNavMenuContent?: (props?: any) => ReactNode;
  afterVerticalNavMenuContent?: (props?: any) => ReactNode;
  beforeVerticalNavMenuContent?: (props?: any) => ReactNode;
}

const StyledBoxForShadow = styled(Box)<BoxProps>({
  top: 50,
  left: -8,
  zIndex: 2,
  height: 75,
  display: 'none',
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  '&.d-block': {
    display: 'block',
  },
});

const Navigation = (props: Props) => {
  const { hidden, afterVerticalNavMenuContent, beforeVerticalNavMenuContent } =
    props;
  const [groupActive, setGroupActive] = useState<string[]>([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([]);
  const theme = useTheme();
  const ScrollWrapper = hidden ? Box : PerfectScrollbar;

  return (
    <Drawer {...props}>
      <VerticalNavHeader {...props} />
      <StyledBoxForShadow
        // ref={shadowRef}
        sx={{
          background: `linear-gradient(${
            theme.palette.background.default
          } 40%,${hexToRGBA(
            theme.palette.background.default,
            0.1
          )} 95%,${hexToRGBA(theme.palette.background.default, 0.05)})`,
        }}
      />
      <Box sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* @ts-ignore */}
        <ScrollWrapper
          // containerRef={(ref: any) => handleInfiniteScroll(ref)}
          {...(hidden
            ? {
                // onScroll: (container: any) => scrollMenu(container),
                sx: { height: '100%', overflowY: 'auto', overflowX: 'hidden' },
              }
            : {
                options: { wheelPropagation: false },
                // onScrollY: (container: any) => scrollMenu(container),
              })}
        >
          {beforeVerticalNavMenuContent
            ? beforeVerticalNavMenuContent(props)
            : null}
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <List
              className="nav-items"
              sx={{ transition: 'padding .25s ease', pr: 2.25, pl: 2.25 }}
            >
              <VerticalNavItems
                groupActive={groupActive}
                setGroupActive={setGroupActive}
                currentActiveGroup={currentActiveGroup ?? null}
                setCurrentActiveGroup={setCurrentActiveGroup}
                {...props}
              />
            </List>
          </Box>
        </ScrollWrapper>
      </Box>
      {afterVerticalNavMenuContent ? afterVerticalNavMenuContent(props) : null}
    </Drawer>
  );
};

export default Navigation;
