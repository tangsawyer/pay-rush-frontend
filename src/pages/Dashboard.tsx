import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "components/FileUpload";
import { InvoiceTable } from "components/InvoiceTable";
import { getInvoices, getInvoiceStats } from "utils/invoiceService";
import { InvoiceData, StatsResponse } from "types";
import { sampleInvoices } from "utils/sampleData";


export default function Dashboard() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<string>("");

  // Fetch invoices and stats on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch invoices and stats in parallel
        const [invoicesData, statsData] = await Promise.all([
          getInvoices(),
          getInvoiceStats()
        ]);
        
        // Use sample data if no real invoices are available yet
        const invoicesToUse = invoicesData.length > 0 ? invoicesData : sampleInvoices;
        setInvoices(invoicesToUse);
        
        // Use real stats if available, otherwise calculate from sample data
        if (statsData && statsData.total_invoices > 0) {
          setStats(statsData);
        } else {
          // Calculate stats from sample data
          const totalPaid = sampleInvoices.filter(inv => inv.statut === "Payé").length;
          const pendingInvoices = sampleInvoices.filter(inv => inv.statut === "En attente").length;
          const totalAmount = sampleInvoices.reduce((sum, inv) => {
            const amount = parseFloat(inv.montant.replace("€", "").trim());
            return isNaN(amount) ? sum : sum + amount;
          }, 0);
          
          setStats({
            total_paid: totalPaid,
            pending_invoices: pendingInvoices,
            total_invoices: sampleInvoices.length,
            total_amount: totalAmount
          });
        }
        
        setError("");
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Impossible de charger les données. Veuillez réessayer plus tard.");
        
        // Fallback to sample data on error
        setInvoices(sampleInvoices);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle new uploaded invoice
  const handleUploadSuccess = (newInvoice: InvoiceData) => {
    // Show success message
    setUploadSuccess(`Facture téléchargée avec succès : ${newInvoice.filename}`);
    setTimeout(() => setUploadSuccess(""), 5000); // Clear message after 5 seconds
    
    // Add the new invoice to the list
    setInvoices(prev => [newInvoice, ...prev]);
    
    // Refetch the stats to get updated numbers
    getInvoiceStats().then(newStats => {
      if (newStats) {
        setStats(newStats);
      }
    });
  };

  const handleUploadError = (error: any) => {
    console.error("Upload error:", error);
    setError(error instanceof Error ? error.message : "Erreur lors du téléchargement. Veuillez réessayer.");
    setTimeout(() => setError(""), 5000); // Clear error after 5 seconds
  };
  
  const handleUploadStart = () => {
    setIsUploading(true);
    // Clear any previous errors or success messages
    setError("");
    setUploadSuccess("");
  };
  
  const handleUploadEnd = () => {
    setIsUploading(false);
  };

  const handleLogout = () => {
    console.log("Déconnexion");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      {/* App Bar */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <div className="flex items-center">
            <span role="img" aria-label="payment" className="text-[#FF4081] mr-2 text-2xl">⚡</span>
            <h1 className="text-2xl font-bold text-gray-900">PayRush Dashboard</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-[#FF4081] text-white rounded-md font-medium hover:bg-opacity-90 transition-all shadow-sm hover:shadow"
          >
            Se déconnecter
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-10">
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {/* File Upload Area */}
          <section>
            <FileUpload 
              onFilesSelected={(files) => {
                console.log('Files selected:', files);
                handleUploadStart();
              }}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
              onUploadEnd={handleUploadEnd}
            />
          </section>

          {/* Status messages */}
          {uploadSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex justify-between items-center shadow-sm mb-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {uploadSuccess}
              </div>
              <button 
                onClick={() => setUploadSuccess("")}
                className="text-green-700 hover:text-green-900 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center shadow-sm mb-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
              <button 
                onClick={() => setError("")}
                className="text-red-700 hover:text-red-900 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          {/* Invoices Table */}
          <section>
            <InvoiceTable 
              invoices={invoices} 
              loading={loading} 
              emptyMessage="Aucune facture trouvée. Téléchargez votre première facture."
            />
          </section>

          {/* Statistics Section */}
          <section className="border border-[#E0E0E0] rounded-lg p-6 shadow-sm bg-white mt-2">
            <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
            {loading ? (
              <div className="text-center py-4 text-gray-500">Chargement des statistiques...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow transition-all">
                  <p className="text-gray-600 mb-1">Factures payées</p>
                  <p className="text-3xl font-bold text-[#4CAF50]">{stats?.total_paid || 0}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow transition-all">
                  <p className="text-gray-600 mb-1">Montant total</p>
                  <p className="text-3xl font-bold text-[#42A5F5]">{stats?.total_amount.toFixed(2) || 0} €</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow transition-all">
                  <p className="text-gray-600 mb-1">Factures en attente</p>
                  <p className="text-3xl font-bold text-[#FFC107]">{stats?.pending_invoices || 0}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow transition-all">
                  <p className="text-gray-600 mb-1">Total factures</p>
                  <p className="text-3xl font-bold text-gray-800">{stats?.total_invoices || 0}</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
