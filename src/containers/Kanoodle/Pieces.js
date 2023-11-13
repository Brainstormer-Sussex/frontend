import React, { useEffect, useRef, useState } from "react";

function Pieces() {
  const piece1 = [
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ];

  const piece2 = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];

  const piece3 = [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ];

  const piece4 = [
    [1, 0, 0],
    [1, 1, 1],
  ];

  const piece5 = [
    [0, 1],
    [1, 1],
    [0, 1],
    [0, 1],
  ];

  const piece6 = [
    [1, 1],
    [1, 1],
  ];

  const piece7 = [
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 1],
  ];

  const piece8 = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ];

  const piece9 = [
    [1, 1],
    [1, 0],
  ];

  const piece10 = [
    [1, 1, 1],
    [0, 1, 1],
  ];

  const piece11 = [
    [1, 1],
    [0, 1],
    [1, 1],
  ];

  const piece12 = [[1, 1, 1, 1]];

  const pieceNames = [
    piece1,
    piece2,
    piece3,
    piece4,
    piece5,
    piece6,
    piece7,
    piece8,
    piece9,
    piece10,
    piece11,
    piece12,
  ];

  const pieceColours = [
    "bg-blue-700",
    "bg-gray-500",
    "bg-yellow-300",
    "bg-cyan-200",
    "bg-green-400",
    "bg-red-500",
    "bg-orange-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-blue-500",
    "bg-teal-300",
  ];

  const [activePieceIndex, setActivePieceIndex] = useState(0);

  const [pieceRotations, setPieceRotations] = useState(
    new Array(pieceNames.length).fill(0)
  );

  const rotatePiece = (degrees, piece) => {
    setPieceRotations((prevRotations) => ({
      ...prevRotations,
      [activePieceIndex]: (prevRotations[activePieceIndex] + degrees) % 360,
    }));

    const rows = piece.length;
    const cols = piece[0].length;

    // const rotatedArray = new Array(cols)
    //   .fill(null)
    //   .map(() => new Array(rows).fill(null));
    const rotatedPiece = new Array(cols).fill(null).map(() => new Array(rows).fill(null));
    console.log(rotatedPiece);
    if (degrees === 90) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          rotatedPiece[j][rows - 1 - i] = piece[i][j];
        }
      }
    } else if (degrees === -90) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          rotatedPiece[cols - 1 - j][i] = piece[i][j];
        }
      }
    }

    pieceNames[activePieceIndex] = rotatedPiece;
    //console.log(pieceNames[activePieceIndex]);
    return rotatedPiece;
  };

  const nextPiece = () => {
    setActivePieceIndex((activePieceIndex + 1) % pieceNames.length);
  };

  const previousPiece = () => {
    setActivePieceIndex(
      (activePieceIndex - 1 + pieceNames.length) % pieceNames.length
    );
  };

  const PieceDisplay = ({ piece, colour, isPlaced, pieceName }) => {
    const rotation = pieceRotations[activePieceIndex];
    return (
      <div
        className={`m-2 ${isPlaced ? "absolute" : ""}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {piece.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`w-16 h-16 ${
                  cell === 1 ? `${colour} border` : "bg-white"
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex">
        <PieceDisplay
          piece={pieceNames[activePieceIndex]}
          colour={pieceColours[activePieceIndex]}
          pieceName={activePieceIndex}
        />
      </div>
      <br />

      <div className="">
        <div className="flex ">
          <div className="border rounded-full w-10 flex justify-center content-center hover:cursor-pointer hover:bg-slate-300 hover:text-white">
            <button onClick={() => previousPiece()}>←</button>
          </div>

          <div
            onClick={() => rotatePiece(-90, pieceNames[activePieceIndex])}
            className=" border rounded-full w-10 flex justify-center content-center hover:cursor-pointer hover:bg-slate-300 hover:text-white"
          >
            <p className="text-4xl font-bold">⟲</p>
          </div>
          <div
            onClick={() => rotatePiece(90, pieceNames[activePieceIndex])}
            className=" border rounded-full w-10 ml-2 flex justify-center content-center hover:cursor-pointer hover:bg-slate-300 hover:text-white"
          >
            <p className="text-4xl font-bold pl-2 pr-2 pb-1 ">⟳</p>
          </div>
          <div className="border rounded-full w-10 flex justify-center content-center hover:cursor-pointer hover:bg-slate-300 hover:text-white">
            <button onClick={() => nextPiece()}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pieces;
