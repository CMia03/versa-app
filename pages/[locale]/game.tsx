import { useState } from "react";
import { Typography } from "@/components/ui/Typography";

const GamePages = () => {
  // Typage explicite de squares
  const [squares, setSquares] = useState<Array<"X" | "O" | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<"X" | "O" | null>(null); // Typage du winner

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
    setWinner(calculateWinner(newSquares));
  };

  const renderSquare = (index: number) => {
    return (
      <button
        className="w-24 h-24 text-4xl font-bold border-2 border-gray-400 rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none disabled:bg-gray-100"
        onClick={() => handleClick(index)}
        disabled={Boolean(squares[index]) || Boolean(winner)}
      >
        {squares[index]}
      </button>
    );
  };
  return (
    <div className="flex flex-col items-center mt-20">
      <div className="grid grid-cols-3 gap-2">
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
      {winner && <div className="mt-4 text-2xl font-semibold text-green-400">{winner}  <Typography variant="p">Vous avez gagné !!</Typography></div>}
      {!winner && squares.every(Boolean) && <div className="mt-4 text-2xl font-semibold"><Typography variant="p">Match null !!</Typography></div>}
    </div>
  );
};

export default GamePages;
