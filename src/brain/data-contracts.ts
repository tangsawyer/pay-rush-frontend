/** Body_upload_invoice */
export interface BodyUploadInvoice {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HealthResponse */
export interface HealthResponse {
  /** Status */
  status: string;
}

/** InvoiceData */
export interface InvoiceData {
  /** Id */
  id: string;
  /** Fournisseur */
  fournisseur: string;
  /** Montant */
  montant: string;
  /** Statut */
  statut: string;
  /** Filename */
  filename: string;
  /** File Size */
  file_size: number;
  /** Upload Date */
  upload_date: string;
}

/** InvoiceListResponse */
export interface InvoiceListResponse {
  /** Invoices */
  invoices: InvoiceData[];
}

/** InvoiceUploadResponse */
export interface InvoiceUploadResponse {
  /** Message */
  message: string;
  invoice: InvoiceData;
}

/** StatsResponse */
export interface StatsResponse {
  /** Total Paid */
  total_paid: number;
  /** Total Amount */
  total_amount: number;
  /** Total Invoices */
  total_invoices: number;
  /** Pending Invoices */
  pending_invoices: number;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type CheckHealthData = HealthResponse;

export type ListInvoicesData = InvoiceListResponse;

export type GetInvoiceStatsData = StatsResponse;

export type UploadInvoiceData = InvoiceUploadResponse;

export type UploadInvoiceError = HTTPValidationError;
