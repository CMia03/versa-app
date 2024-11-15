"use client";
import React, { useState, useEffect } from "react";

// Type pour les cartes
interface Card {
    id: number;
    content: string;
    uniqueKey?: string;
}

// Liste des cartes disponibles pour chaque niveau
const allCards: Card[] = [
    { id: 1, content: "A" },
    { id: 2, content: "B" },
    { id: 3, content: "C" },
    { id: 4, content: "D" },
    { id: 5, content: "E" },
    { id: 6, content: "F" },
    { id: 7, content: "G" },
    { id: 8, content: "H" },
    { id: 9, content: "I" },
    { id: 10, content: "J" },
    { id: 11, content: "K" },
    { id: 12, content: "L" },
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

    // Met à jour le jeu à chaque changement de niveau
    useEffect(() => {
        setCardsInGame(shuffleCards(difficulty)); // Actualiser les cartes en fonction du niveau
        setMatchedCards([]);
        setFlippedCards([]);
        setGameOver(false);
    }, [difficulty]);

    // Vérifie les cartes retournées
    useEffect(() => {
        if (flippedCards.length === 2) {
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
        }
    }, [matchedCards]);

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

    // Rendu d'une carte
    const renderCard = (card: Card) => {
        const isFlipped = flippedCards.includes(card) || matchedCards.includes(card.content);
        return (
            <div
                key={card.uniqueKey} // Utilisation de `uniqueKey` pour assurer l'unicité
                className={`w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg m-2 cursor-pointer transform ${isFlipped ? "bg-green-400" : "bg-gray-300"
                    }`}
                onClick={() => handleCardClick(card)}
            >
                {isFlipped && <span className="text-3xl">{card.content}</span>}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center mt-10">
            {/* Sélection de la difficulté */}
            <div className="mb-4">
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                    className="p-2 border rounded-md"
                >
                    <option value={3}>Facile (6 cartes)</option>
                    <option value={4}>Moyen (8 cartes)</option>
                    <option value={6}>Difficile (12 cartes)</option>
                </select>
            </div>

            {/* Cartes */}
            <div className="flex flex-wrap justify-center">
                {cardsInGame.map(renderCard)}
            </div>

            {/* Message de fin de jeu */}
            {gameOver && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-green-500">
                    You Win!
                </div>
            )}
        </div>
    );
};

export default MemoryGame;
