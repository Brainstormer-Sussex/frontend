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
       
        <div className='flex hover:cursor-pointer underline' >
            N-Queen
        </div>
    </div>

  )
}

export default NavBar