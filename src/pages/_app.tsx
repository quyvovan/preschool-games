/**
  NOTE: Absolutely do not use auto-sorting import in this file. Any changes can crash the entire app.
*/
// import { SNACK_BAR_DURATION } from '@/utils/constants';
// import { createEmotionCache } from '@/utils/create-emotion-cache';
// import { formatPageHeadTitle } from '@/utils/page-meta';
import type { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTheme } from '@mui/material/styles';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import { SnackbarProvider } from 'notistack';
import NProgress from 'nprogress';
import { I18nextProvider } from 'react-i18next';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider } from 'react-redux';
import { PagesWrapper } from '@/components/app/PagesWrapper';
import themeConfig from '@/configs/themeConfig';
// import { MUI_LICENSE } from '@/constants';
import { SettingsConsumer, SettingsProvider } from '@/context/settingsContext';
import i18n from '@/i18n';
// import '@/libs/dayjs';
import { store } from '@/store';
// import { store } from '@/store';
import ThemeComponent from '@/theme/ThemeComponent';
import { createEmotionCache } from '@/utils/create-emotion-cache';
import './globals.css';

// import { PagesWrapper } from '@/components/app/PagesWrapper';

// LicenseInfo.setLicenseKey(MUI_LICENSE);

type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

const App = ({ Component, ...props }: ExtendedAppProps) => {
  const { emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = useTheme();
  // const pageHeadTitle = formatPageHeadTitle();

  return (
    // <Provider store={store}>
    <Provider store={store}>
      <SnackbarProvider
        iconVariant={{
          success: <CheckCircleOutlineIcon sx={{ mr: theme.spacing(1) }} />,
          error: <CancelOutlinedIcon sx={{ mr: theme.spacing(1) }} />,
        }}
        autoHideDuration={3000}
        preventDuplicate
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        maxSnack={3}
      >
        <I18nextProvider i18n={i18n}>
          <CacheProvider value={emotionCache}>
            <Head>
              <title>Project NextJS</title>
              <meta
                name="description"
                content={`${themeConfig.templateName} là một nền tảng thương mại điện tử về lĩnh vực F&B, nơi hội tụ và liên kết giữa người mua và các doanh nghiệp cung cấp thực phẩm hàng đầu Hồ Chí Minh.`}
              />
              <meta
                name="keywords"
                content="App mua thực phẩm online, Mua thực phẩm online"
              />
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
              <link rel="shortcut icon" href="/favicon.svg" />
            </Head>
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => (
                  <ThemeComponent settings={settings}>
                    <PagesWrapper
                      Element={<Component {...pageProps} />}
                      Component={Component}
                      pageProps={pageProps}
                    />
                  </ThemeComponent>
                )}
              </SettingsConsumer>
            </SettingsProvider>
          </CacheProvider>
        </I18nextProvider>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
