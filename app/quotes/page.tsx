"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { MessageSquare, RefreshCw, Heart, Share2, Copy, BookOpen, Zap, Target, Users, Sparkles } from 'lucide-react';

interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  language: string;
}

export default function QuotesGenerator() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [category, setCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const quotes: Quote[] = [
    // Citations de motivation
    {
      id: '1',
      text: "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte.",
      author: "Winston Churchill",
      category: 'motivation',
      language: 'fr'
    },
    {
      id: '2',
      text: "La vie est soit une aventure audacieuse, soit rien du tout.",
      author: "Helen Keller",
      category: 'motivation',
      language: 'fr'
    },
    {
      id: '3',
      text: "Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant.",
      author: "Proverbe chinois",
      category: 'motivation',
      language: 'fr'
    },
    {
      id: '4',
      text: "Ne regardez pas en arrière, vous n'y allez pas.",
      author: "Satchel Paige",
      category: 'motivation',
      language: 'fr'
    },
    {
      id: '5',
      text: "L'avenir appartient à ceux qui croient en la beauté de leurs rêves.",
      author: "Eleanor Roosevelt",
      category: 'motivation',
      language: 'fr'
    },

    // Citations de sagesse
    {
      id: '6',
      text: "La sagesse commence dans l'émerveillement.",
      author: "Socrate",
      category: 'wisdom',
      language: 'fr'
    },
    {
      id: '7',
      text: "Connais-toi toi-même.",
      author: "Inscription du temple de Delphes",
      category: 'wisdom',
      language: 'fr'
    },
    {
      id: '8',
      text: "La simplicité est la sophistication ultime.",
      author: "Leonardo da Vinci",
      category: 'wisdom',
      language: 'fr'
    },
    {
      id: '9',
      text: "Le bonheur n'est pas quelque chose de prêt. Il vient de vos propres actions.",
      author: "Dalaï Lama",
      category: 'wisdom',
      language: 'fr'
    },
    {
      id: '10',
      text: "La paix vient de l'intérieur. Ne la cherchez pas à l'extérieur.",
      author: "Bouddha",
      category: 'wisdom',
      language: 'fr'
    },

    // Citations sur le succès
    {
      id: '11',
      text: "Le succès est la somme de petits efforts répétés jour après jour.",
      author: "Robert Collier",
      category: 'success',
      language: 'fr'
    },
    {
      id: '12',
      text: "L'échec est le fondement du succès.",
      author: "Lao Tseu",
      category: 'success',
      language: 'fr'
    },
    {
      id: '13',
      text: "La persévérance est la mère du succès.",
      author: "Proverbe français",
      category: 'success',
      language: 'fr'
    },
    {
      id: '14',
      text: "Le succès n'est pas la clé du bonheur. Le bonheur est la clé du succès.",
      author: "Albert Schweitzer",
      category: 'success',
      language: 'fr'
    },
    {
      id: '15',
      text: "Visez la lune. Même si vous la manquez, vous atterrirez parmi les étoiles.",
      author: "Les Brown",
      category: 'success',
      language: 'fr'
    },

    // Citations sur l'amour
    {
      id: '16',
      text: "L'amour ne se regarde pas avec les yeux mais avec le cœur.",
      author: "William Shakespeare",
      category: 'love',
      language: 'fr'
    },
    {
      id: '17',
      text: "Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction.",
      author: "Antoine de Saint-Exupéry",
      category: 'love',
      language: 'fr'
    },
    {
      id: '18',
      text: "L'amour est la poésie des sens.",
      author: "Honoré de Balzac",
      category: 'love',
      language: 'fr'
    },
    {
      id: '19',
      text: "Le plus grand bonheur de la vie est la conviction d'être aimé pour soi-même.",
      author: "Victor Hugo",
      category: 'love',
      language: 'fr'
    },
    {
      id: '20',
      text: "L'amour est patient, l'amour est serviable.",
      author: "Saint Paul",
      category: 'love',
      language: 'fr'
    },

    // Citations sur la créativité
    {
      id: '21',
      text: "La créativité, c'est l'intelligence qui s'amuse.",
      author: "Albert Einstein",
      category: 'creativity',
      language: 'fr'
    },
    {
      id: '22',
      text: "L'imagination est plus importante que le savoir.",
      author: "Albert Einstein",
      category: 'creativity',
      language: 'fr'
    },
    {
      id: '23',
      text: "L'art est le mensonge qui nous permet de comprendre la vérité.",
      author: "Pablo Picasso",
      category: 'creativity',
      language: 'fr'
    },
    {
      id: '24',
      text: "La créativité nécessite le courage de lâcher prise des certitudes.",
      author: "Erich Fromm",
      category: 'creativity',
      language: 'fr'
    },
    {
      id: '25',
      text: "Chaque artiste a été d'abord un amateur.",
      author: "Ralph Waldo Emerson",
      category: 'creativity',
      language: 'fr'
    },

    // Citations sur la vie
    {
      id: '26',
      text: "La vie est ce qui arrive pendant que vous êtes occupé à faire d'autres projets.",
      author: "John Lennon",
      category: 'life',
      language: 'fr'
    },
    {
      id: '27',
      text: "La vie est un mystère à vivre, pas un problème à résoudre.",
      author: "Gandhi",
      category: 'life',
      language: 'fr'
    },
    {
      id: '28',
      text: "Le bonheur n'est pas une destination, c'est un voyage.",
      author: "Proverbe",
      category: 'life',
      language: 'fr'
    },
    {
      id: '29',
      text: "La vie est trop courte pour être petite.",
      author: "Benjamin Disraeli",
      category: 'life',
      language: 'fr'
    },
    {
      id: '30',
      text: "Vivez comme si vous deviez mourir demain. Apprenez comme si vous deviez vivre toujours.",
      author: "Gandhi",
      category: 'life',
      language: 'fr'
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes', icon: Sparkles, color: 'from-emerald-500 to-teal-500' },
    { id: 'motivation', name: 'Motivation', icon: Zap, color: 'from-blue-500 to-cyan-500' },
    { id: 'wisdom', name: 'Sagesse', icon: BookOpen, color: 'from-purple-500 to-violet-500' },
    { id: 'success', name: 'Succès', icon: Target, color: 'from-green-500 to-emerald-500' },
    { id: 'love', name: 'Amour', icon: Heart, color: 'from-red-500 to-pink-500' },
    { id: 'creativity', name: 'Créativité', icon: MessageSquare, color: 'from-yellow-500 to-orange-500' },
    { id: 'life', name: 'Vie', icon: Users, color: 'from-indigo-500 to-blue-500' }
  ];

  useEffect(() => {
    const savedFavorites = localStorage.getItem('versa-quotes-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('versa-quotes-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const generateQuote = () => {
    setIsLoading(true);
    
    // Simuler un délai pour l'animation
    setTimeout(() => {
      const categoryQuotes = category === 'all' ? quotes : quotes.filter(q => q.category === category);
      const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
      setCurrentQuote(categoryQuotes[randomIndex]);
      setCopied(false);
      setIsLoading(false);
    }, 500);
  };

  const addToFavorites = () => {
    if (currentQuote && !favorites.find(fav => fav.id === currentQuote.id)) {
      setFavorites([...favorites, currentQuote]);
    }
  };

  const removeFromFavorites = (quote: Quote) => {
    setFavorites(favorites.filter(fav => fav.id !== quote.id));
  };

  const copyToClipboard = async () => {
    if (!currentQuote) return;
    
    try {
      const textToCopy = `"${currentQuote.text}" - ${currentQuote.author}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy quote:', err);
    }
  };

  const shareQuote = () => {
    if (!currentQuote) return;
    
    if (navigator.share) {
      navigator.share({
        title: 'Citation inspirante',
        text: `"${currentQuote.text}" - ${currentQuote.author}`,
        url: window.location.href
      });
    } else {
      copyToClipboard();
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || Sparkles;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || 'from-emerald-500 to-teal-500';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white mr-3">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Générateur de Citations
            </h1>
          </div>
          <p className="text-gray-600">Découvrez des citations inspirantes et motivantes pour votre quotidien</p>
        </div>

        {/* Category Selector */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 flex flex-col items-center space-y-2 ${
                      category === cat.id
                        ? `bg-gradient-to-r ${cat.color} text-white`
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

        {/* Quote Display */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 mb-6">
          <CardHeader className="pb-6">
            <CardTitle className="text-center text-gray-700 font-medium">
              Citation du Jour
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quote Display */}
            <div className="min-h-48 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-100">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                </div>
              ) : currentQuote ? (
                <div className="text-center">
                  <div className="text-2xl text-emerald-600 mb-4">"</div>
                  <p className="text-xl text-gray-800 leading-relaxed mb-6">
                    {currentQuote.text}
                  </p>
                  <div className="text-2xl text-emerald-600 mb-4">"</div>
                  <p className="text-lg font-semibold text-gray-700">
                    — {currentQuote.author}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-lg text-gray-500">
                    Cliquez sur "Générer une citation" pour commencer
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={generateQuote}
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Générer une citation
              </Button>
              
              {currentQuote && (
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
                    onClick={shareQuote}
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
                Mes Citations Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favorites.map((quote) => {
                  const Icon = getCategoryIcon(quote.category);
                  return (
                    <div key={quote.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(quote.category)} text-white`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {categories.find(cat => cat.id === quote.category)?.name}
                          </span>
                        </div>
                        <Button
                          onClick={() => removeFromFavorites(quote)}
                          className="p-2 bg-red-100 text-red-600 hover:bg-red-200"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </Button>
                      </div>
                      <blockquote className="text-gray-700 italic mb-2">
                        "{quote.text}"
                      </blockquote>
                      <p className="text-sm font-semibold text-gray-600">
                        — {quote.author}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Conseils d'utilisation</h3>
            <p className="text-sm text-gray-600">
              Explorez différentes catégories pour trouver l'inspiration. Sauvegardez vos citations favorites 
              et partagez-les avec vos proches pour les motiver !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 