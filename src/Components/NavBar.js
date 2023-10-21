import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft} from "react-icons/fi";
const NavBar = () => {

    let navigate = useNavigate();


  return (
    <div className='border flex justify-between p-2 relative w-screen'>
       <div className='flex hover:cursor-pointer' >
        <FiChevronLeft  onClick={ () => {navigate('/')}}/>
       </div>
       
        <div className='flex hover:cursor-pointer underline' >
            N-Queen
        </div>
    </div>

  )
}

export default NavBar