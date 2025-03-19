import { useState } from "react";
import { Chessboard } from "react-chessboard";
import "./App.css";

function App() {
  // Posición inicial estándar del ajedrez con todas las piezas
  type Position = { [square: string]: string };
  const [position, setPosition] = useState<Position>({
    a8: "bR",
    b8: "bN",
    c8: "bB",
    d8: "bQ",
    e8: "bK",
    f8: "bB",
    g8: "bN",
    h8: "bR",
    a7: "bP",
    b7: "bP",
    c7: "bP",
    d7: "bP",
    e7: "bP",
    f7: "bP",
    g7: "bP",
    h7: "bP",
    a2: "wP",
    b2: "wP",
    c2: "wP",
    d2: "wP",
    e2: "wP",
    f2: "wP",
    g2: "wP",
    h2: "wP",
    a1: "wR",
    b1: "wN",
    c1: "wB",
    d1: "wQ",
    e1: "wK",
    f1: "wB",
    g1: "wN",
    h1: "wR",
  });

  // Función simple para mover piezas
  function onDrop(sourceSquare: string, targetSquare: string) {
    const newPosition = { ...position };

    // Mover la pieza
    newPosition[targetSquare] = newPosition[sourceSquare];
    delete newPosition[sourceSquare];

    setPosition(newPosition);
    return true;
  }

  return (
    <div className="app-container">
      <div className="board-container">
        <Chessboard
          position={position}
          onPieceDrop={onDrop}
          boardWidth={800}
          areArrowsAllowed={true}
        />
      </div>
    </div>
  );
}

export default App;
