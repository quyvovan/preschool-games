import { BooleanNumberEnum } from '@/constants';
import { ProductNameDisplayModeEnum } from '@/constants/company';
import { LocaleEnum } from '@/utils';
import { BusinessType, IIdName, SellingProduct } from './common';

interface IGeneralStatus {
  key: number;
  name: string;
}

export enum CompanyNameStatusEnum {
  un_verified,
  verified,
}

// BE confirm 18/10/2022
interface INameStatus {
  key: CompanyNameStatusEnum;
  name: string;
}

export interface IGeneralType {
  id: number;
  name: string;
}

interface IERCDocument {
  company_id: number;
  document_name: string;
  document_url: string;
  id: number;
}

export interface ICompanyAccount {
  code: string;
  address: string;
  address_status: IGeneralStatus;
  business_type: IGeneralType[];
  selling_product: IGeneralType[];
  city_id: IGeneralType;
  district_id: IGeneralType;
  erc_documents: IERCDocument[];
  id: number;
  mobile: string;
  mobile_status: IGeneralStatus;
  name: string;
  name_status: IGeneralStatus;
  picture: any | null;
  plan: IGeneralType;
  tax_code: any | null;
  tax_code_status: INameStatus;
}

export interface ICompanyParam {
  remove_picture?: boolean;
  name?: string;
  tax_code?: string;
  mobile?: string;
  remove_erc_ids?: any[];
  city_id?: number;
  district_id?: number;
  address?: string;
  business_type?: BusinessType[];
  selling_product?: SellingProduct[];
}

export interface IDeliverySchedule {
  week_day: number;
  is_enabled: boolean;
  range: {
    to: string;
    from: string;
  }[];
}

export interface IDeliveryArea {
  is_enabled: boolean;
  city: {
    id: number;
    name: string;
  };
  district_ids: number[];
}

export interface IMinimumOrderAmount {
  is_enabled: boolean;
  amount: number | string;
}

export interface IDeliveryAreaRequest {
  is_enabled: boolean;
  city_id: number;
  district_ids: number[];
}

export interface IStoreSetting {
  delivery_area: IDeliveryArea[];
  delivery_schedule: IDeliverySchedule[];
  minimum_order_amount: IMinimumOrderAmount;
  inventory_option: IIdName;
  maximum_unpaid_amount: IUnpaidAmount;
}

export interface IUpdateDeliveryAreaRequest {
  area: IDeliveryAreaRequest[];
}

export interface IUpdateScheduleInventoryRequest {
  schedule: IDeliverySchedule[];
}

export interface IContactInformation {
  id: number;
  name: string;
  mobile: string;
  mobile_country_code?: string;
  email: string;
  position: string;
  note: string | null;
}

export interface IAddContactInformationRequest {
  name: string;
  mobile: string;
  email: string;
  position: string;
  note: string;
}

export interface IUpdateContactInformationRequest {
  id: number;
  name: string;
  mobile: string;
  email: string;
  position: string;
  note: string;
}

export interface ICompanyBankInformation {
  id: number;
  fullname: string;
  bankName: IIdName;
  accountNumber: string;
  isDefault: boolean;
}

export interface ICompanyBankInformationResponse {
  id: number;
  name: string;
  bank: IIdName;
  bank_account: string;
  is_default: boolean;
}

export interface IAddUpdateBankInformationRequest
  extends Omit<ICompanyBankInformationResponse, 'id' | 'bank'> {
  id?: number;
  bank: {
    id: number | null;
    name: string;
  };
}

export interface IGetListCompanyBankInformationRequest {
  page?: number;
  default?: BooleanNumberEnum;
  limit?: number;
}

export interface IProductDisplayNameResponse {
  type: ProductNameDisplayModeEnum;
  first_language: LocaleEnum;
  second_language: LocaleEnum | null;
}

export interface IMenuDisplaySettingResponse {
  id: number;
  code: string;
  name: string;
  is_enable: boolean;
  features: {
    code: string;
    name: string;
    is_enable: boolean;
  }[];
}

export interface IGetSystemSettingResponse {
  product_name_display: IProductDisplayNameResponse;
  menu_display: IMenuDisplaySettingResponse[];
}

export interface IUpdateProductNameDisplaySettingRequest {
  type: number;
  first_language: LocaleEnum;
  second_language: LocaleEnum | null;
}

export interface IMinimumOrderAmountRequest {
  is_enabled: boolean;
  amount: number;
}

export interface IUnpaidAmount {
  is_enabled: boolean;
  amount: number;
}

export interface IUpdateMaximumUnpaidAmountRequest {
  is_enabled: boolean;
  amount: number;
}

export interface IProductNameDisplaySetting {
  type: ProductNameDisplayModeEnum;
  firstLanguage: LocaleEnum;
  secondLanguage: LocaleEnum | null;
}

export interface IMenuDisplaySetting {
  [key: string]: {
    is_enable: boolean;
    features: {
      [key: string]: {
        is_enable: boolean;
      };
    };
  };
}

export interface IUpdateInventoryOptionRequest {
  inventory_option: number;
}
