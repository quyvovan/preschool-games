import { IBranch } from '../branch';
import { IStaffRole, IUserPermission } from './role';

export interface IStaffBranchList {
  id: number;
  name: string;
  is_headquarter: boolean;
}

export interface IBranchRole {
  role: IStaffRole | null;
  branch: IBranch | null;
}

export interface IStaffManagementBranch {
  id: number;
  is_active: boolean;
  name: string;
  role: IStaffDetailsRole;
}

export interface IStaffManagement {
  id: number;
  full_name: string;
  user_name: string;
  mobile: string;
  email: string;
  last_login_at: string;
  position: string;
  branches?: IStaffManagementBranch[];
}

export interface IStaffDetailsRole {
  id: number;
  name: string;
  is_owner: boolean;
  permission: IUserPermission[];
}

export interface IStaffDetails {
  id: number;
  position: string;
  full_name: string;
  user_name: string;
  mobile: string;
  email: string;
  mobile_country_code?: string;
  last_changed_password_at?: string;
  branch: {
    is_active: boolean;
    name: string;
    id: number;
    role: IStaffDetailsRole;
  };
  password?: string;
  password_confirmation: string;
  role_id?: number;
}

export interface FormCreateStaffManagement {
  full_name: string;
  user_name: string;
  email: string;
  mobile: string;
  mobile_country_code: string;
  password: string;
  password_confirmation: string;
  position: string;
  branch_roles: {
    role_id?: number;
    branch_id?: number;
  }[];
}

export interface IUpdateStaffBranchRolesRequest {
  id: number;
  data: {
    from: {
      branch_id: number;
    };
    to: {
      branch_id: number;
      role_id: number;
    };
  };
}

export interface IAddDeleteStaffBranchRolesRequest {
  id: number;
  data: {
    branch_id: number;
    role_id: number;
  };
}
