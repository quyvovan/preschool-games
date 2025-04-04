import { BooleanNumberEnum } from '@/constants';
import { IWarehouse } from '@/types/inventory/warehouse';
import { CustomPrice, IProduct } from '@/types/product';
import { GeneralOption, ICategory, IIdName, VendorRoleEnum } from './common';
import {
  IOrderStatus,
  IOrderStatusTimeLine,
  IOrderSupplier,
  OrderStatusEnum,
} from './order';

export interface IOrderProductFromServer {
  id: number;
  product_id: number;
  sku: string;
  name: string;
  standard: string;
  uom: any;
  in_stock: string;
  purchase_price: string;
  selling_price: string;
  price?: any;
  origin?: string;
  categories: ICategory[];
  image: string;
  default_image: string;
  languages: any;
  vat: any;
  isMess?: boolean;
  pictures: {
    id?: number;
    name: string;
    name_original: string;
    url?: string;
    sort?: number;
    is_default?: boolean;
  }[];
  be_purchased: boolean;
  be_sold: boolean;
  purpose: VendorRoleEnum;
  created_at: Date;
  updated_at: Date;
  custom_price?: CustomPrice;
  selected_price_id?: number;
  specs: string;
}

export type IPurchaseOrderProduct = IProduct & {
  warehouse_destination: IWarehouse;
  amount: number;
  vat: number;
  quantity: number;
  origin: string;
  uom: GeneralOption;
};

export interface IPurchaseOrder {
  id: number;
  supplier: IOrderSupplier;
  order_date: Date;
  delivery_date?: any;
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
  products: IPurchaseOrderProduct[];
  approved_status?: IIdName;
}

export interface IPurchaseVendor {
  id: number;
  name: string;
}

interface ISelectOption {
  id: number | null;
  name: string;
  inputValue: string;
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

export interface PurchaseOrderDetail {
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

export interface FormCreatePurchaseOrder {
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

export interface IGetListPurchaseVendorRequest {
  page?: number;
  limit?: number;
  search?: string;
  purposes: number[];
  status?: number;
  is_with_trashed?: BooleanNumberEnum;
}
