export interface IAddressAreaGeneral {
  id: number;
  name: string;
}

export interface IEditDeliveryAddressRequest extends IDeliveryAddressRequest {
  id: number | string;
}

export interface IDeliveryAddress {
  id: number;
  name: string;
  mobile: string;
  mobile_country_code?: string;
  address: string;
  district: IAddressAreaGeneral;
  city: IAddressAreaGeneral;
  is_default: boolean;
}

export interface IDeliveryAddressRequest {
  name: string;
  mobile: string;
  address: string;
  city_id: IAddressAreaGeneral['id'];
  district_id: IAddressAreaGeneral['id'];
  is_default: boolean;
}

export interface IPartnerDeliveryAddress {
  id: number;
  name: string;
  mobile: string;
  mobile_country_code?: string;
  address: string;
  district: IAddressAreaGeneral;
  city: IAddressAreaGeneral;
  is_default: boolean;
  delivery_fee: number;
}

export interface IGetDeliveryAddressListRequest {
  page?: number;
  limit?: number;
  default?: 0 | 1;
}
