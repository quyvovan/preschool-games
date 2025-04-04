import { IUserPermission } from '.';

export interface IAuthUser {
  id: number;
  user_name: string;
  full_name: string;
  mobile?: string;
  mobile_country_code?: string;
  email?: string;
  last_changed_password_at: string;
  phone_verify_status?: {
    key: number;
    name: string;
  };
  picture?: string;
  last_login_at?: string;
  permissions: IUserPermission[];
}

export interface IAuthBranch {
  id: number;
  name: string;
  picture?: string;
  is_headquarter: boolean;
  default_picture: string;
  created_at: string;
  notification_count: number;
}

export interface IAuth {
  accessToken: string;
  user: IAuthUser;
  branches: IAuthBranch[];
}

export interface VerifyUser {
  data?: boolean;
}
