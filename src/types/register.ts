import { BusinessType, SellingProduct } from './common';

interface UserAccount {
  mobile: string;
  mobile_country_code: string;
  user_name: string;
  password: string;
  password_confirmation: string;
}
interface PersonalInformation {
  full_name: string;
  email: string;
}
interface CompanyInformation {
  name: string;
  mobile: string;
  email: string;
  city_id: string;
  district_id: string;
  address: string;
}

export interface RegisterParams {
  user_account: UserAccount;
  personal_information: PersonalInformation;
  company_information: CompanyInformation;
  business_information: {
    business_type: BusinessType[];
    selling_product: SellingProduct[];
    plan_id: number;
  };
}
