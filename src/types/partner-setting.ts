import { IVendorCommon } from './vendor';

export interface IGetListVendorSettingRequest {
  page?: number;
  limit?: number;
  search?: string;
  purposes: number[];
  status?: number;
}

export interface IPartnerSetting {
  id: number;
  type: {
    id: number;
    name: string;
  };
  is_enable: boolean;
}

export interface IPartnerSettingRequest {
  type: number;
  is_enable: boolean;
}

export interface ISetupMessage {
  id: number;
  plan_type: {
    id: number;
    name: string;
  };
  message_type: {
    id: number;
    name: string;
  };
  is_enable: boolean;
}

export interface ISetupMessageRequest {
  message_type: number;
}

export interface IUpdateSetupMessageRequest {
  plan_type: number;
  message_type: number;
  is_enable: boolean;
}

export interface IGetSetupMessageDetailRequest {
  message_type: number;
  plan_type: number;
}

export interface IContactInformationInSetting {
  name: string;
  value: string;
  position: string;
  status: boolean | null;
}

export interface IUpdateMessageSettingDetailRequest {
  message_type: number;
  plan_type: number;
  data: {
    vendor_id: number;
    message_action_type: number;
    detail: IContactInformationInSetting[];
  }[];
}

export interface IVendorSettingMessageItem {
  vendor: IVendorCommon;
  action_type: {
    id: number;
    name: string;
  };
  detail: IContactInformationInSetting[];
}
