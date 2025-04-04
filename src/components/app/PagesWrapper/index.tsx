import { SplashScreen } from '../SplashScreen';
import ApiError from '@/components/common/modals/api-error';
import { useAuth } from '@/hooks/useAuth';
// import { usePermission } from '@/hooks/usePermission';
// import { useRoute } from '@/hooks/useRoute';
// import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import UserLayout from '@/layouts/UserLayout';
import { ModalProvider } from '@/libs/my-mui-modal-provider';
import { AppDispatch } from '@/store/app-dispatch';
// import { insertRouterHistory } from '@/store/slices/app';
// import { companySelectors } from '@/store/slices/company';
import { IBranch } from '@/types/branch';
import { getAccessToken } from '@/utils/cookies';
import { LOCAL_STORAGE_KEY, localStorageUtil } from '@/utils/localStorage';
import { generateLoginUrl, getRegisterUrl } from '@/utils/routing';
// import { logUtil } from '@/utils/log';
// import {
//   generateChooseBranchUrl,
//   generateForgotPasswordUrl,
//   generateHomeUrl,
//   generateLoginUrl,
//   generateWebLinkUrl,
//   getAboutUsUrl,
//   getBookDemoUrl,
//   getForbiddenUrl,
//   getOperationRegulationsUrl,
//   getPrivacyPolicyUrl,
//   getRegisterUrl,
//   getTermOfServiceUrl,
// } from '@/utils/routing';
import { AnimatePresence, motion } from 'framer-motion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useState } from 'react';

interface IAuthPagesAppProps {
  Component: NextPage;
  Element: ReactElement;
  pageProps: any;
}

enum LinkTypeEnum {
  LandingPage = 1,
  Weblink = 2,
  UnAuth = 3,
  Auth = 4,
}

const loginUrl = generateLoginUrl();
const ROUTER_LIST = {
  LANDING: ['/home', '/about'],
  UNAUTH: [loginUrl, getRegisterUrl()],
};

const DELAY_TIME_TO_STOP_SETUP_LOADING = 300;

enum MotionAnimationKeyEnum {
  Splash = 'splash',
  Normal = 'normal',
}

export const PagesWrapper = (props: IAuthPagesAppProps) => {
  const { Component, Element, pageProps } = props;
  const router = useRouter();
  // const route = useRoute();
  // const currentAsPath = router.asPath;
  // const dispatch = useAppDispatch();
  // const { navigationFullItems, navigationItems } = useNavigationItems();
  // const { checkRouterPermission } = usePermission();
  const { getAccountInfo } = useAuth();
  // const menuDisplaySetting = useAppSelector(
  //   companySelectors.getMenuDisplaySetting
  // );
  // const isStaffPermissionDenied = useAppSelector(
  //   (state) => state.app.isStaffPermissionDenied
  // );

  const currentLinkType = useMemo(() => {
    if (ROUTER_LIST.LANDING.some((item) => item === router.pathname)) {
      return LinkTypeEnum.LandingPage;
    }
    if (ROUTER_LIST.UNAUTH.some((item) => item === router.pathname)) {
      return LinkTypeEnum.UnAuth;
    }

    return LinkTypeEnum.Auth;
  }, [router.pathname]);

  const [isSplashScreenLoading, setIsSplashScreenLoading] = useState(true);

  // Setup hide splash screen
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const hideSplashScreen = () => {
      setTimeout(() => {
        setIsSplashScreenLoading(false);
      }, DELAY_TIME_TO_STOP_SETUP_LOADING);
    };

    /*
      Nhóm router không cần hiển thị splash screen
    */
    // (async () => {
    //   if (currentLinkType !== LinkTypeEnum.LandingPage) return;

    //   try {
    //     await getAccountInfo();
    //   } catch (error) {
    //     console.log(error);
    //     // logUtil.error(() => error);
    //   }
    // })();

    /*
      Nhóm router cần hiển thị splash screen, lấy thông tin account, tuy nhiên kể cả khi fail vẫn không xử lý gì hết 
    */
    // (async () => {
    //   if (currentLinkType !== LinkTypeEnum.Weblink) return;

    //   try {
    //     await getAccountInfo();
    //   } catch (error) {
    //     console.log(error);
    //     // logUtil.error(() => error);
    //   }

    //   setIsSplashScreenLoading(false);
    // })();

    /*
      Nhóm router cần hiển thị splash screen, lấy thông tin account, nếu success sẽ redirect vào trang khác, không đứng tại trang hiện tại
    */
    (async () => {
      if (currentLinkType !== LinkTypeEnum.UnAuth) return;

      const accessToken = getAccessToken();

      if (!accessToken) {
        localStorageUtil.removeItem(LOCAL_STORAGE_KEY.BRANCHES);
        localStorageUtil.removeItem(LOCAL_STORAGE_KEY.CURRENT_BRANCH);
        hideSplashScreen();
        return;
      }

      const currentBranch = localStorageUtil.getItem<IBranch>(
        LOCAL_STORAGE_KEY.CURRENT_BRANCH
      );

      // if (!currentBranch) {
      //   const branchList =
      //     localStorageUtil.getItem<IAuthBranch[]>(LOCAL_STORAGE_KEY.BRANCHES) ??
      //     [];

      // if (branchList.length > 0) {
      //   router.push(chooseBranchUrl).then(() => hideSplashScreen());
      //   return;
      // }
      // }

      try {
        const accountInfoResp = await getAccountInfo();

        if (accountInfoResp.success) {
          setTimeout(() => {
            router.push('/').then(() => hideSplashScreen());
          }, 100);

          return;
        }
      } catch (error) {
        router.push('/').then(() => hideSplashScreen());
        console.log(error);
        // logUtil.error(() => error);
      }
    })();

    /*
      Nhóm router cần hiển thị splash screen, lấy thông tin account, nếu success sẽ đứng tại trang hiện tại
    */
    (async () => {
      // if (currentLinkType !== LinkTypeEnum.Auth) return;

      // const accessToken = getAccessToken();
      hideSplashScreen();
      // if (!accessToken) {
      //   localStorageUtil.removeItem(LOCAL_STORAGE_KEY.BRANCHES);
      //   localStorageUtil.removeItem(LOCAL_STORAGE_KEY.CURRENT_BRANCH);
      //   router.push('/').then(() => hideSplashScreen());
      //   return;
      // }

      // const currentBranch = localStorageUtil.getItem<IBranch>(
      //   LOCAL_STORAGE_KEY.CURRENT_BRANCH
      // );

      // if (!currentBranch) {
      // const branchList =
      //   localStorageUtil.getItem<IAuthBranch[]>(LOCAL_STORAGE_KEY.BRANCHES) ??
      //   [];

      // if (branchList.length > 0) {
      //   const isChooseBranchPage = currentAsPath.startsWith(chooseBranchUrl);

      //   if (!isChooseBranchPage) {
      //     router.push(chooseBranchUrl).then(() => hideSplashScreen());
      //     return;
      //   }

      //   hideSplashScreen();
      //   return;
      // }

      //   removeAccessToken();
      //   router.push('/login').then(() => hideSplashScreen());
      //   return;
      // }

      // try {
        // const accountInfoResp = await getAccountInfo();
        // if (accountInfoResp.success) {
          // const isChooseBranchPage = router.asPath.startsWith(chooseBranchUrl);
          // if (isChooseBranchPage) {
          //   setTimeout(() => {
          //     router
          //       .push(route.firstDisplayPageRef.current)
          //       .then(() => hideSplashScreen());
          //   }, 100);

          //   return;
          // }

          // hideSplashScreen();
        // }
      // } catch (error) {
      //   router.push('/').then(() => hideSplashScreen());
      // }
    })();
  }, [router.isReady]);

  // What does this code do ?
  // useEffect(() => {
  //   if (!router.isReady) return;
  //   dispatch(insertRouterHistory(router.asPath));
  // }, [router.isReady, router.asPath]);

  // useEffect(() => {
  //   if (
  //     currentLinkType === LinkTypeEnum.Auth &&
  //     !showPermissionModal &&
  //     (!hasPermission || isStaffPermissionDenied)
  //   ) {
  //     setShowPermissionModal(true);
  //     // router.push(getForbiddenUrl()).then(() => setShowPermissionModal(false));
  //     router.push('/forbidden').then(() => setShowPermissionModal(false));
  //   }
  // }, [hasPermission, isStaffPermissionDenied]);

  // Setup default layout
  const children = Component?.getLayout ? (
    Component?.getLayout(Element)
  ) : (
    <UserLayout>{Element}</UserLayout>
  );

  return (
    <ModalProvider>
      {currentLinkType === LinkTypeEnum.LandingPage ? (
        <Component {...pageProps} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={
              isSplashScreenLoading
                ? MotionAnimationKeyEnum.Splash
                : MotionAnimationKeyEnum.Normal
            }
            initial={isSplashScreenLoading ? { opacity: 0.6 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {isSplashScreenLoading ? (
              <SplashScreen key={MotionAnimationKeyEnum.Splash} />
            ) : (
              <div key={MotionAnimationKeyEnum.Normal}>
                {children}
                <ApiError />
                <AppDispatch />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </ModalProvider>
  );
};
