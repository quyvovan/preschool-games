import { GeneralOption, IIdName } from '@/types';

export enum RoleStatusEnum {
  RoleStatusActive = 1,
  RoleStatusInactive = 2,
}

export enum RoleActionEnum {
  Edit = 1,
  View = 2,
}

export interface IPermissionActions {
  permission_id: number;
  action_id: RoleActionEnum;
}

export interface IStaffRoleParams {
  name: string;
  description: string;
  permission_action: IPermissionActions[];
}

export interface IRoleGeneral {
  id: number;
  name: string;
  code: string;
}

export interface IPermission {
  actions: IRoleGeneral[];
  permissions: IRoleGeneral[];
}

export interface IStaffRole {
  id: number;
  name: string;
  description: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  status: GeneralOption & {
    // BE confirm 29/11/2022 - Ki
    id: RoleStatusEnum;
  };
  is_owner: boolean;
  permission: {
    role_id: number;
    permissionable: {
      id: number;
      action_id: number;
      permission_id: number;
    };
  }[];
}

export interface IRolePermissionAction {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
  description: string | null;
}

export interface IStaffRolePermission {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
  actions: IRolePermissionAction[];
}

export interface IRole {
  id: number;
  name: string;
  isOwner: boolean;
  description: string | null;
  status: IIdName;
  permission: IStaffRolePermission[];
}

export interface IUserPermission {
  role_id: number;
  permissionable: {
    id: number;
    action_id: number;
    permission_id: number;
  };
}

export interface IRoleDetailResponse
  extends Omit<IRole, 'permission' | 'isOwner'> {
  is_owner: boolean;
  permission: IUserPermission[];
}

export interface IRolePermissionResponse
  extends Omit<IStaffRolePermission, 'isActive' | 'actions'> {
  actions: Omit<IRolePermissionAction, 'isActive'>[];
}

export interface ICreateEditRoleParams {
  id?: number;
  name: string;
  description: string | null;
  permission_action: {
    permission_id: number;
    action_ids: number[];
  }[];
}
