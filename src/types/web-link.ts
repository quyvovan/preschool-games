import { StatusTimelineEnum } from '@/constants';
import { GeneralOption, IIdName } from './common';
import { ICompanyBankInformationResponse } from './company-account';
import { DatePickerInputValueType } from './date';
import { IDeliveryAddress } from './delivery-address';
import { OrderStatusEnum } from './order';
import { IProductCommon } from './product';
import { IVendorCommon } from './vendor';

export interface IOrderProductItem extends IProductCommon {
  warehouse_in: GeneralOption | null;
  warehouse_out: GeneralOption | null;
  note: string;
  quantity: number;
  amount: number;
  uom: GeneralOption;
}

export interface IOrderStatusTimeLine {
  id: OrderStatusEnum;
  name: string;
  status: StatusTimelineEnum;
  updated: {
    updated_at: string | null;
    updated_by: string | null;
  }[];
}

export interface IPaymentMethodItem {
  id: number;
  name: string;
  is_default: number;
}

export interface IOrderDetail {
  id: number;
  type: number;
  supplier: IVendorCommon;
  products: IOrderProductItem[];
  amount: number;
  vat_amount: number;
  total: number;
  delivery_address: IDeliveryAddress | null;
  delivery_fee: number;
  expect_delivery: string | null;
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
  };
}

export interface IOrderWebLink {
  id: number;
  type: number;
  vendor: IVendorCommon;
  owner: {
    name: string;
  };
  customer: {
    name: string;
  };
  products: IOrderProductItem[];
  amount: number;
  vat_amount: number;
  total: number;
  delivery_address: IDeliveryAddress | null;
  delivery_fee: number;
  expect_delivery: string | null;
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
  };
  company_bank?: ICompanyBankInformationResponse;
  inventory_option: number;
  cancel_reason: IIdName;
}

export interface IWebLinkChangeOrderStatus {
  token: string;
  status: number;
  delivery_at?: DatePickerInputValueType;
  is_discard_inventory?: boolean;
}

export interface IWebLinkUpdateSaleOrderRequest {
  token: string;
  note: string;
  delivery_fee: number;
  order_date: string | null;
  is_single_destination: boolean; // true
  products: {
    id: number;
    vat: number;
    price: number;
    quantity: number;
    warehouse_out_id: number;
    sort: number;
    note: string;
    warehouse_in_id?: number | null;
  }[];
  discard_minimum_amount: boolean;
  is_discard_inventory: boolean;
}
