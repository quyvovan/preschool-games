import { NotificationFilterTypeEnum } from '@/constants';

export interface INotificationSettingItem {
  id: number;
  is_enabled: boolean;
}

export interface INotificationSettingGroup {
  id: number;
  types: INotificationSettingItem[];
}

export interface IUpdateNotificationSettingRequest {
  notification_setting: INotificationSettingGroup[];
}

export interface IGetNotificationListParams {
  type: NotificationFilterTypeEnum;
}

export interface IReadAllNotificationParams {
  type: NotificationFilterTypeEnum;
}

export interface INotificationGeneral {
  id: number;
  name: string;
  name_ko?: string;
  name_vn?: string;
  name_en?: string;
}

export interface INotificationContentGeneral {
  id: number;
  name?: string;
  type?: string;
  url_web?: string;
}

export interface INotificationContentDownloadExcel {
  batch_id: string;
  key?: string;
  url?: string;
  status?: number;
}

export interface INotificationContentParams {
  content: number;
  product: INotificationGeneral | null;
  partner: INotificationContentGeneral | null;
  user: INotificationContentGeneral | null;
  warehouse: INotificationContentGeneral | null;
  order: INotificationContentGeneral | null;
  download_product: INotificationContentGeneral | null;
  excel: INotificationContentDownloadExcel | null;
  new_role: INotificationGeneral | null;
  old_role: INotificationGeneral | null;
}

export interface INotificationContent {
  template: string;
  params: INotificationContentParams;
}

export interface INotification {
  id: number;
  receiver_id: number;
  is_read: boolean;
  type: INotificationGeneral;
  content: INotificationContent;
  created_at: string;
}

export interface INotificationSettingType {
  id: number;
  name: string;
  description: string;
  is_enabled: boolean;
}

export interface INotificationSetting {
  id: number;
  name: string;
  description: string;
  types: INotificationSettingType[];
}

export interface IGetNotificationTypeParams {
  type?: number;
}

export interface INotificationDetection {
  display_alert: boolean;
  display_bell: boolean;
}

export interface IReadNotificationParams {
  id: number;
}

export interface INotificationType {
  id: number;
  name: string;
  quantity: number;
}
