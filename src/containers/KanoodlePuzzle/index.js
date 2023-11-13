import React, { Fragment } from "react";
import useKanoodle from "./hooks/kanoodle";
import "./style.css";

const KanoodlePuzzle = () => {
  const { StartWorker, StopWorker } = useKanoodle();


  return (
    <Fragment>
      <button
        className='border flex mt-4 justify-center content-center rounded-2xl p-4 all-btn-chessboard'
        id="startbtn"
        onClick={() => StartWorker()}
      >Start Worker
      </button>
      <p>Solutions found: <span id="solcnt">0</span></p>
      <button
        className='border flex mt-4 justify-center content-center rounded-2xl p-4 disabled'
        id="startbtn"
        onClick={() => StopWorker()}
      >Stop
      </button>
      <div id="work"></div>
      <div id="results"></div>
      <div id="debug"></div>
    </Fragment>
  );
};

export default KanoodlePuzzle;
