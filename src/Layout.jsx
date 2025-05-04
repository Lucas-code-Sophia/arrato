export default function Layout({ children }) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8f8f5] text-gray-800">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            <span className="text-green-700">La diet</span> d’Arrate
          </h1>
          {/* Tu peux ajouter ici un logo ou un bouton Contact */}
        </header>
  
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
  
        <footer className="bg-white text-sm text-center py-4 text-gray-500 border-t">
          &copy; {new Date().getFullYear()} La diet d’Arrate — Tous droits réservés
        </footer>
      </div>
    )
  }  