import { useState } from "react";
import { Header } from "../../components";
// import {
//     DndContext,
//     DragOverlay,
//     useDraggable,
//     useDroppable,
//   } from '@dnd-kit/core';
import Pieces from "./Pieces";


function Kanoodle() {




  const [boardLayout, setBoardLayout] = useState([
    // Define your Kanoodle board layout here
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  ]);



  const makeBoard = () => {
    return boardLayout.map((arr, i) => (
       

      <div className="flex" key={i}>
      {arr.map((arr2, j) => (
          <div key={`${i}-${j}`} className="border bg-red-400 w-16 h-16">
            { boardLayout[i][j]}
           </div>
         ))}
       </div> 
    ))}
      



  return (
    <div>
        
      <Header />
      {/* <DndContext> */}
      <div className="flex justify-center m-12">
        <h1 className="text-5xl font-medium">Kanoodle</h1>
      </div>
      <div className='m-6 col-3'>
        <p>Kanoodle is a puzzle game where you arrange puzzle pieces so that they all fit in the board</p>
        <p>Add a piece to the board, you may rotate it. Find out all possible solutions</p>
        <p>Try it yourself!</p>
        <br />
      </div>
      <div className='grid grid-cols-2 gap-2 justify-center content-center flex '>
        <div className="flex flex-wrap justify-center content-center">
        <Pieces/>
        </div>
        <div className="flex flex-wrap justify-center content-center ">
            {makeBoard()}
        </div>
        
      </div>
      {/* </DndContext> */}
    </div>
    
  );
}

export default Kanoodle;
