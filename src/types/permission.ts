import {
  PermissionActionsEnum,
  PermissionEnum,
  UserPermissionEnum,
} from '@/constants/permission';

export interface IRoutingPermission {
  [key: string]: {
    [key: string]: PermissionActionsEnum[];
  };
}

export type IUserPermission = Record<
  UserPermissionEnum,
  [PermissionEnum, PermissionActionsEnum]
>;
