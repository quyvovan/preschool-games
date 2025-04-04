import { GeneralOption, IIdName } from './common';

export interface IStaffActivityLog {
  id: number;
  staff_status?: GeneralOption;
  staff: IStaff;
  user_name?: string;
  role?: string;
  feature: IIdName;
  detail: {
    template: string;
    params: any;
  };
  action_date: string;
}
interface IStaff {
  id: number;
  name: string;
  email: string;
  role: IIdName;
  status: IIdName;
}

export interface IFilterActivityLog {
  status?: number;
  feature?: number;
  from?: string;
  to?: string;
  staff?: number[];
  role?: number;
}

export interface IActivityLogRequest extends IFilterActivityLog {
  page?: number;
  limit?: number;
  search?: string;
}
