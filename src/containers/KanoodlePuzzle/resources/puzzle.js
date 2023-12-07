import * as React from 'react';
import { useState } from 'react';
import { Divider, Grid } from '@mui/material';

const PieceDisplay = ({ piece, colour, theme }) => {
    return (
      <div className="m-3  w-25">
        {piece.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`w-10 h-10 ${cell === 1 ? `${colour} border` : 'bg-white'} ${cell === 1 ? `c${theme}` : ""} `} //
              ></div>
            ))}
          </div>
        ))}
      </div>
    )
  }
  
  
  const piece1 = {
    piece: [
      [1, 1],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    Name: 'L'
  }
  
  const piece2 = {
    piece: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    Name: 'l'
  }
  
  const piece3 = {
    piece: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1]
    ],
    Name: 'i'
  }
  
  const piece4 = {
    piece: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    Name: 'N'
  }
  
  const piece5 = {
    piece: [
      [0, 1],
      [1, 1],
      [0, 1],
      [0, 1]
    ],
    Name: 'V'
  }
  
  const piece6 = {
    piece: [
      [1, 1],
      [1, 1]
    ],
    Name: 'Y'
  }
  
  const piece7 = {
    piece: [
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 1]
    ],
    Name: 'P'
  }
  
  const piece8 = {
    piece: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1]
    ],
    Name: 'S'
  }
  
  const piece9 = {
    piece: [
      [1, 1],
      [1, 0]
    ],
    Name: 'U'
  }
  
  const piece10 = {
    piece: [
      [1, 1, 1],
      [0, 1, 1]
    ],
    Name: 'X'
  }
  
  const piece11 = {
    piece: [
      [1, 1],
      [0, 1],
      [1, 1]
    ],
    Name: 'I'
  }
  
  const piece12 = {
    piece: [
      [1, 1, 1, 1]
    ],
    Name: 'W'
  }

export default function Puzzle(props) {
    // const [boardLayout, setBoardLayout] = useState([
    //     // Define your Kanoodle board layout here
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // ]);
    const [boardLayout, setBoardLayout] = useState([
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    const movePiece = (dragIndex, hoverIndex) => {
        // const dragCard = cards[dragIndex];
        // setCards(
        //   update(cards, {
        //     $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        //   })
        // );
      };

    return <>
        <Grid
            item
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '24vh' }}
        >
            
    <Grid
      item
      xs={12}
      md={8}
      className=''
    >
      <Divider />
        <div className="d-flex">
          <PieceDisplay piece={piece1.piece} theme={piece1.Name} colour="bg-blue-700" />
          <PieceDisplay piece={piece2.piece} theme={piece2.Name} colour="bg-gray-500" />
          <PieceDisplay piece={piece3.piece} theme={piece3.Name} colour="bg-yellow-300" />
          <PieceDisplay piece={piece4.piece} theme={piece4.Name} colour="bg-cyan-200" />
          <PieceDisplay piece={piece5.piece} theme={piece5.Name} colour="bg-green-400" />
          <PieceDisplay piece={piece6.piece} theme={piece6.Name} colour="bg-red-500" />
        </div>
        <div className="d-flex">
          <PieceDisplay piece={piece7.piece} theme={piece7.Name} colour="bg-orange-400" />
          <PieceDisplay piece={piece8.piece} theme={piece8.Name} colour="bg-purple-400" />
          <PieceDisplay piece={piece9.piece} theme={piece9.Name} colour="bg-pink-400" />
          <PieceDisplay piece={piece10.piece} theme={piece10.Name} colour="bg-indigo-400" />
          <PieceDisplay piece={piece11.piece} theme={piece11.Name} colour="bg-blue-500" />
          <PieceDisplay piece={piece12.piece} theme={piece12.Name} colour="bg-teal-300" />
        </div>
    </Grid>
        </Grid>
    </>;
}