import {
  ChatGroupCustomTypeEnum,
  ChatUserStatusEnum,
} from '@/libs/oda-lib/types/chat';
import { IIdName } from '../common';

export interface IGetChatMyCompanyContactListRequest {
  page?: number;
  limit?: number;
  search?: string;
  channel_url?: string;
}

export interface IGetChatParnterCompanyContactListRequest {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IGetChatPartnerCompanyContactListInChannelRequest {
  remoteId: number;
  channelUrl: string;
}

export interface IUserMyCompanyContact {
  id: number;
  company_id: number;
  name: string;
  picture: string | null;
  position: string;
  sendbird_id: string;
  is_member: boolean;
  permission: number[];
  status: {
    id: ChatUserStatusEnum;
    name: string;
  };
}

export interface IUserPartnerContact {
  id: number;
  name: string;
  picture: string | null;
  position: string;
  sendbird_id: string;
  is_member: boolean;
  permission: number[];
}

export interface IPartnerCompanyContact {
  id: number;
  type: IIdName;
  contact_company: {
    id: number;
    name: string;
    picture: string | null;
  };
  users: IUserPartnerContact[];
}

export interface IChatGroupItem {
  id: number;
  name: string;
  channel_url: string;
  custom_type: ChatGroupCustomTypeEnum;
  total_member: number;
  members: {
    id: number;
    user_id: number;
    sendbird_id: string;
    nickname: string;
    profile_url: string | null;
    position: string;
    company: {
      id: number;
      name: string;
    };
  }[];
  company_id: null | number;
  remote_id: null | number;
}

export interface IGetChatPartnerGroupListRequest {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IGetChatPartnerGroupListDataItem {
  id: number;
  name: string;
  type: IIdName;
  contact_company: {
    id: number;
    name: string;
    picture: string | null;
  };
  channels: IChatGroupItem[];
}

export interface IGetChatUserRequest {
  userId: number;
  companyId: number;
}

export interface IChatUserDetail {
  id: number;
  name: string;
  position: string;
  picture: string | null;
  status: IIdName;
  mobile: string;
  email: string | null;
  company_name: string;
  company_id: number;
  sendbird_id: string;
}

export interface ICreateChatRequest {
  custom_type: ChatGroupCustomTypeEnum;
  name?: string; // required for group type
  companies: {
    company_id: number;
    users: number[]; // user id list
  }[];
  operator_ids: number[]; // user id manager channel list
}

export interface ICreateChatData {
  channel_url: string;
  custom_type: ChatGroupCustomTypeEnum;
}

export interface IGetChatChannelDetailRequest {
  channelUrl: string;
}

export interface IChatChannelDetailMember {
  id: number;
  user_id: number;
  sendbird_id: string;
  nickname: string;
  profile_url: string;
  position: string;
  company: IIdName;
  permission: number[];
}

export interface IChatChannelDetail {
  id: number;
  name: string;
  channel_url: string;
  custom_type: ChatGroupCustomTypeEnum;
  total_member: number;
  members: IChatChannelDetailMember[];
  company_id: number;
  remote_id: number;
}

export interface IRemoveChatMemberInChannelRequest {
  channel_url: string;
  user_id: number;
}

export interface IAddChatMembersToChannelRequest {
  channel_url: string;
  companies: {
    company_id: number;
    users: number[];
  }[];
}

export interface IAddChatMembersToChannelData {
  id: number;
  channel_url: string;
  member_count: number;
  name: string;
}

export interface IUpdateChatChannelRequest {
  channel_url: string;
  name: string;
}

export interface ILeaveChatChannelRequest {
  channel_url: string;
}

export interface ILeaveMultiChatChannelRequest {
  userId: number;
  channel_id: number[];
}

export interface ILeaveChatChannelData {
  leave_success: boolean;
  need_assign: boolean;
}

export interface IGetChatUserListCanReplaceInChannelRequest {
  channel_url?: string;
  search?: string;
}

/*
  NOTE:
    - (25/09/2023) chỉ gửi một trong 2 
      - Gửi `user_id` sử dụng cho trường hợp deactive/active/delete/change role user_id
      - Gửi `role_id` sử dụng khi tắt permission chat manager
*/
export interface IGetChatUserListCanReplaceInCompanyRequest {
  user_id?: number;
  role_id?: number;
  search?: string;
}

export interface ICheckUserBelongChatGroupRequest {
  userId: number;
  role_id?: number;
}

export interface ICheckUserBelongChatGroupData {
  has_group: boolean;
  channel_id: number[];
}

export interface IAssignChatManagerWhenChangeActiveStatusOfUser {
  manager_user_id: number;
  user_id: number;
}

export interface IAssignChatManagerAllGroupRequest {
  user_id: number;
}

export interface ICheckUserWhenChangeRoleChatRequest {
  roleId: number;
}

export interface ICheckUserWhenChangeRoleChatData {
  has_group: boolean;
}

export interface IChatSettingData {
  font_size: IIdName;
}

export interface IUpdateChatSettingRequest {
  font_size_id: number;
}
