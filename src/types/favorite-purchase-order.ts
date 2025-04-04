import { GeneralOption, IIdName } from './common';
import { ICompanyBankInformationResponse } from './company-account';
import { IDeliveryAddress } from './delivery-address';
import { IProductCommon } from './product';
import { IPaymentMethodItem } from './purchase-order';
import { IVendorCommon } from './vendor';

export interface IFavoritePurchaseOrderItem {
  id: number;
  name: string;
  type: number;
  is_default: boolean;
  created_at: string;
  company: {
    id: number;
    name: string;
    picture: string;
  };
}

export interface IFavoritePurchaseOrderRequestItem {
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
  company_delivery_address_id: number;
  expect_delivery: {
    exact_time: string | null;
    time_range: number | null;
  };
  products: {
    id: number;
    vat: number;
    price: number;
    quantity: number;
    warehouse_id: number;
    note: string;
    sort: number;
  }[];
  sort_by: number;
}

export interface ICreateFavoritePurchaseOrderRequest {
  name: string;
  is_default: boolean;
  purchase_orders: IFavoritePurchaseOrderRequestItem[];
}

export interface IUpdateFavoritePurchaseOrderRequest
  extends ICreateFavoritePurchaseOrderRequest {
  orderId: number;
}

export interface ICreateFavoritePurchaseOrderResponse {
  created_at: string;
  favorite: number; // favorite order id
}

export interface IDeleteFavoritePurchaseOrderResponse {
  deleted_at: string;
  id: number; // favorite order id
}

export interface IFavoritePurchaseOrderProductItem extends IProductCommon {
  note: string;
  quantity: number;
  uom: GeneralOption;
  warehouse: IIdName;
}

export interface IFavoritePurchaseOrderItemInDetail {
  id: number;
  favorite_id: number;
  company: {
    id: number;
    name: string;
    picture: string;
  };
  payment_method: IPaymentMethodItem;
  delivery_address: IDeliveryAddress | null;
  vendor: IVendorCommon;
  delivery_fee: number;
  time_range: IIdName | null;
  exact_time: string | null;
  note: string | null;
  company_bank?: ICompanyBankInformationResponse;
  products: IFavoritePurchaseOrderProductItem[];
  sort_by: IIdName;
}

export interface IFavoritePurchaseOrderDetail {
  id: number;
  name: string;
  company: {
    id: number;
    name: string;
    picture: string;
  };
  type: number; // ???
  is_default: boolean;
  created_at: string;
  favorite_order: IFavoritePurchaseOrderItemInDetail[];
}
