export interface IWarehouse {
  id: number;
  name: string;
  is_default: number;
  products_count: number;
  created_at: string;
  updated_at: string;
  purchase_value: string;
  selling_value: string;
  resell_product_number: number;
}
export interface IAdjustInventoryReason {
  id: number;
  name: string;
}

export interface IAdjustStockProduct {
  quantity?: number;
  purchase_price?: number;
  product_id?: number;
}
export interface IAdjustStockParams {
  warehouseId?: number;
  data: {
    adjust_reason_id?: number;
    adjust_note?: string;
    adjust_stock?: IAdjustStockProduct[];
    is_discard_inventory: boolean;
  };
}
export interface ITransferWarehouseParams {
  note?: string;
  is_all?: boolean;
  destination_id?: number;
  transfer_stock?: {
    product_id: number;
    destination_id: number;
    quantity: number;
  }[];
}
export interface IInventoryHistoryWarehouse {
  id: number;
  name: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface IDownloadImportInventoryTemplateResponse {
  batch_id: string;
  batch_name: string;
  file_url: string;
  type: string;
}
