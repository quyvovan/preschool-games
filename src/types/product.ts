import { BooleanNumberEnum } from '@/constants';
import {
  GeneralOption,
  ICategoryParam,
  ICity,
  IDistrict,
  IIdName,
  IUoM,
  VendorRoleEnum,
} from './common';
import { IPriceManagementList } from './price-management';
import { IWarehouseItemInProduct } from './sale-order';
import { IVendorCommon } from './vendor';

export enum ProductPurposeEnum {
  PURPOSE_All = 9999,
  PURPOSE_SALE = 1,
  PURPOSE_PURCHASED = 2,
  PURPOSE_BOTH = 3,
  PURPOSE_INACTIVE = 4,
}

export interface IProductPicture {
  id?: number;
  name: string;
  name_original: string;
  url?: string;
  sort?: number;
  is_default?: boolean | number;
  is_category_picture?: boolean;
  category_id?: number;
}

export interface CustomPrice {
  id: number;
  price?: string;
  product_id: number;
}

export interface IProductNameDisplay {
  default: string;
  first_language: string | null;
  second_language: string | null;
}

export interface IProduct {
  id: number;
  product_id: number;
  sku?: string;
  name: string;
  standard: string;
  uom: IUoM;
  in_stock: string;
  purchase_price: string;
  selling_price: string;
  price?: any;
  origin?: string;
  categories: IProductCategory[];
  image: string;
  default_image: string;
  languages: any;
  vat: any;
  isMess?: boolean;
  pictures: IProductPicture[];
  be_purchased: boolean;
  be_sold: boolean;
  purpose: VendorRoleEnum;
  created_at: Date;
  updated_at: Date;
  custom_prices?: CustomPrices[];
  selected_price_id?: number;
  specs: string;
  company_id?: number;
  source?: IIdName;
  vendor: IVendorByProduct | null;
  product_company_id: number;
  price_managements: IPriceManagementList[];
  supplier_price?: number;
  supplier_vat?: number;
  selling_vat?: number;
  brand?: IIdName;
  name_display: IProductNameDisplay;
  be_resell: boolean;
}

export interface ICategoryByInventory {
  id: number;
  name: string;
  child: ICategoryByInventory;
}

export interface IFilterProduct {
  categories: Pick<ICategoryParam, 'children_count' | 'name'>[];
  search: string;
  purpose: number; //  purpose id
}

export interface IFilterSellingProduct {
  search: string;
  id: number;
}

export interface IProductStats {
  product_count: number;
  product_can_be_sold_count: number;
  product_can_be_purchase_count: number;
  selling_price: number;
  purchase_price: number;
}
export interface IProductInformation {
  id?: number;
  name: string | null;
  description: string | null;
  spec: string | null;
  uom: GeneralOption;
}
export interface IPriceManagementListParams {
  id: number;
  price: number;
  vat: number;
  status: number;
}
export interface IAddProductParam {
  id?: number | null;
  pictures: IProduct['pictures'];
  remove_picture_ids?: number[];
  categories: GeneralOption[];
  sku: string | null;
  origin: string | null;
  multiple_language: {
    vn: IProductInformation;
    en: IProductInformation;
    ko: IProductInformation;
  };
  purpose?: number;
  vat?: number | null;
  price?: number;
  price_managements?: IPriceManagementListParams[];
  brand: {
    id: number | null;
    name: string;
  };
  supplier_price: number;
  supplier_vat: number;
  local_supplier_id: number | null;
  is_decimal_quantity?: boolean;
  warehouses?: IStockItem[];
}

export interface IVendorByProduct {
  id: number;
  name?: string;
  alias?: string;
  email: string;
  mobile: string;
  is_sync: boolean;
  status: GeneralOption;
  city: ICity;
  district: IDistrict;
  default_picture?: string;
  picture?: string;
  remote?: {
    id: number;
    name?: string;
    address?: string;
    business_type?: any;
    city_id?: ICity;
    district_id?: IDistrict;
    default_picture?: string;
    picture?: string;
    status: IIdName;
  };
}

export interface IVendorSelling {
  id: number;
  price_id?: number;
  product_id?: number;
  vendor_id?: number;
  vendor: IVendorByProduct;
}

export interface CustomPrices {
  id: number;
  price?: string;
  product_id?: number;
  vendors_selling: IVendorSelling[];
}

export enum ProductGroupTypeEnum {
  Sale = 1,
  Purchase = 2,
}

export enum ProductSourceEnum {
  Own = 1,
  Vendor = 2,
}

export const GET_PRODUCT_LIST_ORDER_BY_VALUE = {
  ADDED_TIME: 'added_time',
  NAME: 'name',
  CUSTOM_ORDER: 'custom_order',
  LAST_UPDATED: 'last_updated',
} as const;

export const GET_PRODUCT_LIST_ORDER_VALUE = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export interface IGetListProductFilter {
  categories?: Pick<ICategoryParam, 'id' | 'level'>[];
  search?: string;
  purpose?: number | string;
  company_ids?: number[];
  is_create_group_sale?: number | string; // 0 | 1 | '0' | '1'
  is_create_group_purchase?: number | string; // 0 | 1 | '0' | '1'
  order_by?: typeof GET_PRODUCT_LIST_ORDER_BY_VALUE[keyof typeof GET_PRODUCT_LIST_ORDER_BY_VALUE];
  order?: typeof GET_PRODUCT_LIST_ORDER_VALUE[keyof typeof GET_PRODUCT_LIST_ORDER_VALUE];
  search_type?: number;
}

export interface ICreateProductGroupRequest {
  type: number;
  name: string;
  description: string;
  products: {
    product_id: number;
    vendor_id: null | number;
  }[];
}

export interface IUpdateProductGroupRequest {
  id: number | string;
  name: string;
  description: string;
  products: {
    product_id: number;
    vendor_id: null | number;
  }[];
}

export interface IGetProductGroupListRequest {
  page?: number;
  limit?: number;
  search?: string;
  type?: number;
  created_by_ids?: number[];
}

export interface IProductGroupListItem {
  id: number;
  name: string;
  description: string | null;
  type: {
    id: number;
    name: string;
  };
  product_counts: number;
  created_at: string;
  created_by: {
    id: number;
    full_name: string;
  } | null;
}

export interface IProductInProductGroupDetail {
  id: number;
  name: string;
  image: string;
  default_image: string;
  company_id: number;
  languages: IResellMultipleLanguage;
  origin: string | null;
  sku: string;
  pictures: IProductPicture[];
  categories: IProductCategory[];
  uom: IIdName;
  specs: string;
  vendor: IVendorByProduct | null;
  vat: any;
  source: any;
  price: any;
  name_display: IResellProduct['name_display'];
  local_supplier: IVendorCommon | null;
}

export interface IProductGroupDetail {
  id: number;
  name: string;
  description: string | null;
  type: {
    id: number;
    name: string;
  };
  products: IProductInProductGroupDetail[];
}

export interface IProductGroupStaff {
  id: number;
  full_name: string;
}

export interface IExportProductResponseData {
  batch_id: string;
  batch_name: string;
  file_url: string;
}
export interface IExportExcelProductData {
  is_all_export: number;
  product_ids: number[];
}

/**
  NOTE: All field have in a product but optional all with any
*/
export interface IProductCommon {
  id: number;
  name: string;
  product_id?: any;
  sku?: any;
  standard?: any;
  uom?: any;
  in_stock?: any;
  origin?: any;
  categories?: any;
  image?: any;
  default_image?: any;
  languages?: any;
  vat?: any;
  pictures?: any;
  be_purchased?: any;
  be_sold?: any;
  purpose?: any;
  created_at?: any;
  updated_at?: any;
  custom_prices?: any;
  selected_price_id?: number;
  specs?: any;
  company_id?: any;
  source?: any;
  vendor?: IVendorCommon | null;
  buyer_number?: any;
  supplier_number?: any;
  purchase_price?: any;
  selling_price?: any;
  price?: any;
  available_stock?: any;
  average_purchase_price?: any;
  company_bank?: any;
  name_display?: any;
  be_resell?: any;
  resell_info?: any;
  supplier_price?: any;
  supplier_vat?: any;
  selling_vat?: any;
  local_supplier?: IVendorCommon | null;
  isDisabled?: boolean;
  custom_order?: null | number;
  // use to detect `resell_info` is for parent product info or children product info
  is_resell_parent?: boolean;
  is_decimal_quantity?: boolean;
}

/**
  NOTE: All field have in a product group but optional all with any
*/
export interface IProductGroupCommon {
  id: number;
  name?: any;
  description?: any;
  type?: any;
  product_counts?: any;
  products: IProductCommon[];
  created_at?: any;
  created_by?: any;
}

export interface IExportProductExcelProgress {
  id: number;
  progressName: string;
  percent: number;
  isError: boolean;
  isDone: boolean;
}

export interface IProductCategory {
  id: number;
  name: string;
  picture_name: string;
  picture: string;
  child: IProductCategory | null;
}

export interface IEditProductSkuRequest {
  id: number;
  sku: string;
}

export interface IUploadProductImageResponse {
  name: string;
  name_original: string;
  url: string;
}

export interface IProductPriceManagementRequest {
  id: number;
  price: number;
  status: number;
  vat: number;
}

export interface IResellMultipleLanguage {
  vn: {
    description: string | null;
    id: number;
    name: string;
    spec: string | null;
  };
  en: {
    description: string | null;
    id: number;
    name: string | null;
    spec: string | null;
  };
  ko: {
    description: string | null;
    id: number;
    name: string | null;
    spec: string | null;
  };
}

export interface IUpdateResellProductRequest {
  id: number;
  resell_product_id: number | null;
  is_customize_info?: BooleanNumberEnum;
  is_using_picture?: BooleanNumberEnum;
  is_resell: BooleanNumberEnum;
  sku?: string;
  origin?: string | null;
  vat?: number;
  price?: number;
  price_managements?: IProductPriceManagementRequest[];
  multiple_language?: {
    vn: {
      description: string;
    };
    en: {
      description: string;
    };
    ko: {
      description: string;
    };
  };
  pictures?: IProductPicture[];
  brand?: {
    id: number | null;
    name: string;
  } | null;
  purpose: number;
  is_decimal_quantity?: boolean;
}

export interface IGetBrandRequest {
  search?: string;
}

export interface IBrandResponse {
  id: number;
  name: string;
}

export interface IResellUom {
  id: number;
  name: string;
  name_ko: string;
  name_vn: string;
}

export interface IResellPicture {
  id?: number;
  name: string;
  name_original: string;
  url?: string;
  sort?: number;
  is_default?: BooleanNumberEnum;
  is_category_picture?: boolean;
  category_id?: number;
}

export interface IResellProduct {
  id: number;
  name: string;
  brand: IIdName | null;
  categories: IProductCategory[];
  company_id: number;
  price_managements?: IPriceManagementList[];
  languages: IResellMultipleLanguage;
  origin: string | null;
  pictures: IResellPicture[];
  price: number;
  sku: string | null;
  purpose: number;
  uom: IResellUom;
  vat: number;
  resell_info: IResellProduct | null;
  source?: IIdName;
  name_display: IProductNameDisplay;
  be_purchased: boolean;
  be_sold: boolean;
  be_resell: boolean;
  supplier_price?: number;
  supplier_vat?: number;
  selling_vat?: number;
  selling_price?: number;
  vendor: IVendorByProduct | null;
  is_customize_info: boolean;
  is_using_picture: boolean;
  default_image: string;
  image: string | null;
  type: IIdName[];
  specs: string | null;
  is_empty_stock?: boolean;
  available_stock?: number;
  average_purchase_price?: number;
  product_company_id?: number;
  // use to detect `resell_info` is for parent product info or children product info
  is_resell_parent?: boolean;
  local_supplier: IVendorCommon | null;
  is_decimal_quantity: boolean;
  warehouses?: IStockItem[];
}

export interface IStockItem extends IWarehouseItemInProduct {
  is_default: boolean;
}

export interface IQuickUpdateProductRequest {
  id: number;
  sku?: string;
  origin?: string;
  purpose?: number;
  vat?: number;
  price?: number;
  supplier_price?: number;
  supplier_vat?: number;
  brand?: {
    id: number | null;
    name: string;
  };
  uom?: IIdName;
  spec?: IIdName;
  local_supplier_id?: number;
}

export interface IGetProductCustomOrderListRequest {
  page?: number;
  limit?: number;
  order_by?: 'custom_order';
  order?: 'asc' | 'desc';
  search?: string;
}

export interface IUpdateProductCustomOrderRequest {
  product_id: number;
  custom_order: number;
}

export interface IDeleteProductResponse {
  batch_id: string;
  batch_name: string;
}

export interface IDeleteProductProgress {
  id: string;
  name: string;
  progress: number;
  isFailedJob: boolean;
}

export enum ProductFilterEnum {
  All = 1,
  Linked = 2,
  Internal = 3,
  Group = 4,
}

export enum ProductSearchTypeEnum {
  ProductName = 1,
  ProductSku = 2,
}
