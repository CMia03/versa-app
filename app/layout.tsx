import { ReactNode } from "react";
import "../styles/globals.css";
import { Metadata } from "next";
import MobileNav from "@/components/ui/mobile-nav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Versa App - Application Polyvalente",
  description: "L'application polyvalente pour toutes vos besoins regroupe des outils essentiels, simplifiant ainsi votre quotidien en une seule plateforme pratique.",
  keywords: "calculatrice, quiz, recettes, jeux, outils, application",
  authors: [{ name: "Versa App Team" }],
  viewport: "width=device-width, initial-scale=1",
};

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="fr" className="scroll-smooth">
            <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
                <div className="flex flex-col min-h-screen">
                    {/* Header moderne */}
                    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-md shadow-sm">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
                                    <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">V</span>
                                    </div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Versa App
                                    </h1>
                                </Link>
                                
                                {/* Navigation desktop */}
                                <nav className="hidden md:flex items-center space-x-6">
                                    <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                                        Accueil
                                    </Link>
                                    <Link href="/calculator" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                                        Calculatrice
                                    </Link>
                                    <Link href="/quiz" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                                        Quiz
                                    </Link>
                                    <Link href="/recep" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                                        Recettes
                                    </Link>
                                </nav>

                                {/* Navigation mobile */}
                                <MobileNav />
                            </div>
                        </div>
                    </header>

                    {/* Contenu principal avec padding-top pour éviter le chevauchement */}
                    <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-8">
                        {children}
                    </main>

                    {/* Footer */}
                    <footer className="border-t bg-white/80 backdrop-blur-md mt-auto">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                            <div className="text-center text-gray-600">
                                <p>&copy; {new Date().getFullYear()} Versa App. Tous droits réservés.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
};

export default Layout;
