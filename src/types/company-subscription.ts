export interface ICompanyCurrentSubscription {
  plan_name: string;
  period: number;
  is_expiration_date_unlimited: number;
  start_date: string;
  expiration_date: null | string;
  day_left: number;
  is_exists_payment_awaiting: boolean;
  is_exists_waiting_plan: boolean;
  is_plan_trial: boolean;
  plan_id: number;
  is_exists_trial_supplier_plan: boolean;
}

export interface ICompanySubscriptionPlanFeature {
  id: number;
  name: string;
  plan_feature: {
    id: number;
    value: string | boolean;
    type: 'unlimited' | 'boolean' | 'n/a';
    plan: {
      id: number;
      name: string;
    };
  }[];
}

export interface ISubscriptionRequestResponse {
  purpose: number;
  plan_id: number;
  status: number;
  company_id: number;
  updated_at: string;
  created_at: string;
  id: number;
}
