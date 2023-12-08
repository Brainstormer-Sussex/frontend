import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft} from "react-icons/fi";
import { ROUTE_CONSTANTS } from '../../utils';
const NavBar = () => {
    let navigate = useNavigate();


  return (
    <div className='border flex justify-between p-2 relative'>
       <div className='flex hover:cursor-pointer' >
        <FiChevronLeft  onClick={ () => {navigate(ROUTE_CONSTANTS.BASE)}}/>
       </div>
       <div className=''>
          <div className=' border  hover:cursor-pointer underline m-2 hover:bg-slate-300' onClick={ () => {navigate(ROUTE_CONSTANTS.NQUEEN)}}>
              N-Queen
          </div>
          <div className='  hover:cursor-pointer underline m-2 hover:bg-slate-300' onClick={ () => {navigate(ROUTE_CONSTANTS.KANOODLE)}}>
              Kanoodle
          </div>
          <div className='  hover:cursor-pointer underline m-2 hover:bg-slate-300' onClick={ () => {navigate(ROUTE_CONSTANTS.KANOODLE_PUZZLE)}}>
              Kanoodle puzzle
          </div>
        </div>
        

    </div>

  )
}

export default NavBar