export interface IPaymentHistoryStatus {
  id: number;
  name: string;
}

export interface IPaymentHistoryReceiver {
  id: number;
  name: string;
}

export interface IBuyerDepositDetail {
  id: number;
  amount: number;
  date: string;
  received_by: IPaymentHistoryReceiver;
  note: string;
}
export interface IBuyerAdjustmentDetail {
  id: number;
  type: number;
  amount: number;
  date: string;
  received_by: IPaymentHistoryReceiver;
  note: string;
}

export interface IPaymentDetailListItem {
  id: number;
  no: number;
  action: string;
  amount: number;
  balance: number;
  received_by: string;
  updated_by: string;
  date: string;
}

export interface IPaymentHistoryListItem {
  id: number;
  vendor_id: number;
  vendor_name: string;
  revenue: number;
  deposit: number;
  adjustment: number;
  receivable: number;
  last_updated_at: string;
  status: {
    id: number;
    name: string;
  };
}

export interface IPaymentHistorySummaryInfo {
  revenue: number;
  receivable: number;
  deposit: number;
  adjustment: number;
}

export interface IGetPaymentHistoryListRequest {
  page?: number | string;
  limit?: number | string;
  status: number;
  vendor_ids?: number[];
  term?: {
    from: string;
    to: string;
  };
}

export interface IPaymentHistoryDetailListItem {
  id: number;
  payment_history_id: number;
  type: {
    id: number;
    name: string;
  };
  amount: number;
  balance: number;
  inputted_date: string;
  received_by: string;
  updated_by: string;
  note: string;
}

export interface IPaymentHistoryActionDetail {
  id: number;
  payment_history_id: number;
  type: {
    id: number;
    name: string;
  };
  amount: number;
  inputted_date: string;
  received_by: {
    id: number;
    full_name: string;
  };
  note: string;
}

export interface IGetPaymentHistoryDetailRequest {
  id: number | string;
  page?: number | string;
  limit?: number | string;
  updater_ids: number[];
  receiver_ids: number[];
  term?: {
    from: string;
    to: string;
  };
}

export interface ICreatePaymentHistoryActionRequest {
  id: number | string;
  type: number;
  amount: number;
  inputted_date: string;
  received_by: number;
  note: string;
}

export interface IUpdatePaymentHistoryActionRequest {
  id: number | string;
  actionId: number | string;
  amount: number;
  inputted_date: string;
  received_by: number;
  note: string;
}

export interface IBuyerListItem {
  id: number;
  name?: string | null;
  is_sync: boolean;
  status: {
    id: number;
    name?: string;
  };
  remote?: {
    id: number;
    name?: string;
    is_disabled: boolean;
  };
}

export interface IBuyerDetail {
  id: number;
  name?: string | null;
  is_sync: boolean;
  status: {
    id: number;
    name?: string;
  };
  remote?: {
    id: number;
    name?: string;
    is_disabled: boolean;
  };
}

export interface IGetBuyerListRequest {
  page?: number | string;
  limit?: number | string;
  search?: string;
  ids?: number[];
}

export interface IStaffListItem {
  id: number;
  full_name: string;
}

export interface IGetStaffListRequest {
  page?: number | string;
  limit?: number | string;
  search?: string;
  is_with_trashed: number | string;
}

export interface IGetPaymentHistoryListSummaryInfoRequest {
  status: number;
  vendor_ids?: number[];
  term?: {
    from: string;
    to: string;
  };
}

export interface IGetPaymentHistoryDetailSummaryInfoRequest {
  id: number | string;
  term?: {
    from: string;
    to: string;
  };
}

export interface IGetPaymentHistoryActionDetailRequest {
  id: number | string;
  actionId: number | string;
}

export interface IGetPaymentHistoryListExcelRequest {
  status: number | string;
  vendor_ids?: (number | string)[];
  term?: {
    from: string;
    to: string;
  };
}

export interface IGetPaymentHistoryDetailExcelRequest {
  id: number | string;
  updater_ids?: (number | string)[];
  receiver_ids?: (number | string)[];
  term?: {
    from: string;
    to: string;
  };
}
