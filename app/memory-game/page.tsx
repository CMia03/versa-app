"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Trophy, RefreshCw, Timer, Target, Star, Zap, Sparkles } from 'lucide-react';

// Type pour les cartes
interface Card {
    id: number;
    content: string;
    uniqueKey?: string;
}

// Liste des cartes disponibles pour chaque niveau
const allCards: Card[] = [
    { id: 1, content: "🎮" },
    { id: 2, content: "🎯" },
    { id: 3, content: "🎨" },
    { id: 4, content: "🎭" },
    { id: 5, content: "🎪" },
    { id: 6, content: "🎟️" },
    { id: 7, content: "🎲" },
    { id: 8, content: "🎳" },
    { id: 9, content: "🎸" },
    { id: 10, content: "🎹" },
    { id: 11, content: "🎺" },
    { id: 12, content: "🎻" },
];

// Fonction pour mélanger les cartes et les ajuster en fonction du niveau
const shuffleCards = (level: number): Card[] => {
    const cardSubset = allCards.slice(0, level * 2); // Sélectionne un sous-ensemble en fonction du niveau
    // Duplique les cartes
    const doubledCards = [
        ...cardSubset,
        ...cardSubset,
    ].map((card) => ({
        ...card,
        uniqueKey: `${card.id}-${Math.random() * Date.now()}` // Génère une clé unique en combinant `id`, `Math.random()`, et `Date.now()`
    }));

    return doubledCards.sort(() => Math.random() - 0.5); // Mélange les cartes
};

const MemoryGame = () => {
    const [flippedCards, setFlippedCards] = useState<Card[]>([]); // Cartes retournées
    const [matchedCards, setMatchedCards] = useState<string[]>([]); // Cartes appariées
    const [cardsInGame, setCardsInGame] = useState<Card[]>(shuffleCards(3)); // Cartes du jeu
    const [gameOver, setGameOver] = useState<boolean>(false); // Fin de jeu
    const [difficulty, setDifficulty] = useState<number>(3); // Niveau de difficulté (par défaut facile)
    const [moves, setMoves] = useState<number>(0); // Nombre de coups
    const [timer, setTimer] = useState<number>(0); // Timer en secondes
    const [isPlaying, setIsPlaying] = useState<boolean>(false); // État du jeu
    const [bestScore, setBestScore] = useState<{ moves: number; time: number } | null>(null); // Meilleur score

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && !gameOver) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, gameOver]);

    // Met à jour le jeu à chaque changement de niveau
    useEffect(() => {
        setCardsInGame(shuffleCards(difficulty)); // Actualiser les cartes en fonction du niveau
        setMatchedCards([]);
        setFlippedCards([]);
        setGameOver(false);
        setMoves(0);
        setTimer(0);
        setIsPlaying(false);
    }, [difficulty]);

    // Vérifie les cartes retournées
    useEffect(() => {
        if (flippedCards.length === 2) {
            setMoves(prev => prev + 1);
            setIsPlaying(true);
            
            const [firstCard, secondCard] = flippedCards;

            if (firstCard.content === secondCard.content) {
                setMatchedCards((prev) => [...prev, firstCard.content]);
            }

            setTimeout(() => setFlippedCards([]), 1000); // Retourne les cartes après un délai
        }
    }, [flippedCards]);

    // Vérifie si le jeu est terminé
    useEffect(() => {
        if (matchedCards.length === cardsInGame.length / 2) {
            setGameOver(true);
            setIsPlaying(false);
            
            // Vérifier si c'est un nouveau meilleur score
            const currentScore = { moves, time: timer };
            if (!bestScore || moves < bestScore.moves || (moves === bestScore.moves && timer < bestScore.time)) {
                setBestScore(currentScore);
            }
        }
    }, [matchedCards, cardsInGame.length, moves, timer, bestScore]);

    // Gère le clic sur une carte
    const handleCardClick = (card: Card) => {
        if (
            flippedCards.length === 2 ||
            flippedCards.includes(card) ||
            matchedCards.includes(card.content)
        )
            return;

        setFlippedCards((prev) => [...prev, card]);
    };

    // Nouvelle partie
    const startNewGame = () => {
        setCardsInGame(shuffleCards(difficulty));
        setMatchedCards([]);
        setFlippedCards([]);
        setGameOver(false);
        setMoves(0);
        setTimer(0);
        setIsPlaying(false);
    };

    // Format du temps
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Rendu d'une carte
    const renderCard = (card: Card) => {
        const isFlipped = flippedCards.includes(card) || matchedCards.includes(card.content);
        const isMatched = matchedCards.includes(card.content);
        
        return (
            <div
                key={card.uniqueKey}
                className={`
                    w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-xl m-2 cursor-pointer 
                    transform transition-all duration-300 hover:scale-105
                    ${isFlipped 
                        ? isMatched 
                            ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg rotate-y-0' 
                            : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-md rotate-y-0'
                        : 'bg-gradient-to-br from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 shadow-md rotate-y-180'
                    }
                    ${isMatched ? 'animate-pulse' : ''}
                `}
                onClick={() => handleCardClick(card)}
            >
                {isFlipped && (
                    <span className="text-2xl md:text-3xl transform transition-transform duration-300">
                        {card.content}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white mr-4 shadow-lg">
                            <Brain className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Jeu de Mémoire
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Testez votre mémoire en associant les paires de cartes. Plus vite, mieux c&apos;est !
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Game Board */}
                    <div className="lg:col-span-3">
                        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                            <CardHeader className="text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                                <CardTitle className="text-2xl flex items-center justify-center">
                                    <Target className="w-6 h-6 mr-3" />
                                    Plateau de Jeu
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                {/* Controls */}
                                <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                                    <div className="flex items-center space-x-4">
                                        <select
                                            value={difficulty}
                                            onChange={(e) => setDifficulty(Number(e.target.value))}
                                            className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                                        >
                                            <option value={3}>Facile (6 cartes)</option>
                                            <option value={4}>Moyen (8 cartes)</option>
                                            <option value={6}>Difficile (12 cartes)</option>
                                        </select>
                                        <Button 
                                            onClick={startNewGame}
                                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Nouvelle Partie
                                        </Button>
                                    </div>
                                    
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center">
                                            <Timer className="w-5 h-5 text-indigo-500 mr-2" />
                                            <span className="font-bold text-gray-700">{formatTime(timer)}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Zap className="w-5 h-5 text-purple-500 mr-2" />
                                            <span className="font-bold text-gray-700">{moves} coups</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Game Grid */}
                                <div className="flex flex-wrap justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl shadow-inner">
                                    {cardsInGame.map(renderCard)}
                                </div>

                                {/* Progress */}
                                <div className="mt-6 text-center">
                                    <div className="text-lg font-semibold text-gray-700 mb-2">
                                        Progression: {matchedCards.length} / {cardsInGame.length / 2} paires
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${(matchedCards.length / (cardsInGame.length / 2)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Score Board */}
                    <div className="lg:col-span-1">
                        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm h-fit">
                            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                                <CardTitle className="text-xl flex items-center">
                                    <Trophy className="w-5 h-5 mr-3" />
                                    Statistiques
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
                                        <div className="text-center">
                                            <div className="text-sm text-indigo-600 font-medium">Temps Actuel</div>
                                            <div className="text-2xl font-bold text-indigo-700">{formatTime(timer)}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                                        <div className="text-center">
                                            <div className="text-sm text-purple-600 font-medium">Coups Actuels</div>
                                            <div className="text-2xl font-bold text-purple-700">{moves}</div>
                                        </div>
                                    </div>

                                    {bestScore && (
                                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-lg border border-green-200">
                                            <div className="text-center">
                                                <div className="text-sm text-green-600 font-medium flex items-center justify-center">
                                                    <Star className="w-4 h-4 mr-1" />
                                                    Meilleur Score
                                                </div>
                                                <div className="text-lg font-bold text-green-700">
                                                    {bestScore.moves} coups
                                                </div>
                                                <div className="text-sm text-green-600">
                                                    {formatTime(bestScore.time)}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Victory Modal */}
                {gameOver && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Card className="border-0 shadow-2xl bg-white p-8 max-w-md mx-4 text-center">
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Félicitations ! 🎉</h2>
                            <p className="text-gray-600 mb-6">
                                Vous avez trouvé toutes les paires en {moves} coups en {formatTime(timer)} !
                            </p>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="font-medium">Temps:</span>
                                    <span className="font-bold text-indigo-600">{formatTime(timer)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="font-medium">Coups:</span>
                                    <span className="font-bold text-purple-600">{moves}</span>
                                </div>
                            </div>
                            <Button 
                                onClick={startNewGame}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                Nouvelle Partie
                            </Button>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemoryGame;
