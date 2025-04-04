import { IIdName } from './common';
import { IProductNameDisplay } from './product';

export interface ICategoryItem {
  id: number;
  name: string;
  child: ICategoryItem | null;
}

export interface IProductItem {
  id: number;
  name: string;
  image?: string;
  default_image: string;
  categories: ICategoryItem[];
  status: IIdName;
  uom: string;
  origin: string | null;
  specs: string;
  vat: number;
  price: number;
  sku: string;
  source: IIdName;
  name_display: IProductNameDisplay;
}

export interface IPriceManagementProductDetail {
  id: number;
  name: string;
  image?: string;
  default_image: string;
  categories: ICategoryItem[];
  uom: string;
  origin: string | null;
  specs: string;
  vat: number;
  price: number;
  sku: string;
  source: IIdName;
}

export interface IPriceManagementDetail {
  id: number;
  name: string;
  description?: string;
  is_with_default_product: boolean;
  is_default: boolean;
  products: IProductItem[];
  vendors: IPriceManagementVendorDetail[];
}
export interface ITargetBuyersItemInfo {
  id: string | number;
  name: string;
  image_url: string;
  address: string[];
  pricelistName: string;
}

export interface IGetPriceManagementListRequest {
  page?: number | string;
  limit?: number | string;
  search?: string;
  vendor_ids?: number[];
}

export interface IPriceManagementVendorDetail {
  id: number;
  name: string | null;
  is_sync: boolean;
  price_management: null | {
    description: string;
    id: number;
    is_with_default_product: boolean;
    name: string;
  };
  status: {
    id: number;
    name?: string;
  };
  remote?: {
    id: number;
    name?: string;
    is_disabled: boolean;
    picture: null | string;
    business_type?: IIdName[];
    city_id: IIdName;
    district_id: IIdName;
  };
}

export interface IPriceManagementListItem {
  id: number;
  name: string | null;
  description?: string;
  vendors: IPriceListVendor[];
  on_sale: number;
  on_hidden: number;
  total_vendor: number;
  is_default: boolean;
}

export interface IPriceManagementList {
  id: number;
  name: string | null;
  description?: string;
  vendors: IPriceListVendor[];
  price: number;
  vat: number;
  status: IIdName;
}

export interface IProductPriceList {
  id: number;
  name: string | null;
  description?: string;
  vendors: IPriceListVendor[];
  on_sale: number;
  on_hidden: number;
  total_vendor: number;
  vat: number;
  price: string | number;
  status: IIdName;
}

export interface IPriceListVendor {
  id: number;
  name: string | null;
  is_sync: boolean;
  remote: IPriceListPartner | null;
  status: IIdName;
}

export interface IPriceListPartner {
  id: number;
  name: string | null;
  picture: string | null;
  address: string | null;
  city_id: IIdName;
  district_id: IIdName;
  selling_product: IIdName[] | null;
  business_type: IIdName[] | null;
}

export interface IGetPriceManagementVendorRequest {
  page?: number | string;
  limit?: number | string;
  search?: string;
  ids?: number[];
  exclude_ids?: number[];
}

export interface IGetPriceManagementProductRequest {
  page?: number | string;
  limit?: number | string;
  id: number;
  search?: string;
  add_product_ids?: number[];
}

export interface ICreatePriceManagementActionRequest {
  name: string;
  description: string;
  is_with_default_product: boolean;
  vendor_ids: (number | string)[];
  products: {
    id: number;
    vat: number;
    price: number;
    status: number;
  }[];
}

export interface IUpdatePriceManagementActionRequest {
  id: number | string;
  name: string;
  description: string;
  is_with_default_product: boolean;
  add_vendor_ids: (string | number)[];
  remove_vendor_ids: (string | number)[];
  add_products: {
    id: number;
    vat: number;
    price: number;
    status: number;
  }[];
  update_products: {
    id: number;
    vat: number;
    price: number;
    status: number;
  }[];
  remove_product_ids: (string | number)[];
  clear_all_old_vendors: boolean;
  clear_all_old_products: boolean;
}

export interface IGetListVendorApplyPriceListDetailRequest {
  id: number | string;
  add_vendor_ids?: number[];
  remove_vendor_ids?: number[];
}

export interface IGetPriceManagementBatchRequest {
  batchId: string;
}

export interface IPriceManagementBatchByBatchId {
  batch_id: string;
  name: string;
  price_management_id?: number;
  type: string;
}

export interface IGetPriceManagementBatch {
  id: string;
  name: string;
  totalJobs: number;
  pendingJobs: number;
  processedJobs: number;
  progress: number;
  failedJobs: number;
}

export interface IExportPriceManagementResponseData {
  batch_id: string;
  batch_name: string;
  file_url: string;
  type: string;
}
