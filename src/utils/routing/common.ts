import { ProfileTabEnum } from '@/types';
import { addQueryStringToUrl } from '@/utils/url';

export const ROUTER_PATH = {
  HOME: '/',

  // AUTH
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  CHOOSE_BRANCH: '/choose-branch',

  // DASHBOARD
  DASHBOARD: '/dashboard',
};

// Staff
export const getStaffManagementListUrl = () => '/staffs/staff-management';

// Notification
export const getNotificationUrl = () => '/notifications';

// Account
export const getAccountProfileUrl = (query?: { tab?: ProfileTabEnum }) =>
  addQueryStringToUrl('/account/profile', query || {});

// Company
export const getCompanyListUrl = () => '/account/company';

// Auth
export const getLoginUrl = () => ROUTER_PATH.LOGIN;
export const getRegisterUrl = () => ROUTER_PATH.REGISTER;

// Forbidden
export const getForbiddenUrl = () => '/forbidden';
