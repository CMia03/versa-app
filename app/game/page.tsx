"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, RefreshCw, X, Circle, Gamepad2, Users, Target } from 'lucide-react';

const GamePages = () => {
  // Typage explicite de squares
  const [squares, setSquares] = useState<Array<"X" | "O" | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<"X" | "O" | null>(null); // Typage du winner
  const [gameHistory, setGameHistory] = useState<{ xWins: number; oWins: number; draws: number }>({
    xWins: 0,
    oWins: 0,
    draws: 0
  });

  // Typage explicite de la fonction calculateWinner
  const calculateWinner = (squares: Array<"X" | "O" | null>): "X" | "O" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
    
    const newWinner = calculateWinner(newSquares);
    setWinner(newWinner);
    
    // Mettre à jour l'historique si le jeu est terminé
    if (newWinner) {
      setGameHistory(prev => ({
        ...prev,
        [newWinner === 'X' ? 'xWins' : 'oWins']: prev[newWinner === 'X' ? 'xWins' : 'oWins'] + 1
      }));
    } else if (newSquares.every(Boolean)) {
      setGameHistory(prev => ({
        ...prev,
        draws: prev.draws + 1
      }));
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const resetHistory = () => {
    setGameHistory({ xWins: 0, oWins: 0, draws: 0 });
  };

  const renderSquare = (index: number) => {
    const isWinningSquare = winner && (
      (index === 0 && squares[0] === winner && squares[1] === winner && squares[2] === winner) ||
      (index === 3 && squares[3] === winner && squares[4] === winner && squares[5] === winner) ||
      (index === 6 && squares[6] === winner && squares[7] === winner && squares[8] === winner) ||
      (index === 0 && squares[0] === winner && squares[3] === winner && squares[6] === winner) ||
      (index === 1 && squares[1] === winner && squares[4] === winner && squares[7] === winner) ||
      (index === 2 && squares[2] === winner && squares[5] === winner && squares[8] === winner) ||
      (index === 0 && squares[0] === winner && squares[4] === winner && squares[8] === winner) ||
      (index === 2 && squares[2] === winner && squares[4] === winner && squares[6] === winner)
    );

    return (
      <button
        className={`
          w-24 h-24 text-4xl font-bold border-2 rounded-xl transition-all duration-300 
          focus:outline-none focus:ring-4 focus:ring-blue-300
          ${squares[index] 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-400 shadow-lg' 
            : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 hover:shadow-md'
          }
          ${isWinningSquare ? 'animate-pulse bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 shadow-xl' : ''}
          ${winner && !squares[index] ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={() => handleClick(index)}
        disabled={Boolean(squares[index]) || Boolean(winner)}
      >
        {squares[index] === 'X' ? (
          <X className="w-8 h-8 mx-auto" />
        ) : squares[index] === 'O' ? (
          <Circle className="w-8 h-8 mx-auto" />
        ) : null}
      </button>
    );
  };

  const getStatusMessage = () => {
    if (winner) {
      return `Joueur ${winner} a gagné ! 🎉`;
    } else if (squares.every(Boolean)) {
      return "Match nul ! 🤝";
    } else {
      return `Tour du joueur : ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white mr-4 shadow-lg">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tic-Tac-Toe
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Le jeu classique revisité avec un design moderne. À vous de jouer !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 mr-3" />
                  Plateau de Jeu
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col items-center">
                  {/* Status */}
                  <div className="mb-6 text-center">
                    <div className={`text-2xl font-bold mb-2 ${
                      winner ? 'text-green-600' : 
                      squares.every(Boolean) ? 'text-orange-600' : 
                      'text-blue-600'
                    }`}>
                      {getStatusMessage()}
                    </div>
                    {!winner && !squares.every(Boolean) && (
                      <div className="flex items-center justify-center space-x-4">
                        <div className={`flex items-center p-3 rounded-lg ${isXNext ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                          <X className="w-5 h-5 mr-2" />
                          <span className="font-medium">Joueur X</span>
                        </div>
                        <div className={`flex items-center p-3 rounded-lg ${!isXNext ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                          <Circle className="w-5 h-5 mr-2" />
                          <span className="font-medium">Joueur O</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Game Grid */}
                  <div className="grid grid-cols-3 gap-3 bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-2xl shadow-inner">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mt-8">
                    <Button 
                      onClick={resetGame}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Nouvelle Partie
                    </Button>
                    <Button 
                      onClick={resetHistory}
                      variant="outline"
                      className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Reset Score
                    </Button>
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
                  Score
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                      <X className="w-6 h-6 text-blue-600 mr-3" />
                      <span className="font-semibold text-blue-700">Joueur X</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{gameHistory.xWins}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="flex items-center">
                      <Circle className="w-6 h-6 text-purple-600 mr-3" />
                      <span className="font-semibold text-purple-700">Joueur O</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">{gameHistory.oWins}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <Users className="w-6 h-6 text-gray-600 mr-3" />
                      <span className="font-semibold text-gray-700">Matchs Nuls</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-600">{gameHistory.draws}</span>
                  </div>
                </div>

                {/* Total Games */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="text-sm text-green-600 font-medium">Total des Parties</div>
                    <div className="text-3xl font-bold text-green-700">
                      {gameHistory.xWins + gameHistory.oWins + gameHistory.draws}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePages;
