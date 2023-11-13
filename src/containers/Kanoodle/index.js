import { useState } from "react";
import { NavBar } from "../../components";
import { Draggable, Droppable} from 'react-drag-and-drop';

function Kanoodle() {
    const [pieces, setPieces] = useState([])
    const piece1 = [
        [1,1],
        [1,0],
        [1,0],
        [1,0]
    ]

    const piece2 = [
        [0,1,0],
        [1,1,1],
        [0,1,0]
    ]

    const piece3 = [
        [1,1,1],
        [0,0,1],
        [0,0,1]
    ]

    const piece4 = [
        [1,0,0],
        [1,1,1]
    ]

    const piece5 = [
        [0,1],
        [1,1],
        [0,1],
        [0,1]
    ]

    const piece6 = [
        [1,1],
        [1,1]
    ]

    const piece7 = [
        [1,0],
        [1,1],
        [0,1],
        [0,1]
    ]

    const piece8 = [
        [1,1,0],
        [0,1,1],
        [0,0,1]
    ]

    const piece9 = [
        [1,1],
        [1,0]
    ]

    const piece10 = [
        [1,1,1],
        [0,1,1]
    ]

    const piece11 = [
        [1,1],
        [0,1],
        [1,1]
    ]

    const piece12 = [
        [1,1,1,1]
    ]

  const [boardLayout, setBoardLayout] = useState([
    // Define your Kanoodle board layout here
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  ]);


const PieceDisplay = ({ piece, colour }) => {
    // const [{ isDragging }, ref] = useDrag({
    //     type: 'PIECE',
    //     item: { piece, colour },
    //   });
    return (
        
        <div className=" m-2"
        // style={{opacity: isDragging ? 0.5 : 1,
        //     cursor: 'pointer',}}
        >
            <Draggable>
            {piece.map((row, rowIndex) => (
                <div key={rowIndex} className="flex ">
                    {row.map((cell,colIndex) => (
                        <div
                            key={colIndex}
                            className={`w-20 h-20 ${cell === 1 ? `${colour} border` : 'bg-white'}`}
                        ></div>
                    ))}
                </div>
            ))}
            </Draggable>
        </div>
    )
}


  const makeBoard = () => {
    return boardLayout.map((arr, i) => (
      <div className="flex" key={i}>
        {arr.map((arr2, j) => (
          <div key={`${i}-${j}`} className="border bg-red-400 w-20 h-20">
           { boardLayout[i][j]}
          </div>
        ))}
      </div>
    ));
  };



  return (
    <div>
      <NavBar />
      <div className="">{makeBoard()}</div>
      <div className="flex flex-wrap">
        <Droppable><PieceDisplay piece={piece1} colour="bg-blue-700"/></Droppable>
        <PieceDisplay piece={piece2} colour="bg-gray-500"/>
        <PieceDisplay piece={piece3} colour="bg-yellow-300"/>
        <PieceDisplay piece={piece4} colour="bg-cyan-200"/>
        <PieceDisplay piece={piece5} colour="bg-green-400"/>
        <PieceDisplay piece={piece6} colour="bg-red-500"/>
        <PieceDisplay piece={piece7} colour="bg-orange-400"/>
        <PieceDisplay piece={piece8} colour="bg-purple-400"/>
        <PieceDisplay piece={piece9} colour="bg-pink-400"/>
        <PieceDisplay piece={piece10} colour="bg-indigo-400"/>
        <PieceDisplay piece={piece11} colour="bg-blue-500"/>
        <PieceDisplay piece={piece12} colour="bg-teal-300"/>
      </div>

      {/* <div className="piece-display">
      {piece1.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
                style={{ }}
               className={`border w-20 h-20 ${cell === 1 ? 'bg-gray-800' : 'bg-gray-200'}`}
            ></div>
          ))}
        </div>
      ))}
    </div> */}
      </div>
    
  );
}

export default Kanoodle;
