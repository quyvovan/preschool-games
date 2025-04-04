import {
  BusinessType,
  GeneralOption,
  IAddContactInformationRequest,
  ICategory,
  ICity,
  ICompanyBankInformationResponse,
  IContactInformation,
  IDistrict,
  IIdName,
  IPersonInCharge,
  IPriceManagementListItem,
  IUpdateContactInformationRequest,
  SellingProduct,
} from '@/types';
import { IAddressAreaGeneral } from './delivery-address';
import { IPaymentMethodItem } from './sale-order';

export enum VendorStatusEnum {
  LOCAL = 1,
  LINKED = 2,
}

export const VENDOR_STATUS_ID_TO_NAME = {
  [VendorStatusEnum.LOCAL]: 'local',
  [VendorStatusEnum.LINKED]: 'linked',
};

export interface IDefaultProduct {
  product_id: number;
}
export interface ICustomProduct {
  product_id: number;
  price_id: number;
}
export interface IAddVendorParam {
  name?: string;
  alias: string;
  tax_code: string;
  owner_name: string;
  description: string;
  address: {
    city_id: number;
    district_id: Number;
    address: string;
  };
  purpose?: number;
  selling_type?: number;
  company_bank_id?: number;
  local_product_ids?: number[];
}

export interface IAddVendorByCodeParam {
  vendor_id?: number;
  purpose?: number;
}

export type IPurposer = GeneralOption & {
  sort?: number;
};

export interface IVendorStatus {
  id: VendorStatusEnum;
  name: string;
  name_vn: string;
  name_ko: string;
}
export enum VendorPurposeEnum {
  Buyer = 1,
  Supplier = 2,
  Both = 3,
}

export enum VendorIDEnum {
  LOCAL = 1,
  LINKED = 2,
}

export enum VendorSellEnum {
  INIT_VALUE = '0',
  SELL_ALL = '1',
  NOT_SELL = '2',
  CUSTOMIZED_SELL = '3',
}

export const SELL_PRODUCT_LIST = {
  DEFAULT: 'default',
  CUSTOMIZED: 'customized',
};

export interface IRemoteInVendor {
  id: number;
  name: string;
  mobile: string;
  tax_code: null | string;
  address: string;
  picture: null | string;
  business_type: { id: number }[];
  city_id: ICity;
  district_id: IDistrict;
  selling_product: { id: number }[];
  is_disabled: boolean;
  is_deleted: boolean;
  is_inactive: boolean;
}

export interface IVendor {
  id: number;
  name?: string;
  alias?: string;
  tax_code?: string;
  owner_name?: string;
  description?: string;
  city?: ICity;
  district?: IDistrict;
  address?: string;
  email: string;
  mobile: string;
  staff_email: string;
  staff_mobile: string;
  purpose?: IPurposer;
  selling_product_count?: number;
  purchasing_product_count?: string | number;
  is_sync?: boolean;
  status?: GeneralOption;
  remote?: IRemoteInVendor;
  remote_purchasing_products?: number;
  remote_selling_products?: number;
  pic?: IPersonInCharge;
}

export interface VendorOfPendingApproval extends Partial<IVendor> {
  id?: number;
  name?: string;
  mobile?: string;
  tax_code?: string;
  address?: string;
  picture?: string;
  business_type?: BusinessType[];
  city_id?: ICity;
  district_id?: IDistrict;
  selling_product?: SellingProduct[];
}

export interface IVendorRequest {
  id: number;
  status: IVendorStatus;
  purpose?: IPurposer;
  vendor: VendorOfPendingApproval;
}

export interface ISellingProduct {
  id?: number;
  price_id?: {
    id?: number;
    product_id?: number;
    price?: string;
  };
  product?: IProductByVendor;
}

export interface IProductByVendor {
  categories?: ICategory[];
  company_id: number;
  name?: string;
  custom_prices?: [
    {
      id?: number;
      product_id?: number;
      price?: string;
    }
  ];
  id?: number;
  languages?: any;
  origin?: string;
  price?: any;
  image?: string;
  default_image?: string;
  purpose?: VendorPurposeEnum;
  sku?: string;
  vat?: any;
  uom?: GeneralOption;
}

export interface IVendorDetail {
  id: number;
  address: string;
  alias?: string;
  city: ICity;
  description: string;
  district: IDistrict;
  email: string;
  is_sync: boolean;
  mobile: string;
  name?: string;
  tax_code?: string;
  owner_name?: string;
  staff_mobile: string;
  staff_email: string;
  selling_type: number;
  status: GeneralOption;
  purpose?: IPurposer;
  selling_products?: ISellingProduct[];
  payment_method: IPaymentOption | null;
  price_management: IPriceManagementListItem | null;
  remote?: {
    id: number;
    address?: string;
    business_type?: any;
    city_id?: ICity;
    district_id?: IDistrict;
    mobile?: string;
    name?: string;
    image?: string;
    default_image?: string;
    selling_products?: (ISellingProduct & {
      product: IProductByVendor;
    })[];
    tax_code?: string;
  };
  company_bank?: ICompanyBankInformationResponse;
  pic?: IPersonInCharge;
}

export interface IPaymentOption {
  id: number | null;
  name: string;
  inputValue: string;
  note?: string;
}

export interface IGetListVendorFilter {
  purposes?: (number | string)[];
  vendor_ids?: (number | string)[];
}

/**
  NOTE: All field have in a vendor but optional all with any
*/
export interface IVendorCommon {
  id: number;
  name?: any;
  description?: any;
  alias?: any;
  owner_name?: any;
  email?: any;
  mobile?: any;
  city?: any;
  district?: any;
  address?: any;
  default_picture?: any;
  picture?: any;
  tax_code?: any;
  staff_email?: any;
  staff_mobile?: any;
  status?: any;
  is_sync?: any;
  purpose?: any;
  selling_type?: any;
  is_inactive?: boolean;
  remote?: {
    id: number;
    name?: any;
    picture?: any;
    address?: any;
    mobile?: any;
    tax_code?: any;
    business_type?: any;
    city_id?: any;
    district_id?: any;
    default_picture?: any;
    selling_product?: any;
    is_disabled?: boolean;
    is_deleted?: boolean;
    is_inactive?: boolean;
    city?: any;
    district?: any;
    inventory_option?: IIdName;
  } | null;
  contact_info?:
    | {
        name?: any;
        position?: any;
        email?: any;
        mobile?: any;
        note?: any;
      }[];
  payment_method?: IPaymentMethodItem;
  company_bank?: ICompanyBankInformationResponse;
  pic?: IPersonInCharge;
}

export interface IGetPartnerDeliveryAddressListRequest {
  id: number;
  page?: number;
  limit?: number;
  default?: 0 | 1;
}

export interface IAddPartnerDeliveryAddressRequest {
  id: number;
  name: string;
  mobile: string;
  address: string;
  city_id: IAddressAreaGeneral['id'];
  district_id: IAddressAreaGeneral['id'];
  is_default: boolean;
  delivery_fee: number;
}

export interface IContactInformationInVendor extends IContactInformation {
  vendor_id: number | string;
}

export interface IAddContactInformationRequestInVendor
  extends IAddContactInformationRequest {
  vendor_id: number | string;
}

export interface IUpdateContactInformationRequestInVendor
  extends IUpdateContactInformationRequest {
  vendor_id: number | string;
}

export interface IDeleteContactInformationRequestInVendor {
  vendor_id: number | string;
  id: number | string;
}
