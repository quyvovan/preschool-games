import { IPartnerDeliveryAddressRequest } from '@/components/shared-components/delivery-address/AddEditPartnerDeliveryAddressModal/types';

export interface IPartnerGroupStaff {
  id: number;
  full_name: string;
}

export enum PartnerGroupTypeEnum {
  Buyer = 1,
  Supplier = 2,
}

export interface ICreatePartnerGroupRequest {
  type: number;
  name: string;
  description: string;
  vendors: { vendor_id: number }[];
}

export interface IVendorInPartnerGroupDetail {
  id: number;
  name: string | null;
  alias: string | null;
  tax_code: string | null;
  mobile: string | null;
  purpose: {
    id: number;
    sort: number;
    name: string;
    name_vn: string;
    name_ko: string;
  };
}

export interface IPartnerGroupDetail {
  id: number;
  name: string;
  description: string | null;
  type: {
    id: number;
    name: string;
  };
  created_by: {
    id: number;
    full_name: string;
  };
  details: IVendorInPartnerGroupDetail[];
}

export interface IUpdatePartnerGroupRequest {
  id: number | string;
  name: string;
  description: string;
  vendors: { vendor_id: number }[];
}

export type IGetPartnerGroupListRequest = {
  page?: number;
  limit?: number;
  search?: string;
  type?: number;
  created_by_ids?: number[];
};

export interface IPartnerGroupListItem {
  id: number;
  name: string;
  description: string | null;
  type: {
    id: number;
    name: string;
  };
  vendor_count: number;
  created_at: string;
  created_by: {
    id: number;
    full_name: string;
  };
}
export interface IDeliveryAddressByLinkedRequest {
  company_delivery_address_id: number;
  delivery_fee: number;
}

export interface IUpdatePartnerByRoleRequest {
  purpose: number;
  selling_type?: number;
  price_management_id?: number | null;
  payment_method?:
    | {
        id?: number | null;
        inputValue?: string;
        name?: string;
        note?: string;
      }
    | null
    | undefined;
  delivery_address?: IPartnerDeliveryAddressRequest[];
  delivery_address_link?: IDeliveryAddressByLinkedRequest[];
  company_bank_id?: number;
  add_local_product_ids?: number[];
  remove_local_product_ids?: number[];
}
