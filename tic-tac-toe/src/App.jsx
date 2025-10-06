import { useState } from "react";

const Square = ({ value, onSquareClick }) => {
  return (
    <button
      className="square  text-4xl w-20 h-20  rounded-xl bg-blue-100 text-font-bold cursor-pointer border"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

function Board({ XIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (XIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (XIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="grid grid-cols-2">
        <div className=" game-board  p-6 text-center">
          <h2 className="text-blue-200 text-5xl m-6">Tic-Tac-Toe</h2>
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row ">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
        <div className="status text-6xl p-6 py-36 text-center text-blue-200">
          {status}
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const XIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Restart Game";
    }
    return (
      <>
        <button
          className="bg-blue-100 p-3 m-3 text-xl font-bold rounded-2xl "
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board XIsNext={XIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info grid grid-cols-3">{moves}</div>
    </div>
  );
}
