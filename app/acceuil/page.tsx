import React from "react";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { UtensilsCrossed, MessageCircleQuestion, Calculator, Gamepad2, Code, Award, LockKeyhole, Sparkles, Clock, Palette, Music, BookOpen, Calendar, Target, Zap, Heart, MessageSquare } from "lucide-react";

const WelcomePages = () => {
    const Item = [
        {
            title: "Calculatrice",
            description: "Calculez le coût de votre projet avec précision.",
            icon: <Calculator className="w-6 h-6" />,
            href: "/calculator",
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-50 to-cyan-50"
        },
        {
            title: "Quiz",
            description: "Testez vos connaissances avec nos quiz interactifs.",
            icon: <MessageCircleQuestion className="w-6 h-6" />,
            href: "/quiz",
            gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-50 to-pink-50"
        },
        {
            title: "Recette cuisine",
            description: "Découvrez des recettes de cuisine délicieuses.",
            icon: <UtensilsCrossed className="w-6 h-6" />,
            href: "/recep",
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-50 to-red-50"
        },
        {
            title: "Tic tac Toe",
            description: "Un jeu classique où deux joueurs alignent des symboles sur une grille 3x3.",
            icon: <Gamepad2 className="w-6 h-6" />,
            href: "/game",
            gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-50 to-emerald-50"
        },
        {
            title: "Jeux de mémoire",
            description: "Entraînez votre mémoire en associant des paires de cartes identiques.",
            icon: <Gamepad2 className="w-6 h-6" />,
            href: "/memory-game",
            gradient: "from-indigo-500 to-blue-500",
            bgGradient: "from-indigo-50 to-blue-50"
        },
        {
            title: "Exercices Algorithme",
            description: "Résolvez des problèmes par des étapes logiques et améliorez votre pensée algorithmique.",
            icon: <Code className="w-6 h-6" />,
            href: "/exercices",
            gradient: "from-gray-600 to-gray-800",
            bgGradient: "from-gray-50 to-slate-50"
        },
        {
            title: "Générateur de mots de passe",
            description: "Créez des mots de passe sécurisés et aléatoires pour protéger vos comptes.",
            icon: <LockKeyhole className="w-6 h-6" />,
            href: "/generate-pass",
            gradient: "from-teal-500 to-cyan-500",
            bgGradient: "from-teal-50 to-cyan-50"
        }, 
        {
            title: "Jeux collectifs",
            description: "Découvrez des jeux d'équipe basés sur la coopération et la stratégie.",
            icon: <Award className="w-6 h-6" />,
            href: "/jeux",
            gradient: "from-yellow-500 to-orange-500",
            bgGradient: "from-yellow-50 to-orange-50"
        },
        {
            title: "Minuteur & Chronomètre",
            description: "Gérez votre temps efficacement avec minuteur et chronomètre.",
            icon: <Clock className="w-6 h-6" />,
            href: "/timer",
            gradient: "from-red-500 to-pink-500",
            bgGradient: "from-red-50 to-pink-50"
        },
        {
            title: "Générateur de Couleurs",
            description: "Créez et explorez des palettes de couleurs harmonieuses.",
            icon: <Palette className="w-6 h-6" />,
            href: "/color-generator",
            gradient: "from-violet-500 to-purple-500",
            bgGradient: "from-violet-50 to-purple-50"
        },
        {
            title: "Générateur de Citations",
            description: "Découvrez des citations inspirantes et motivantes pour votre quotidien.",
            icon: <MessageSquare className="w-6 h-6" />,
            href: "/quotes",
            gradient: "from-emerald-500 to-teal-500",
            bgGradient: "from-emerald-50 to-teal-50"
        },
        {
            title: "Notes & Journal",
            description: "Prenez des notes et organisez vos pensées quotidiennes.",
            icon: <BookOpen className="w-6 h-6" />,
            href: "/notes",
            gradient: "from-amber-500 to-orange-500",
            bgGradient: "from-amber-50 to-orange-50"
        },
        {
            title: "Calendrier & Événements",
            description: "Planifiez vos événements et gérez votre agenda personnel.",
            icon: <Calendar className="w-6 h-6" />,
            href: "/calendar",
            gradient: "from-rose-500 to-red-500",
            bgGradient: "from-rose-50 to-red-50"
        },
        {
            title: "Objectifs & Suivi",
            description: "Définissez et suivez vos objectifs personnels et professionnels.",
            icon: <Target className="w-6 h-6" />,
            href: "/goals",
            gradient: "from-sky-500 to-blue-500",
            bgGradient: "from-sky-50 to-blue-50"
        },
        {
            title: "Générateur d'Idées",
            description: "Trouvez l'inspiration avec notre générateur d'idées créatives.",
            icon: <Zap className="w-6 h-6" />,
            href: "/idea-generator",
            gradient: "from-yellow-400 to-orange-500",
            bgGradient: "from-yellow-50 to-orange-50"
        },
        {
            title: "Méditation & Relaxation",
            description: "Détendez-vous avec des exercices de méditation guidés.",
            icon: <Heart className="w-6 h-6" />,
            href: "/meditation",
            gradient: "from-pink-400 to-rose-500",
            bgGradient: "from-pink-50 to-rose-50"
        }
    ];

    return (
        <div className="min-h-screen pt-4 sm:pt-8 rounded-lg">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-blue-600 mr-3" />
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Bienvenue dans Versa App
                    </h1>
                    <Sparkles className="w-8 h-8 text-pink-600 ml-3" />
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    L'application polyvalente pour toutes vos besoins regroupe des outils essentiels, 
                    simplifiant ainsi votre quotidien en une seule plateforme pratique et moderne.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {Item.map((item, index) => (
                    <Link href={item.href} key={index} className="group">
                        <Card className={`h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br ${item.bgGradient} hover:scale-105 flex flex-col`}>
                            <CardHeader className="pb-4 flex-1">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} text-white shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                                    {item.title}
                                </CardTitle>
                                <CardDescription className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0 mt-auto">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                                        Commencer
                                    </span>
                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
                    <p className="text-blue-100 mb-6">
                        Explorez nos outils et découvrez comment Versa App peut simplifier votre quotidien.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {Item.slice(0, 4).map((item, index) => (
                            <Link 
                                key={index} 
                                href={item.href}
                                className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 font-medium"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePages;