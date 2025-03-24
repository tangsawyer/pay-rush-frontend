import brain from "brain";
import { InvoiceData, StatsResponse } from "types";

/**
 * Fetch all invoices from the API
 */
export const getInvoices = async (): Promise<InvoiceData[]> => {
  try {
    const response = await brain.list_invoices();
    const data = await response.json();
    return data.invoices;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return [];
  }
};

/**
 * Fetch invoice statistics from the API
 */
export const getInvoiceStats = async (): Promise<StatsResponse | null> => {
  try {
    const response = await brain.get_invoice_stats();
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching invoice stats:", error);
    return null;
  }
};

/**
 * Upload an invoice file to the API
 * @param file The file to upload
 */
export const uploadInvoice = async (file: File): Promise<InvoiceData | null> => {
  try {
    // The API expects a file object in a form data format
    // but the brain client will handle that for us when we use ContentType.FormData
    
    // Simply pass the file in the appropriate object structure
    const response = await brain.upload_invoice({ file });
    
    // Check if we got a successful response
    if (!response.ok) {
      console.error("Upload failed with status:", response.status);
      return null;
    }
    
    const data = await response.json();
    return data.invoice;
  } catch (error) {
    console.error("Error uploading invoice:", error);
    return null;
  }
};
