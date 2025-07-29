"use client"
import { useState } from 'react';
import { Menu, X, Home, Calculator, MessageCircleQuestion, UtensilsCrossed, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Calculatrice', href: '/calculator', icon: Calculator },
    { name: 'Quiz', href: '/quiz', icon: MessageCircleQuestion },
    { name: 'Recettes', href: '/recep', icon: UtensilsCrossed },
    { name: 'Jeux', href: '/game', icon: Gamepad2 },
  ];

  return (
    <div className="md:hidden">
      {/* Bouton menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu mobile */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="p-6 bg-white">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200" onClick={() => setIsOpen(false)}>
                  <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Versa App
                  </h2>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Menu items */}
              <nav className="space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 p-4 rounded-xl hover:white hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white group-hover:scale-110 transition-transform duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>

            
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav; 