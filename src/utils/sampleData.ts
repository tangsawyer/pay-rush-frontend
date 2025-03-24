import { InvoiceData } from "types";

// Sample invoice data for development and testing
export const sampleInvoices: InvoiceData[] = [
  {
    id: "1",
    fournisseur: "EDF",
    montant: "150 €",
    statut: "Payé",
    filename: "edf-facture.pdf",
    file_size: 245000,
    upload_date: "2025-03-20 14:30:00"
  },
  {
    id: "2",
    fournisseur: "Adobe",
    montant: "50 €",
    statut: "En attente",
    filename: "adobe-subscription.pdf",
    file_size: 125000,
    upload_date: "2025-03-21 09:15:00"
  },
  {
    id: "3",
    fournisseur: "Orange",
    montant: "75 €",
    statut: "En attente",
    filename: "orange-internet.pdf",
    file_size: 198000,
    upload_date: "2025-03-22 11:45:00"
  },
  {
    id: "4",
    fournisseur: "SFR",
    montant: "45 €",
    statut: "Payé",
    filename: "sfr-mobile.pdf",
    file_size: 167000,
    upload_date: "2025-03-18 16:20:00"
  },
  {
    id: "5",
    fournisseur: "Spotify",
    montant: "9.99 €",
    statut: "Payé",
    filename: "spotify-premium.pdf",
    file_size: 89000,
    upload_date: "2025-03-15 10:05:00"
  }
];
