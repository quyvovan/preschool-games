import { GeneralOption } from './common';

export interface ContactUsParams {
  company_name: string;
  name: string;
  mobile: string;
  email: string;
  comments: string;
}

export interface IBookDemoParams {
  name: string;
  mobile: string;
  email: string;
  company_name: string;
  company_address: string;
  business_type: GeneralOption[];
  schedule_type: number;
  schedule_time: string;
}
