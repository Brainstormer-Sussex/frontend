import React, {useEffect} from "react";
import { NavBar } from "../../components";
import * as THREE from 'three';

function Polysphere() {
   
  

  return (
    <div>
      <NavBar />
      <div className="flex justify-center m-12">
        <h1 className="text-5xl font-medium">Polysphere</h1>
      </div>
      <div className="grid grid-cols-2 gap-2 justify-center content-center flex ml-20 row">
        <div>
          <p>Polysphere</p>
        </div>
        <div id="kanoodle-3d">
            {}
        </div>
      </div>
    </div>
  );
}

export default Polysphere;
