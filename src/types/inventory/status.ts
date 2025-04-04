import { GeneralOption } from '../common';

export type IStatusWarehouse = GeneralOption;

export type IStatusOrigin = GeneralOption;

export type IStatusSpecs = GeneralOption;

export type IStatusUom = GeneralOption;

export interface IInventoryStatusItem {
  id: number;
  warehouse: IStatusWarehouse;
  sku: string | null;
  origin: IStatusOrigin;
  product_name: string;
  specs: IStatusSpecs | null;
  uom: IStatusUom | null;
  beginning_quantity: number;
  in_quantity: number;
  out_quantity: number;
  ending_quantity: number;
}

export interface IExportInventoryStatusParams {
  warehouse_ids: number[];
  product_ids: number[];
  term: { from: string; to: string } | null;
}
