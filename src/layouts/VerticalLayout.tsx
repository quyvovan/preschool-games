// import DatePickerWrapper from '@/styles/libs/react-datepicker';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Footer from '@/components/shared-components/footer';
import themeConfig from '@/configs/themeConfig';
import { LayoutProps } from '@/layouts/types';
import AppBar from './components/vertical/appBar';
import Navigation from './components/vertical/navigation';

const VerticalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex',
});

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
});

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  // padding: theme.spacing(8, 6, 6),
  transition: 'padding .25s ease-in-out',
  // [theme.breakpoints.down('sm')]: {
  //   paddingLeft: theme.spacing(4),
  //   paddingRight: theme.spacing(4),
  // },
}));

const VerticalLayout = (props: LayoutProps) => {
  const { settings, children } = props;
  const { contentWidth } = settings;
  const navWidth = themeConfig.navigationSize;
  const [navVisible, setNavVisible] = useState<boolean>(false);
  const toggleNavVisibility = () => setNavVisible(!navVisible);

  return (
    <VerticalLayoutWrapper className="layout-wrapper">
      {/* Navigation Menu */}
      <Navigation
        {...props}
        navWidth={navWidth}
        navVisible={navVisible}
        setNavVisible={setNavVisible}
        toggleNavVisibility={toggleNavVisibility}
      />

      <MainContentWrapper className="layout-content-wrapper">
        {/* AppBar Component */}
        <AppBar toggleNavVisibility={toggleNavVisibility} {...props} />

        {/* Content */}
        <ContentWrapper
          className="layout-page-content"
          sx={{
            ...(contentWidth === 'boxed' && {
              mx: 'auto',
              '@media (min-width:1440px)': { maxWidth: 1440 },
              '@media (min-width:1200px)': { maxWidth: '100%' },
            }),
            '>.MuiCollapse-root': {
              '&:first-of-type': {
                '& .MuiAlert-root': {
                  mb: 4,
                },
              },
            },
          }}
        >
          {children}
        </ContentWrapper>
        <Box id="react-datepicker-portal" />
      </MainContentWrapper>
    </VerticalLayoutWrapper>
  );
};

export default VerticalLayout;
