import { PartnerStatusEnum } from '@/constants/partner';
import {
  IDeliveryAddress,
  IDeliveryAddressRequest,
} from '@/types/delivery-address';
import {
  BusinessType,
  GeneralOption,
  ICategory,
  ICategoryParam,
  IIdName,
  IPersonInCharge,
} from './common';
import {
  ICompanyBankInformationResponse,
  IGeneralType,
} from './company-account';
import {
  IOrderMessageContact,
  IOrderStatusTimeLine,
  IOrderSupplierStatus,
} from './order';
import { IProductCommon, IResellProduct } from './product';
import { ITimeRangeItem } from './time-range';
import { IVendorCommon } from './vendor';

export interface IGetSalePaymentMethodListRequest {
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

export interface ISaleOrderProductItem extends IProductCommon {
  warehouse_in: GeneralOption | null;
  warehouse_out: GeneralOption | null;
  note: string;
  quantity: number;
  amount: number;
  uom: GeneralOption;
}

export interface ISaleOrderDetail {
  id: number;
  type: number;
  supplier: IVendorCommon;
  products: ISaleOrderProductItem[];
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
    id: number;
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
  is_decimal_quantity: boolean;
  cancel_reason: IIdName;
  sell_pic: IPersonInCharge | null;
}

export interface IUpdateSaleOrderRequest {
  orderId: number | string;
  note: string;
  payment_method: {
    id: number | null;
    name: string;
  };
  order_date: string | null;
  delivery_fee: number;
  is_single_destination: boolean; // true
  status: number;
  expect_delivery_date: string | null;
  expect_delivery: {
    exact_time: string | null;
    time_range: number | null;
  };
  delivery_address: Omit<IDeliveryAddressRequest, 'is_default'>;
  contact: {
    name: string;
    mobile: string;
  } | null;
  products: {
    id: number;
    vat: number;
    price: number;
    quantity: number;
    warehouse_id: number;
    sort: number;
    note: string;
    warehouse_in_id?: number | null;
  }[];
  discard_minimum_amount: boolean;
  company_bank_id?: number;
  bank_account: string; // Mock data waiting for backend
  is_discard_inventory: boolean;
  sell_pic_id?: number | null;
}

export interface IGetSaleSellingProductListRequest {
  id: number; // linked supplier/vendor id
  search?: string;
  page?: number;
  limit?: number;
  categories?: Pick<ICategoryParam, 'id' | 'level'>[];
}

export interface IGetSaleOrderProductListRequest {
  search?: string;
  page?: number;
  limit?: number;
}

export interface IGetSaleVendorList {
  purposes?: number[];
  page?: number;
}

export interface ICreateSaleOrderRequest {
  note: string;
  payment_method: {
    id: number | null;
    name: string;
  };
  vendor: {
    name: string;
    id: number | null;
  };
  order_date: string;
  delivery_fee: number;
  is_single_destination: boolean; // true
  status: number;
  expect_delivery_date: string;
  expect_delivery: {
    exact_time: string | null;
    time_range: number | null;
  };
  delivery_address: Omit<IDeliveryAddressRequest, 'is_default'>;
  contact: {
    name: string;
    mobile: string;
  } | null;
  products: {
    id: number;
    vat: number;
    price: number;
    quantity: number;
    warehouse_id: number;
    sort: number;
    note: string;
  }[];
  discard_minimum_amount: boolean;
  discard_unpaid_amount: boolean;
  company_bank_id?: number;
  is_discard_inventory: boolean;
  sell_pic_id?: number | null;
}

export interface IOrderSupplierRemote {
  id: number;
  name: string;
  mobile: string;
  tax_code: string;
  address: string;
  picture: string;
  business_type: BusinessType[];
  city_id: IGeneralType;
  district_id: IGeneralType;
  selling_product: IGeneralType[];
  is_disabled: boolean;
  is_deleted: boolean;
  is_inactive: boolean;
}

export interface IBuyerDeliveryBill {
  id: number;
  name: string;
  mobile: string;
  address: string;
  city?: IGeneralType;
  district?: IGeneralType;
  is_sync: boolean;
  status: IOrderSupplierStatus;
  remote?: IOrderSupplierRemote & {
    district?: IGeneralType;
    city?: IGeneralType;
  };
}

export interface ISupplierDeliveryBill {
  id: number;
  name: string;
  mobile: string;
  tax_code: string;
  address: string;
  picture?: string;
  business_type: BusinessType[];
  city: IGeneralType;
  district: IGeneralType;
  selling_product: IGeneralType[];
  is_disabled: boolean;
  is_deleted: boolean;
  is_inactive: boolean;
}

export interface IPaymentMethod {
  id: number;
  name: string;
  is_default: boolean;
}

export interface IOrderProductInDeliveryBill {
  id: number;
  sku: string;
  name: string;
  vat: number;
  price: number;
  quantity: number;
  warehouse_out?: IGeneralType;
  warehouse_in?: IGeneralType;
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

export interface IOrderInDeliveryBill {
  id: number;
  status: IGeneralType;
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
  time_range: ITimeRangeItem | null;
  exact_time: string | null;
}

export interface IUpdateLatestPriceRequest {
  order_ids: number[];
  discard_minimum_amount: boolean;
}

export interface IGetDeliveryBillListRequest {
  order_ids: {
    id: number;
    include_vat?: number; // 0: false | 1: true
  }[];
}

export interface IGetBuyersWithStatusRequest {
  purposes?: number[];
  is_active?: PartnerStatusEnum;
  ids?: number[];
}

export interface IGetWarehouseProductsRequest {
  product_ids: number[];
  order_id?: number;
}

export interface IWarehouseItemInProduct {
  id: number;
  name: string;
  current_stock: number;
}

export interface IWarehouseProductItem {
  warehouse: IWarehouseItemInProduct[];
}

export interface IWarehouseProductsResponse
  extends Record<string, IWarehouseProductItem> {}

export interface IChangeSaleOrdersStatusRequest {
  order_ids: {
    id: number;
    delivery_at?: string;
  }[];
  status: number;
  is_discard_inventory: boolean;
}

export interface IMultipleSaleOrderInfoItem {
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
  completed_date: null | string;
  out_for_delivery_date: null | string; // this if out of delivery date
  buyer: IVendorCommon;
}
