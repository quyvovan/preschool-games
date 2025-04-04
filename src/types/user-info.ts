export interface IUserPermission {
  permission_id: number;
  actions: number[];
}
export interface IUserInfo {
  id: number;
  user_name: string;
  full_name: string;
  mobile: string;
  mobile_country_code: string;
  email: string;
  last_changed_password_at: string;
  status: number;
  phone_verify_status: {
    key: number;
    name: string;
  };
  picture: string;
  permissions: IUserPermission[];
  is_owner: boolean;
  send_bird: {
    id: number;
    sendbird_id: string;
    access_token: string;
  } | null;
}
export interface IUserInput {
  password?: string;
  full_name?: string;
  email?: string;
  mobile?: string;
  remove_picture?: string;
  remove_email?: string;
}
export interface IUserParam {
  password?: string;
  password_confirmation?: string;
  full_name?: string;
  email?: string;
  mobile?: string;
  remove_picture?: boolean;
  remove_email?: boolean;
}

export enum PhoneNumberStatusEnum {
  un_verified,
  verified,
}

export enum ProfileTabEnum {
  Account = 0,
  Notification = 1,
}

export enum CompanyTabEnum {
  Company = 0,
  Subscription = 1,
  StoreSetting = 2,
  SystemSetting = 3,
}

export enum DeliveryScheduleEnum {
  Everyday = 'everyday',
  Custom = 'custom',
}

export interface IStoreUserInfo {
  id: number;
  email: string | null;
  username: string;
  isOwner: boolean;
  permissions: IUserPermission[];
}
