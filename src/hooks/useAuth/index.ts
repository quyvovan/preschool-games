import { useAppDispatch } from '../useStore';
import { useLazyGetUserDetailQuery, useLoginMutation } from '@/apis';
import { userActions } from '@/store/slices/user';
import { ILoginRequest } from '@/types/user';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/cookies';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  // const currentCompany = useAppSelector(companySelectors.getCompany);
  const [loginMutate, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [getUserInfo, { isLoading: isLoadingGetUserInfo }] =
    useLazyGetUserDetailQuery();
  // const isAuthenticated = !!currentCompany;
  const isAuthenticated = false;

  const login = async (request: ILoginRequest) => {
    const loginResp = await loginMutate(request).unwrap();

    if (
      loginResp.data?.accessToken &&
      loginResp.data?.user
      // loginResp.data?.branches &&
      // loginResp.data?.branches.length > 0
    ) {
      // save token
      setAccessToken(loginResp.data.accessToken);

      // save branch list
      // localStorageUtil.setItem(
      //   LOCAL_STORAGE_KEY.BRANCHES,
      //   loginResp.data.branches
      // );
    }

    return loginResp;
  };

  const resetAuthState = () => {
    removeAccessToken();
    dispatch(userActions.resetState());
    // localStorageUtil.removeItem(LOCAL_STORAGE_KEY.CURRENT_BRANCH);
    // localStorageUtil.removeItem(LOCAL_STORAGE_KEY.BRANCHES);
    // dispatch(companyActions.resetState());
  };

  /**
    - LƯU Ý: func này chỉ được sử dụng sau khi đã login (để có accessToken) và đã chọn một branch. Thường sử dụng trong giai đoạn load splash screen hoặc khi chọn một branch
    - Func này hỗ trợ get tất cả các thông tin cần thiết của một account:
      - Thông tin user
      - Thông tin company
      - Thông tin setting menu
      - Thông tin setting product name
    - Nếu gọi func này bị fail thì tự func này sẽ remove các thông tin đã lưu trong storage, redux
    - Khi gọi func này bị fail nên redirect về login hoặc xử lý theo hướng nào đó tuỳ vào UI/UX ở nơi sử dụng. 
  */
  const getAccountInfo = async () => {
    try {
      const accessToken = getAccessToken();

      if (!accessToken) {
        return {
          success: false,
          data: null,
        };
      }

      const [userResp] = await Promise.all([
        getUserInfo().unwrap(),
        // getCompany().unwrap(),
        // getSystemSetting().unwrap(),
      ]);

      if (
        !userResp.success ||
        !userResp.data
        // !companyResp.success ||
        // !companyResp.data ||
        // !systemSettingResp.data?.menu_display ||
        // !systemSettingResp.data?.product_name_display
      ) {
        resetAuthState();
        return {
          success: false,
          data: null,
        };
      }

      // Update user info to redux
      const userInfo = userResp.data;

      dispatch(
        userActions.setUserInfo({
          id: userInfo.id,
          email: userInfo.email,
          username: userInfo.user_name,
          fullName: userInfo.full_name,
          permissions: userInfo.permissions,
          isOwner: userInfo.is_owner,
        })
      );

      // Update company info to redux
      // const companyInfo = companyResp.data;
      // dispatch(
      //   companyActions.setCompany({
      //     id: companyInfo.id,
      //     name: companyInfo.name,
      //     avatarImageUrl: companyInfo.picture ?? IMAGE_DEFAULT.COMPANY,
      //   })
      // );

      // Update menu system setting to redux
      // dispatch(
      //   companyActions.setMenuDisplaySetting(
      //     systemSettingResp.data.menu_display
      //   )
      // );

      // Update product name setting to redux
      // const productNameDisplaySetting =
      //   systemSettingResp.data.product_name_display;
      // dispatch(
      //   companyActions.setNameDisplaySetting({
      //     type: productNameDisplaySetting.type,
      //     firstLanguage: productNameDisplaySetting.first_language,
      //     secondLanguage: productNameDisplaySetting.second_language,
      //   })
      // );

      return {
        success: true,
        data: {
          user: userResp.data,
          // company: companyResp.data,
          // systemSetting: systemSettingResp.data,
        },
      };
    } catch (error) {
      resetAuthState();
      throw error;
    }
  };

  const logout = async () => {
    resetAuthState();
  };

  return {
    login,
    isLoadingLogin,

    getAccountInfo,
    isLoadingGetAccountInfo: isLoadingGetUserInfo,

    logout,
    isAuthenticated,
  };
};
