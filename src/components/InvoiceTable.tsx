import React from "react";
import { InvoiceData } from "types";

interface Props {
  invoices: InvoiceData[];
  loading?: boolean;
  emptyMessage?: string;
}

export function InvoiceTable({ 
  invoices, 
  loading = false, 
  emptyMessage = "Aucune facture trouvée. Téléchargez votre première facture."
}: Props) {
  return (
    <div className="border border-[#E0E0E0] rounded-lg overflow-hidden shadow-sm bg-white">
      <div className="p-4 border-b border-[#E0E0E0] bg-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-black">Factures récentes</h2>
        {loading && <span className="text-sm text-gray-500 flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Chargement...
        </span>}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead className="bg-gray-50 border-b border-[#E0E0E0]">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-600">Fournisseur</th>
              <th className="text-left p-4 font-semibold text-gray-600">Montant</th>
              <th className="text-left p-4 font-semibold text-gray-600">Statut</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-[#E0E0E0] hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{invoice.fournisseur}</td>
                  <td className="p-4 text-[#42A5F5] font-medium">{invoice.montant}</td>
                  <td className="p-4">
                    <span 
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        invoice.statut === "Payé" 
                          ? "bg-[#4CAF50] bg-opacity-10 text-[#4CAF50]" 
                          : "bg-[#FFC107] bg-opacity-10 text-[#FFC107]"
                      }`}
                    >
                      {invoice.statut}
                    </span>
                  </td>
                </tr>
              ))
            ) : loading ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500 bg-gray-50 bg-opacity-50">
                  Chargement des factures...
                  <div className="flex justify-center mt-3">
                    <svg className="animate-spin h-6 w-6 text-[#42A5F5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {emptyMessage}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
