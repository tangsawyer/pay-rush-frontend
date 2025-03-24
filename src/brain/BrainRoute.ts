import {
  BodyUploadInvoice,
  CheckHealthData,
  GetInvoiceStatsData,
  ListInvoicesData,
  UploadInvoiceData,
} from "./data-contracts";

export namespace Brain {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  export namespace check_health {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CheckHealthData;
  }

  /**
   * @description List all invoices
   * @tags dbtn/module:invoices
   * @name list_invoices
   * @summary List Invoices
   * @request GET:/routes/invoices
   */
  export namespace list_invoices {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListInvoicesData;
  }

  /**
   * @description Get invoice statistics
   * @tags dbtn/module:invoices
   * @name get_invoice_stats
   * @summary Get Invoice Stats
   * @request GET:/routes/invoices/stats
   */
  export namespace get_invoice_stats {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetInvoiceStatsData;
  }

  /**
   * @description Upload an invoice file
   * @tags dbtn/module:invoices
   * @name upload_invoice
   * @summary Upload Invoice
   * @request POST:/routes/invoices/upload
   */
  export namespace upload_invoice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BodyUploadInvoice;
    export type RequestHeaders = {};
    export type ResponseBody = UploadInvoiceData;
  }
}
