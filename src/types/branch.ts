import { ICategory, IIdName } from './common';

export enum BranchStaffStatusEnum {
  Active = 1,
  Inactive = 2,
}

export interface IBranchStaff {
  id: number;
  user_name: string;
  full_name: string;
  picture?: string;
  status: IIdName;
}

export interface IBranch {
  id: number;
  name: string;
  picture: string;
  mobile?: string;
  tax_code?: string;
  is_headquarter: boolean;
  notification?: number;
  code?: string;
  address?: string;
  staff_count?: number;
  owner?: {
    id: number;
    full_name: string;
    picture?: string;
    user_name?: string;
  };
  created_by?: {
    id: number;
    full_name: string;
    picture?: string;
    user_name?: string;
  };
  city?: IIdName;
  district?: IIdName;
  business_type: IIdName[];
  selling_product: IIdName[];
  full_address: string;
}

export interface IBranchInList {
  id: number;
  name: string;
  mobile?: string;
  is_headquarter: boolean;
  code?: string;
  staff_count?: number;
  owner?: {
    id: number;
    full_name: string;
    picture?: string;
    user_name?: string;
  };
  created_by?: {
    id: number;
    full_name: string;
    picture?: string;
    user_name?: string;
  };
  full_address: string;
}

export interface IBranchOwner {
  full_name: string;
  user_name: string;
  password: string;
  password_confirmation: string;
  mobile: string;
  position: string;
  mobile_country_code: string;
}

export interface ISettingProduct {
  is_copy_supplier_price_vat: boolean;
  is_enable: boolean;
  is_all?: boolean;
  ids?: number[];
  search?: number;
  purposes?: number[];
  not_in_product_ids?: number[];
}

export interface ISettingVendor {
  is_enable: boolean;
  is_all?: boolean;
  ids?: number[];
  search?: string;
  purposes?: number[];
  not_in_vendor_ids?: number[];
}

export interface IBranchVendor {
  id: number;
  name: string;
  alias: string;
  email: string;
  mobile: string;
  is_sync: boolean;
  status: IIdName;
  remote: {
    id: number;
    name: string;
    mobile: string;
    tax_code: string;
    address: string;
    picture: string;
    business_type: IIdName[];
    city: IIdName;
    district: IIdName;
    selling_product: IIdName[];
    is_disabled: boolean;
    is_deleted: boolean;
    is_inactive: boolean;
  };
  created_at: string;
  city: IIdName;
  district: IIdName;
}

export interface IBranchProduct {
  id: number;
  sku: string;
  name: string;
  uom: any;
  price?: any;
  origin?: string;
  categories: ICategory[];
  image: string;
  default_image: string;
  vat: any;
  be_purchased: boolean;
  be_sold: boolean;
  specs: string;
}

export interface ICreateBranchRequest {
  name: string;
  tax_code?: string;
  mobile?: string;
  city_id: number;
  district_id: number;
  address?: string;
  business_type: IIdName[];
  selling_product: IIdName[];
  owner_id?: number;
  owner?: IBranchOwner;
  setting: {
    product: ISettingProduct;
    vendor: ISettingVendor;
  };
}

export interface IUpdateBranchParam {
  id: number;
  name: string;
  tax_code: string;
  mobile: string;
  city_id: number;
  district_id: number;
  address: string;
  business_type: IIdName[];
  selling_product: IIdName[];
}
