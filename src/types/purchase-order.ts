import { PartnerStatusEnum } from '@/constants/partner';
import {
  IDeliveryAddress,
  IDeliveryAddressRequest,
} from '@/types/delivery-address';
import { GeneralOption, ICategory, ICategoryParam, IIdName } from './common';
import { ICompanyBankInformationResponse } from './company-account';
import {
  IOrderMessageContact,
  IOrderStatusTimeLine,
  IOrderSupplierStatus,
} from './order';
import { IProductCommon, IResellProduct } from './product';
import { ITimeRangeItem } from './time-range';
import { IVendorCommon } from './vendor';

export interface IGetPurchasePaymentMethodListRequest {
  search?: string;
  default?: number;
  page?: number;
  limit?: number;
  order?: string;
  order_by?: string;
}

export interface IPaymentMethodItem {
  id: number;
  name: string;
  is_default: number;
}

export enum ProductCanPurchaseTypeEnum {
  Internal = 'internal',
  Single = 'single', // it is `local` vendor
  Linked = 'linked',
}

export interface IGetProductCanPurchaseRequest {
  page?: number;
  limit?: number;
  search?: string;
  product_type?: ProductCanPurchaseTypeEnum;
  order_by?: 'custom_order';
  order?: 'asc' | 'desc';
  company_ids?: (number | string)[];
  local_supplier_ids?: (number | string)[];
  categories?: Pick<ICategoryParam, 'id' | 'level'>[];
}

export interface IGetProductPurchaseGroupsRequest {
  search?: string;
  page?: number;
  limit?: number;
}

export interface IPurchaseOrderRequestItem {
  vendor: {
    id: number | null;
    name: string;
  };
  note: string;
  payment_method: {
    id: number | null;
    name: string;
  };
  delivery_fee: number; // 0
  is_single_destination: boolean; // true
  order_date: string; // "2023-04-21",
  expect_delivery_date: string | null; // "2023-04-22 10:50:00",
  expect_delivery: {
    exact_time: string | null;
    time_range: number | null;
  };
  /*
    NOTE (05/05/2023):
      - Link: 11, 12
      - Local: 11, 13
  */
  status: number;
  company_delivery_address_id: number;
  products: {
    id: number;
    vat: number;
    price: number;
    quantity: number;
    warehouse_id: number;
    note: string;
    sort: number;
  }[];
}

export interface ICreateMultiPurchaseOrderRequest {
  purchase_orders: IPurchaseOrderRequestItem[];
  discard_unpaid_amount: boolean;
}

export interface ICreateMultiPurchaseOrderData {
  id: number[];
  need_approve: boolean;
}

export interface IPurchaseOrderProductItem extends IProductCommon {
  warehouse_in: GeneralOption | null;
  warehouse_out: GeneralOption | null;
  note: string;
  quantity: number;
  amount: number;
  uom: GeneralOption;
}

export interface IPurchaseOrderDetail {
  id: number;
  type: number;
  supplier: IVendorCommon;
  products: IPurchaseOrderProductItem[];
  amount: number;
  vat_amount: number;
  total: number;
  delivery_address: IDeliveryAddress | null;
  delivery_fee: number;
  is_single_destination: boolean;
  last_status_at: string;
  note: string | null;
  order_date: string | null;
  status_time_line: IOrderStatusTimeLine[];
  payment_method: IPaymentMethodItem;
  status: GeneralOption;
  warehouse_destination: GeneralOption;
  contact: {
    name: string;
    mobile: string;
  } | null;
  message: IOrderMessageContact[];
  company_bank?: ICompanyBankInformationResponse;
  is_exceed_unpaid_amount: boolean;
  current_unpaid_amount: number;
  limit_unpaid_amount: number;
  expect_delivery: string | null;
  time_range: ITimeRangeItem | null;
  exact_time: string | null;
  cancel_reason: IIdName;
}

export interface IUpdatePurchaseOrderRequest {
  orderId: number | string;
  note: string;
  payment_method: {
    id: number | null;
    name: string;
  };
  order_date: string | null;
  delivery_fee: number; // 0
  is_single_destination: boolean; // true
  status: number;
  expect_delivery_date: string | null;
  expect_delivery: {
    exact_time: string | null;
    time_range: number | null;
  };
  delivery_address: Omit<IDeliveryAddressRequest, 'is_default'>;
  products: {
    id: number;
    vat: number;
    price: number;
    quantity: number;
    warehouse_id: number;
    sort: number;
    note: string;
  }[];
}

export interface IGetPurchaseProductListRequest {
  id?: number; // local supplier/vendor id
  search?: string;
  page?: number;
  size?: number;
}

export interface IGetPurchaseSellingProductListRequest {
  id: number; // linked supplier/vendor id
  search?: string;
  page?: number;
  size?: number;
}

export interface IGetSuppliersWithStatusRequest {
  purposes?: number[];
  is_active?: PartnerStatusEnum;
  ids?: number[];
}

export interface IMultiplePurchaseOrderInfoItem {
  id: number;
  amount: number;
  approved_status: IIdName | null;
  created_at: string;
  created_by: IIdName;
  current_unpaid_amount: number;
  delivery_date: string;
  is_exceed_unpaid_amount: boolean;
  limit_unpaid_amount: number | null;
  order_date: string;
  status: IIdName;
  type: number;
  supplier: IVendorCommon;
}

export interface IChangeStatusDeliveredToCompletedRequest {
  order_ids: {
    id: number;
    delivery_at: string;
  }[];
}

export enum PurchaseOrderSortByEnum {
  AddedTime = 1,
  Name = 2,
  SupplierOrdered = 3,
}

export interface IOrderSupplierRemote {
  id: number;
  name: string;
  mobile: string;
  tax_code: string;
  address: string;
  picture: string;
  business_type: IIdName[];
  city_id: IIdName;
  district_id: IIdName;
  selling_product: IIdName[];
  is_disabled: boolean;
  is_deleted: boolean;
  is_inactive: boolean;
}

export interface IBuyerDeliveryBill {
  id: number;
  name: string;
  mobile: string;
  tax_code: string;
  address: string;
  picture?: string;
  business_type: IIdName[];
  city: IIdName;
  district: IIdName;
  selling_product: IIdName[];
  is_disabled: boolean;
  is_deleted: boolean;
  is_inactive: boolean;
}

export interface ISupplierDeliveryBill {
  id: number;
  name: string;
  mobile: string;
  address: string;
  city?: IIdName;
  district?: IIdName;
  is_sync: boolean;
  status: IOrderSupplierStatus;
  remote?: IOrderSupplierRemote & {
    district?: IIdName;
    city?: IIdName;
  };
  picture?: string;
}

export interface IOrderProductInDeliveryBill {
  id: number;
  sku: string;
  name: string;
  vat: number;
  price: number;
  quantity: number;
  warehouse_out?: IIdName;
  warehouse_in?: IIdName;
  amount: number;
  image: string;
  default_image: string;
  categories: ICategory[];
  note: string;
  uom?: GeneralOption;
  origin: string;
  specs: string;
  languages: IResellProduct['languages'];
}

export interface IPaymentMethod {
  id: number;
  name: string;
  is_default: boolean;
}

export interface IOrderInDeliveryBill {
  id: number;
  status: IIdName;
  supplier: ISupplierDeliveryBill;
  buyer: IBuyerDeliveryBill;
  note?: string;
  payment_method: IPaymentMethod;
  bank_account: string;
  amount: number;
  vat_amount: number;
  delivery_fee: number;
  total: number;
  is_single_destination: boolean;
  products: IOrderProductInDeliveryBill[];
  created_at: string;
  delivered_at?: string;
  expect_delivery_at?: string;
  unpaid_amount?: number;
  sub_amount: number;
  total_payment: number;
  vendor_contact: {
    id: number;
    name: string;
    mobile: string | null;
    email: string | null;
  };
  order_date: string | null;
  // TODO: Fake data
  expected_delivery_date?: string;
  expected_delivery_time?: string;
  time_range: ITimeRangeItem | null;
  exact_time: string | null;
}

export interface IGetDeliveryBillListRequest {
  order_ids: {
    id: number;
    include_vat?: number; // 0: false | 1: true
  }[];
}
