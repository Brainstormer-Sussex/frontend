import React, {useState, useEffect}from 'react'
import NavBar from '../Components/NavBar'
import '../App.css';
import Queen from '../Components/queen.png'

const NQueen = () => {

        const [dimension, setDimension] = useState(0);
        const [chess, setChess] = useState([]);
        const [size, setSize] = useState(0);
        const [clickedCell, setClickedCell] = useState(null);
        const [queens, setQueens] = useState();
        const [queenPositions, setQueenPositions] = useState([]);
        

        const black = {
            width: `${size}%`, 
            height: `${size}%`,
            backgroundColor: 'black'
        }
    
        const white = {
            width: `${size}%`, 
            height: `${size}%`,
            backgroundColor: 'white'
        }
    
        const chessBoard = {
            width:  `${size * dimension}%`,
            height: `${size * dimension}%`,
            display: 'flex',
            flexWrap: 'wrap',
            border: ' black'
        }

        const  handleInput = (event) =>
        {
            const value = parseInt(event.target.value, 10);
            setDimension(value);
        }

        const handleButton = () => {
            makeChessBoard();
            const value = parseInt(dimension, 10);
            //setQueens(isNaN(value) ? 0 : value);
        }


        const handleCellClick = (row, col) => {
            console.log(row,col);
            setQueenPositions([...queenPositions, { row, col }]);
            console.log(queenPositions);
            setClickedCell({ row, col });
          };

        const makeChessBoard = () => {
            let arr = [];
            for(let i = 0; i < dimension; i++){
                let temp = [];
                for (let j = 0; j < dimension; j++){
                    if((i+j)%2){
                        temp.push(
                        <div style={{...black, width: `${size}%`, height: `${size}%` }} onClick={() => handleCellClick(i, j)}>
                            {queenPositions.find((position) => position.row === i && position.col === j) && (
                                <img src={Queen} alt={'Queen'} width={`$100%`} height={`100%`} />
                            )}
                        </div>)
                    }else {
                        temp.push(<div style={{ ...white, width: `${size}%`, height: `${size}%` }} onClick={() => handleCellClick(i, j)}>
                            {queenPositions.find((position) => position.row === i && position.col === j) && (
                                <img src={Queen} alt={'Queen'} width={`${size}%`} height={`${size}%`} />
                            )}
                        </div>)
                    }
                }
                arr.push(temp);
            }
            setChess(arr)
        }
    
        useEffect(() => {
            setSize(100/dimension);
            //console.log(queens);
            //makeChessBoard();
        }, [dimension, size])
        
  return (
    <div className='w-screen'>
        <NavBar/>
        <div className='flex justify-center m-12'>
            <h1 className='text-5xl font-medium'>N-Queen</h1>
        </div>
        <div className='grid grid-cols-2 gap-12 justify-center content-center flex ml-20'>
            <div className='m-4 ' style={{height: '500px', width: '500px' }}>
                <p>N-Queen is a problem of placing N chess queens on an NxN chess board, so that no two queens can attack each other. </p>
                <br/>
                <p>This means that there cannot be more than one queen in the same row, column or diaglonal line.</p>
                <br/>
                <p>Enter a number to see the solutions: </p>
                <input type="number" placeholder='N' className='border mt-6' onChange={e => handleInput(e)}/>
                <button className='border flex mt-4 justify-center content-center rounded-2xl hover:cursor-pointer hover:bg-slate-300 hover:text-white p-4'
                    onClick={handleButton}
                >Generate chess board </button>
            </div>
            <div className='m-4 flex ml-20 justify-center content-centerborder border' style={{height: '500px', width: '500px' }}>      
                <section style={chessBoard} >
                    {chess}
                </section>  
            </div>
        </div>
    </div>
  )
}

export default NQueen