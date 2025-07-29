"use client"
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Zap, RefreshCw, Heart, Share2, Copy, BookOpen, Palette, Gamepad2, Camera, Music, Code, Lightbulb } from 'lucide-react';

export default function IdeaGenerator() {
  const [currentIdea, setCurrentIdea] = useState<string>('');
  const [category, setCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const ideas = {
    all: [
      "Créer une application de recettes avec reconnaissance d'images",
      "Développer un système de gestion de plantes d'intérieur",
      "Concevoir un jeu éducatif sur l'histoire locale",
      "Créer une plateforme de partage de compétences entre voisins",
      "Développer un outil de planification de voyage collaboratif",
      "Concevoir une app de méditation personnalisée",
      "Créer un générateur de noms pour animaux de compagnie",
      "Développer un système de suivi de la qualité de l'air",
      "Concevoir une app de découverte de musiques locales",
      "Créer un outil de traduction en temps réel pour les signes",
      "Développer une plateforme de mentorat pour étudiants",
      "Concevoir un jeu de mémoire pour personnes âgées",
      "Créer une app de gestion de bibliothèque personnelle",
      "Développer un système de rappels intelligents",
      "Concevoir une plateforme de micro-donations",
      "Créer un générateur de contenu pour réseaux sociaux",
      "Développer une app de découverte de nouveaux restaurants",
      "Concevoir un outil de planification de budget familial",
      "Créer une plateforme de partage de photos de voyage",
      "Développer un système de suivi de fitness pour débutants"
    ],
    tech: [
      "Application de reconnaissance faciale pour la sécurité",
      "Système de domotique contrôlé par IA",
      "Plateforme de trading automatisé",
      "App de réalité augmentée pour l'éducation",
      "Système de gestion de stock intelligent",
      "Plateforme de développement collaboratif",
      "App de reconnaissance vocale multilingue",
      "Système de surveillance de santé connecté",
      "Plateforme de streaming personnalisé",
      "App de navigation indoor"
    ],
    creative: [
      "Générateur de poèmes basé sur l'humeur",
      "App de création de bandes dessinées",
      "Plateforme de collaboration musicale",
      "Générateur de noms de marques",
      "App de design de logos automatique",
      "Plateforme de partage d'art numérique",
      "Générateur de scénarios de films",
      "App de création de personnages",
      "Plateforme de storytelling interactif",
      "Générateur de palettes de couleurs"
    ],
    business: [
      "Plateforme de micro-crédit entre particuliers",
      "App de gestion de relation client",
      "Système de facturation automatique",
      "Plateforme de freelance spécialisée",
      "App de suivi de performance commerciale",
      "Système de gestion de projet agile",
      "Plateforme de formation en ligne",
      "App de networking professionnel",
      "Système de gestion de ressources humaines",
      "Plateforme de marketplace vertical"
    ],
    lifestyle: [
      "App de planification de repas équilibrés",
      "Système de suivi de sommeil",
      "Plateforme de fitness à domicile",
      "App de gestion du stress",
      "Système de suivi de consommation d'eau",
      "Plateforme de développement personnel",
      "App de gestion de temps de travail",
      "Système de rappels de médicaments",
      "Plateforme de bien-être mental",
      "App de suivi de résolutions"
    ]
  };

  const categories = [
    { id: 'all', name: 'Toutes', icon: Lightbulb },
    { id: 'tech', name: 'Technologie', icon: Code },
    { id: 'creative', name: 'Créativité', icon: Palette },
    { id: 'business', name: 'Business', icon: BookOpen },
    { id: 'lifestyle', name: 'Lifestyle', icon: Heart }
  ];

  const generateIdea = () => {
    const categoryIdeas = ideas[category as keyof typeof ideas] || ideas.all;
    const randomIndex = Math.floor(Math.random() * categoryIdeas.length);
    setCurrentIdea(categoryIdeas[randomIndex]);
    setCopied(false);
  };

  const addToFavorites = () => {
    if (currentIdea && !favorites.includes(currentIdea)) {
      setFavorites([...favorites, currentIdea]);
    }
  };

  const removeFromFavorites = (idea: string) => {
    setFavorites(favorites.filter(fav => fav !== idea));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentIdea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy idea:', err);
    }
  };

  const shareIdea = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Idée créative générée',
        text: currentIdea,
        url: window.location.href
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-white mr-3">
              <Zap className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Générateur d'Idées
            </h1>
          </div>
          <p className="text-gray-600">Trouvez l'inspiration avec nos idées créatives</p>
        </div>

        {/* Category Selector */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 flex flex-col items-center space-y-2 ${
                      category === cat.id
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{cat.name}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Idea Generator */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 mb-6">
          <CardHeader className="pb-6">
            <CardTitle className="text-center text-gray-700 font-medium">
              Idée du Moment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Idea Display */}
            <div className="min-h-32 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100">
              {currentIdea ? (
                <p className="text-lg text-gray-800 leading-relaxed text-center">
                  {currentIdea}
                </p>
              ) : (
                <p className="text-lg text-gray-500 text-center">
                  Cliquez sur "Générer une idée" pour commencer
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={generateIdea}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Générer une idée
              </Button>
              
              {currentIdea && (
                <>
                  <Button
                    onClick={addToFavorites}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Favoris
                  </Button>
                  
                  <Button
                    onClick={copyToClipboard}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    {copied ? 'Copié !' : 'Copier'}
                  </Button>
                  
                  <Button
                    onClick={shareIdea}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Partager
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Favorites */}
        {favorites.length > 0 && (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 mb-6">
            <CardHeader>
              <CardTitle className="text-gray-700 font-medium flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Mes Idées Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {favorites.map((idea, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 flex-1 mr-4">{idea}</p>
                    <Button
                      onClick={() => removeFromFavorites(idea)}
                      className="p-2 bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Conseils d'utilisation</h3>
            <p className="text-sm text-gray-600">
              Explorez différentes catégories pour trouver l'inspiration. Sauvegardez vos idées favorites et partagez-les avec votre équipe !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 