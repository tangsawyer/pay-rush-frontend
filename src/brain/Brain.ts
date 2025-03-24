import {
  BodyUploadInvoice,
  CheckHealthData,
  GetInvoiceStatsData,
  ListInvoicesData,
  UploadInvoiceData,
  UploadInvoiceError,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Brain<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   *
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  check_health = (params: RequestParams = {}) =>
    this.request<CheckHealthData, any>({
      path: `/_healthz`,
      method: "GET",
      ...params,
    });

  /**
   * @description List all invoices
   *
   * @tags dbtn/module:invoices
   * @name list_invoices
   * @summary List Invoices
   * @request GET:/routes/invoices
   */
  list_invoices = (params: RequestParams = {}) =>
    this.request<ListInvoicesData, any>({
      path: `/routes/invoices`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get invoice statistics
   *
   * @tags dbtn/module:invoices
   * @name get_invoice_stats
   * @summary Get Invoice Stats
   * @request GET:/routes/invoices/stats
   */
  get_invoice_stats = (params: RequestParams = {}) =>
    this.request<GetInvoiceStatsData, any>({
      path: `/routes/invoices/stats`,
      method: "GET",
      ...params,
    });

  /**
   * @description Upload an invoice file
   *
   * @tags dbtn/module:invoices
   * @name upload_invoice
   * @summary Upload Invoice
   * @request POST:/routes/invoices/upload
   */
  upload_invoice = (data: BodyUploadInvoice, params: RequestParams = {}) =>
    this.request<UploadInvoiceData, UploadInvoiceError>({
      path: `/routes/invoices/upload`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
}
