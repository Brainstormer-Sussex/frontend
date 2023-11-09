import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../utils';

function Home(){

    let navigate = useNavigate();

  return (
    <div className='grid h-screen flex justify-center content-center '>
        <h1 className= 'text-5xl font-bold' > Group 11 </h1>
        <div className='border flex justify-center content-center m-4 rounded-2xl hover:cursor-pointer hover:bg-slate-300 hover:text-white' onClick={() => {navigate(ROUTE_CONSTANTS.HOME)}}>
            <p className='m-2'>N-Queen</p>
            
        </div>
        <div className='border flex justify-center content-center m-4 rounded-2xl hover:cursor-pointer hover:bg-slate-300 hover:text-white' onClick={() => {navigate(ROUTE_CONSTANTS.KANOODLE)}}>
            <p className='m-2'>Kanoodle</p>
        </div>
    </div>
  )
}

export default Home
