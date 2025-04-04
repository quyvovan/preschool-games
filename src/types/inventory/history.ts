import { GeneralOption } from '../common';

export type IHistoryWarehouse = GeneralOption;

export type IHistoryTransactionType = GeneralOption;

export type IHistoryOperationType = GeneralOption;

export type IHistoryStaff = GeneralOption;

export type IHistoryOrigin = GeneralOption;

export type IHistorySpecs = GeneralOption;

export type IHistoryUom = GeneralOption;

export interface IInventoryHistoryItem {
  id: number;
  warehouse: IHistoryWarehouse;
  transaction_type: IHistoryTransactionType;
  operation_type: IHistoryOperationType;
  sku: string | null;
  origin: IHistoryOrigin;
  product_name: string;
  specs: IHistorySpecs;
  uom: IHistoryUom;
  standard: string | null;
  unit: string;
  quantity: number;
  closing_stock: number;
  staff: IHistoryStaff;
  reason: string;
  created_at: Date;
}

export interface IExportInventoryHistoryParams {
  warehouse_ids: number[];
  product_ids: number[];
  term: { from: string; to: string } | null;
  staff_ids: number[];
  transaction_type_id: number;
}
