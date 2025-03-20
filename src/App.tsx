import { useState } from "react";
import { Chessboard } from "react-chessboard";
import "./App.css";

// Función para personalizar piezas
function customPieces() {
  return {
    wP: ({ squareWidth }: { squareWidth: number }) => (
      <div
        style={{
          width: squareWidth,
          height: squareWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/images/space-marine.png"
          alt="Space Marine"
          style={{
            width: squareWidth * 0.8,
            height: squareWidth * 0.8,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    bP: ({ squareWidth }: { squareWidth: number }) => (
      <div
        style={{
          width: squareWidth,
          height: squareWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/images/tyranid.png"
          alt="Tyranid"
          style={{
            width: squareWidth * 0.8,
            height: squareWidth * 0.8,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
  };
}

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

  // Estado para rastrear la casilla seleccionada
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  // Estado para rastrear los cuadrados marcados con click derecho
  type SquareStyles = {
    [square: string]: { backgroundColor?: string } | undefined;
  };
  const [rightClickedSquares, setRightClickedSquares] = useState<SquareStyles>(
    {}
  );

  // Estado para mostrar opciones de movimiento
  type MoveSquares = {
    [square: string]: { background?: string; borderRadius?: string };
  };
  const [moveSquares, setMoveSquares] = useState<MoveSquares>({});

  // Función para manejar el clic en un cuadrado
  function onSquareClick(square: string) {
    // Si no hay una pieza seleccionada, intenta seleccionar una
    if (!selectedSquare) {
      // Verificar si hay una pieza en el cuadrado
      if (position[square]) {
        setSelectedSquare(square);

        // Mostrar las casillas adyacentes donde se puede mover
        const possibleMoves: MoveSquares = {};
        // Marcar la casilla seleccionada
        possibleMoves[square] = {
          background: "rgba(255, 255, 0, 0.4)",
        };

        // Mostrar posibles movimientos (en este caso simple, todas las casillas circundantes)
        // Todas las casillas del tablero son posibles destinos (sin restricciones de ajedrez)
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            const file = String.fromCharCode(97 + i); // 97 es 'a' en ASCII
            const rank = j + 1;
            const targetSquare = `${file}${rank}`;

            // No incluir la casilla actual
            if (targetSquare !== square) {
              possibleMoves[targetSquare] = {
                background: "rgba(0, 0, 0, 0.1)",
                borderRadius: "50%",
              };
            }
          }
        }
        setMoveSquares(possibleMoves);
      }
    }
    // Si ya hay una pieza seleccionada, intenta moverla
    else {
      // Si hace clic en la misma casilla, deselecciónela
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setMoveSquares({});
      }
      // Si hace clic en otra casilla, mueva la pieza
      else {
        const newPosition = { ...position };
        // Solo mover si hay una pieza en la casilla seleccionada
        if (newPosition[selectedSquare]) {
          // Mover la pieza
          newPosition[square] = newPosition[selectedSquare];
          delete newPosition[selectedSquare];

          // Actualizar la posición
          setPosition(newPosition);
        }

        // Limpiar la selección y los resaltados
        setSelectedSquare(null);
        setMoveSquares({});
      }
    }
  }

  // Función para manejar el clic derecho en un cuadrado (para marcar)
  function onSquareRightClick(square: string) {
    const color = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square]?.backgroundColor === color
          ? undefined
          : { backgroundColor: color },
    });
  }

  const boardWrapper = {
    width: "600px",
    maxWidth: "100%",
    margin: "0 auto",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "10px 15px",
    marginRight: "10px",
    cursor: "pointer",
    fontSize: "16px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "4px",
  };

  // Función para reiniciar el tablero a la posición inicial
  function resetBoard() {
    setPosition({
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
    setSelectedSquare(null);
    setMoveSquares({});
    setRightClickedSquares({});
  }

  return (
    <div className="app-container">
      <h1>Imperium Tactics</h1>
      <div style={boardWrapper}>
        <Chessboard
          id="ImperiumTactics"
          animationDuration={200}
          arePiecesDraggable={false}
          position={position}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          customPieces={customPieces()}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
          customSquareStyles={{
            ...moveSquares,
            ...rightClickedSquares,
          }}
        />
        <div className="button-container">
          <button style={buttonStyle} onClick={resetBoard}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
