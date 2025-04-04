import { RangeShortcutType } from '@/components/shared-components/date-range-picker/DateRangePicker.const';
import { StatusTimelineEnum } from '@/constants';
import { IOrderProductFromServer, IProductByVendor, VendorStatusEnum } from '.';
import { GeneralOption, ICategory, IIdName } from './common';
import { IWarehouse } from './inventory/warehouse';
import { IProduct } from './product';
import { IOrderSupplierRemote, IPaymentMethodItem } from './sale-order';

interface ISelectOption {
  id: number | null;
  name: string;
  inputValue: string;
}

export enum OrderStatusEnum {
  Draft = 11,
  Unconfirmed = 12,
  Confirmed = 13,
  OrderUpdated = 14,
  ReadyForDelivery = 15,
  OutForDelivery = 16,
  Delivered = 17,
  Completed = 18,
  Canceled = 19,
  All = 9999,
}

export enum TermOrderTypeEnum {
  OrderDate = 'order_date',
  DeliveryDate = 'delivery_date',
}

export interface IOrderSupplier {
  id: number | null;
  name?: string;
  is_sync?: boolean;
  status?: IOrderSupplierStatus;
  remote?: IOrderSupplierRemote;
}

export interface IOrderSupplierSelectOption extends IOrderSupplier {
  inputValue: string;
}

export interface IOrderSupplierStatus {
  id: VendorStatusEnum;
  name: string;
}

export interface IOrderStaff {
  id: number;
  name: string;
}

export interface IOrderStatus {
  id: OrderStatusEnum;
  name: string;
  name_vn?: string;
  name_ko?: string;
  sort?: number;
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

export type IOrderProduct = IProduct & {
  warehouse_destination: IWarehouse;
  amount: number;
  vat: number;
  quantity: number;
};

export interface IOrder {
  id: number;
  supplier: IOrderSupplier;
  order_date: Date;
  delivery_date?: string;
  created_by: GeneralOption;
  amount: string;
  note: string;
  total: string;
  vat_amount: string;
  status: IOrderStatus;
  is_single_destination: boolean;
  warehouse_destination: IWarehouse;
  delivery_fee: number;
  payment_method: GeneralOption;
  purchased_note: string;
  last_status_at: string;
  status_time_line: IOrderStatusTimeLine[];
  products: IOrderProduct[];
  approved_status?: IIdName;
}

export interface IOrderVendor {
  id: number;
  name: string;
}

export interface IChangeOrderStatus {
  id: number;
  status: number;
  delivery_at?: string;
  is_discard_inventory?: boolean;
  cancel_reason?: IIdName;
}

interface EditedProduct extends Partial<IOrderProductFromServer> {
  id?: number;
  sku?: string;
  name?: string;
  vat?: number;
  price?: string | number;
  quantity?: string;
  destination_id?: number;
  note?: string;
  sort?: number;
}

export interface OrderDetail {
  id: number;
  status: GeneralOption;
  supplier: ISelectOption;
  note: string;
  payment_method: ISelectOption;
  delivery_fee: number;
  warehouse_destination: IWarehouse;
  is_single_destination: true;
  products: (EditedProduct & {
    warehouse_in: IWarehouse;
    warehouse_out: IWarehouse;
  })[];
}

export interface FormCreateOrder {
  vendor: GeneralOption;
  note: string;
  payment_method: GeneralOption;
  delivery_fee: number;
  is_single_destination: boolean;
  status: OrderStatusEnum;
  products: (Omit<EditedProduct, 'price' | 'quantity'> & {
    price?: number;
    quantity?: number;
  })[];
}

export type FormUpdateOrder = Omit<FormCreateOrder, 'vendor'> & {
  id?: number;
};

export type OrderTermType = {
  from?: string | null;
  to?: string | null;
  type?: TermOrderTypeEnum;
  range?: RangeShortcutType;
};

export interface IEditedProductOfPartner extends Partial<IProduct> {
  id?: number;
  sku?: string;
  name?: string;
  vat?: number;
  price?: string;
  quantity?: string;
  destination_id?: number;
  sort?: number;
  selected_price_id?: number;
  product?: IProductByVendor;
}

export interface IEditedProductOfSale extends Partial<IOrderProductFromServer> {
  id?: number;
  sku?: string;
  name?: string;
  vat?: number;
  price?: string | number;
  quantity?: string;
  warehouse_in?: IWarehouse;
  destination_id?: number;
  sort?: number;
  selected_price_id?: number;
  product?: IProductByVendor;
  note?: string;
}

export interface ISaleOrderDetailAddressHistory {
  id?: null | number;
  city_id?: null | number;
  district_id?: null | number;
  address?: null | string;
  full_address?: null | string;
}

export interface ISaleOrderDetailProductInfoHistory {
  id: number;
  vat: number;
  price: number;
  amount: number;
  quantity: number;
}

export interface ISaleOrderDetailProductHistory {
  items: ISaleOrderDetailProductInfoHistory[];
  action: string;
}

export interface ISaleOrderDetailItemHistory {
  to?: null | number | string | IIdName | ISaleOrderDetailAddressHistory;
  from?: null | number | string | IIdName | ISaleOrderDetailAddressHistory;
  key?: string;
}

export interface IOrderHistory {
  id: number;
  created_at: string;
  staff: string;
  action: IIdName;
  userType: UserTypeEnum;
  detail: {
    order: ISaleOrderDetailItemHistory[];
    product: ISaleOrderDetailProductHistory[];
  };
  products: IIdName[];
}

export interface IOrderInPDFFile {
  id: number;
  status: GeneralOption;
  contact: { name: string; mobile: string };
  vendor: {
    is_sync: boolean;
    status: GeneralOption;
    name: string | null;
    id: number;
    district: GeneralOption;
    city: GeneralOption;
    remote: {
      id: number;
      name: string;
      mobile: string;
      tax_code: string;
      address: string;
      picture: string | null;
      business_type: GeneralOption[];
      district: GeneralOption;
      city: GeneralOption;
      selling_product: GeneralOption[];
      is_disabled: boolean;
      is_deleted: boolean;
      is_inactive: boolean;
    };
    picture: string | null;
  };
  note: string | null;
  payment_method: IPaymentMethodItem;
  amount: number;
  vat_amount: number;
  delivery_fee: number;
  total: number;
  warehouse_destination: GeneralOption;
  is_single_destination: boolean;
  last_status_at: string;
  status_time_line: {
    id: number;
    name: string;
    status: number;
    updated: {
      updated_at: string;
      updated_by: string;
    }[];
  }[];
  products: {
    id: number;
    sku: string | null;
    name: string;
    vat: number;
    price: number;
    quantity: string;
    warehouse_out: GeneralOption | null;
    warehouse_in: GeneralOption | null;
    amount: number;
    image: string;
    default_image: string;
    categories: ICategory[];
    note: string;
    uom: GeneralOption;
    origin: string;
  }[];
  type: number;
  order_date: string;
  expect_delivery: string;
  delivery_address: {
    id: number;
    name: string;
    mobile: string;
    address: string;
    district: GeneralOption;
    city: GeneralOption;
    is_default: boolean;
    mobile_country_code: string | null;
  };
  delivery_at: string;
  created_by: GeneralOption;
}

export enum UserTypeEnum {
  Admin = 3,
  Supplier = 2,
  Buyer = 1,
}

export interface IWaitingApproveOrderResponse {
  waiting_approve: number;
}

export interface ICreateOrderSuccessResponse {
  need_approve: boolean;
  order_id: number;
}

export interface IApproveOrdersInput {
  order_ids: number[];
  is_discard_inventory?: boolean;
}

export interface IUpdateOrderApproveStatusInput {
  id: number;
  status: number;
}

export interface IRequestApproveOrdersInput {
  order_ids: number[];
}

export interface IOrderMessageContact {
  type: IIdName;
  value: string[];
}
