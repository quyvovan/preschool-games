import { Dayjs } from 'dayjs';

// import { IOrderSupplier } from './order';

export interface GeneralOption {
  id: number;
  key?: number;
  name?: string;
  name_ko?: string;
  name_vn?: string;
}

export type ICity = GeneralOption;

export type IDistrict = GeneralOption;

export interface IOption {
  label: string;
  value: string;
  img?: string;
}

export interface IIdLabel {
  label: string;
  id: string | number;
}

export interface ILabelValue {
  label: string;
  value: number;
  img?: string;
}

export interface FormBusinessInformation {
  groupBusiness: BusinessType[];
  groupSellingProduct: SellingProduct[];
  purpose: string[];
}

export interface Business {
  id: number;
  name: string;
  name_ko?: string;
  name_vn?: string;
  sort: number;
}

export type BusinessType = GeneralOption;
export type SellingProduct = GeneralOption;
export type BusinessPlan = GeneralOption;
export type DeleteReasons = GeneralOption;
export type IUoM = GeneralOption;
export type IOrigin = {
  id: number;
  name: string;
  country_code: string;
  iso_code2: string;
  iso_code3: string;
};

export interface IDeleteReasons {
  deletion_reason: GeneralOption;
}

export type ICategory = GeneralOption & {
  sort?: number;
  level?: number;
  children_count?: number;
  child?: {
    id: number;
    name: string;
    child?: {
      id: number;
      name: string;
    };
  };
  picture?: string;
  picture_name?: string;
};

export type IPurpose = ICategory;

export interface ICategoryParam {
  id: number;
  level: number;
  name?: string;
  children_count?: number;
}

export interface IUomListParams {
  locale: 'vi' | 'en' | 'ko';
  search?: string;
}

export interface ICompany {
  id: number;
  name: string;
  picture: string | null;
  business_type: BusinessType[];
  address: string;
  city_id: ICity;
  district_id: IDistrict;
}

export type IEnumToTranslateKey = {
  [key: string]: string;
};

export interface IIdName {
  id: number;
  name: string;
}

export interface IIdFullName {
  id: number;
  full_name: string;
}

export type FilterDateType = {
  from?: string | Dayjs | null;
  to?: string | Dayjs | null;
};

export enum TermTypeEnum {
  All = 0,
  Today = 1,
  ThisMonth = 2,
  PreviousMonth = 3,
  Other = 4,
}

export interface ISelectOption {
  id: number | string;
  label: string;
  isDisabled?: boolean;
}

export interface IMinimumOrderAmountErrors {
  type: number;
  data: IMinimumOrderAmountErrorsData[];
}
export interface IMinimumOrderAmountErrorsData {
  vendor: any;
  minimum_amount: number;
}

export interface IDecimalOptionProductErrors {
  type: number;
  data: number[];
}

export enum VendorRoleEnum {
  All = 9999,
  Sale = 1, // Supplier
  Purchase = 2, // Buyer
  Both = 3,
}

export interface IGetUrlParamsBase<P = undefined, Q = undefined> {
  path: P;
  query: Q;
}

export interface IProgressFloating {
  batch_id: string;
  price_management_id?: number;
}

export interface IMaximumUnpaidAmountErrors {
  type: number;
  data: IMaximumUnpaidAmountErrorsData[];
}

export interface IInventoryOptionErrors {
  type: number;
  data: IMaximumUnpaidAmountErrorsData[];
}

export interface IMaximumUnpaidAmountErrorsData {
  vendor: any;
  unpaid_amount_limit: number;
  current_unpaid_amount: number;
}

export enum ErrorResponseOrderType {
  MinimumAmount = 1,
  UnpaidAmount = 2,
  InventoryOption = 3,
  DecimalOptionProduct = 4,
}
export interface IErrorOrderResponse<T> {
  type?: number;
  data?: T;
}

export interface IRunningProgress {
  id: string;
  name: string;
  totalJobs: number;
  pendingJobs: number;
  processedJobs: number;
  progress: number;
  failedJobs: number;
  options: [];
  createdAt: string;
  cancelledAt: string;
  finishedAt: string;
}

export interface ISystemDownloadModal<T = any> {
  isOpen: boolean;
  data: T;
}

export interface IVat {
  id: number;
  key: number;
  name: string;
}

export interface IAddSelectOption {
  id: number | null;
  name: string;
  inputValue?: string;
}

export interface IErrorLineItem {
  attribute: string;
  message: string;
}

export interface IUploadExcelResponseData {
  uid: string;
  extra_message: string[][];
}

export interface IResponseExcelError {
  line: number;
  errors: Array<IErrorLineItem>[];
}

export interface ISubmitExcelParams {
  uid: string;
}

export interface IPersonInCharge {
  id: number;
  user_name: string;
  full_name: string;
  picture?: string;
  status: IIdName;
}
