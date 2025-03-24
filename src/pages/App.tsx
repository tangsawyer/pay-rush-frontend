import React from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Will navigate to dashboard once implemented
    console.log("Navigate to dashboard");
    navigate("/Dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* App Bar */}
      <header className="w-full bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-black">PayRush</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => console.log("Log in")}
              className="px-4 py-2 text-black hover:text-gray-700 font-medium">
              Se connecter
            </button>
            <button 
              onClick={handleGetStarted}
              className="px-4 py-2 bg-[#FF4081] text-white rounded-md font-medium hover:bg-opacity-90 transition-all">
              S'inscrire
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Automatisez le paiement de vos factures</h2>
            <p className="text-xl text-gray-600 mb-8">PayRush simplifie la gestion des factures pour les freelances et micro-entreprises en France.</p>
            <button 
              onClick={handleGetStarted}
              className="px-6 py-3 bg-[#FF4081] text-white rounded-md font-medium text-lg hover:bg-opacity-90 transition-all shadow-md">
              Commencer gratuitement
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Pourquoi choisir PayRush?</h3>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#42A5F5] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#42A5F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Gagnez du temps</h4>
                <p className="text-gray-600">Uploadez vos factures et laissez PayRush s'occuper du reste.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#4CAF50] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Évitez les erreurs</h4>
                <p className="text-gray-600">Automatisez vos paiements et évitez les retards et pénalités.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#FFC107] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Suivez vos dépenses</h4>
                <p className="text-gray-600">Visualisez vos paiements et gardez un œil sur votre trésorerie.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h3 className="text-3xl font-bold mb-6">Prêt à simplifier la gestion de vos factures?</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Rejoignez les freelances et micro-entreprises qui font confiance à PayRush pour automatiser leurs paiements.</p>
          <button 
            onClick={handleGetStarted}
            className="px-6 py-3 bg-[#FF4081] text-white rounded-md font-medium text-lg hover:bg-opacity-90 transition-all shadow-md">
            Commencer maintenant
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-black">PayRush</h2>
              <p className="text-gray-600 text-sm">© 2025 PayRush. Tous droits réservés.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="text-gray-600 hover:text-black">Mentions légales</a>
              <a href="#" className="text-gray-600 hover:text-black">Politique de confidentialité</a>
              <a href="#" className="text-gray-600 hover:text-black">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
