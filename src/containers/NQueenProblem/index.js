import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    Header
} from '../../components'
import {
    chessBoardAction
} from '../../store/action'

import '../../App.css';
import Queen from '../../assets/images/queen.png'
import Queen1 from '../../assets/images/queen-1.png'
import { HELPER } from '../../utils';

function NQueenProblem() {
    let dispatch = useDispatch()
    const {
        searching,
        resultFound,
        dimensions,
        permutations,
        allPermutations
    } = useSelector((state) => state.chessboard)

    const [dimension, setDimension] = useState(dimensions);
    const [chess, setChess] = useState(100 / dimension);
    const [size, setSize] = useState(0);
    // const [clickedCell, setClickedCell] = useState(null);
    const [queens, setQueens] = useState();
    const [queenPositions, setQueenPositions] = useState([]);
    const [focusedPermutation, setFocusedPermutation] = useState([]);
    const [focusedPermutationCount, setFocusedPermutationCount] = useState(0);

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
        width: `${size * dimension}%`,
        height: `${size * dimension}%`,
        display: 'flex',
        flexWrap: 'wrap',
        border: ' black'
    }

    const makeChessBoard = () => {
        let arr = [];
        for (let i = 0; i < dimension; i++) {
            let temp = [];
            let cssStyle;
            let queenPositionFound;
            for (let j = 0; j < dimension; j++) {
                if ((i + j) % 2) {
                    queenPositionFound = queenPositions.find((position) => position.row === i && position.col === j);
                    cssStyle = { ...black, width: `${size}%`, height: `${size}%` };
                    if(queenPositionFound) {
                        cssStyle = { ...black, width: `${size}%`, height: `${size}%`, overflow: `hidden`, textAlign: `center` };
                    }
                } else {
                    queenPositionFound = queenPositions.find((position) => position.row === i && position.col === j);
                    cssStyle = { ...white, width: `${size}%`, height: `${size}%` };
                    if(queenPositionFound) {
                        cssStyle = { ...white, width: `${size}%`, height: `${size}%`, overflow: `hidden`, textAlign: `center` };
                    }
                }
                
                temp.push(
                    <div style={cssStyle} onClick={() => placeQueenOnChessBoard(i, j)} key={`i-${j}`}>
                        {queenPositionFound && (
                            <img src={Queen} alt={'Queen a'} style={{
                                height: `100%`, width: `auto`, verticalAlign: `bottom`
                            }} />
                        )}
                    </div>)
            }
            arr.push(temp);
        }
        setChess(arr)
    }

    
    const drawPossibleNQueenPermutations = () => {
        if(focusedPermutation) {
            let arr = [];
            for (let i = 0; i < dimension; i++) {
                let temp = [];
                let cssStyle;
                let queenPositionFound;
                for (let j = 0; j < dimension; j++) {
                    if ((i + j) % 2) {
                        queenPositionFound = focusedPermutation.find((position) => position.row === i && position.col === j);
                        cssStyle = { ...black, width: `${size}%`, height: `${size}%` };
                        if(queenPositionFound) {
                            cssStyle = { ...black, width: `${size}%`, height: `${size}%`, overflow: `hidden`, textAlign: `center` };
                        }
                    } else {
                        queenPositionFound = focusedPermutation.find((position) => position.row === i && position.col === j);
                        cssStyle = { ...white, width: `${size}%`, height: `${size}%` };
                        if(queenPositionFound) {
                            cssStyle = { ...white, width: `${size}%`, height: `${size}%`, overflow: `hidden`, textAlign: `center` };
                        }
                    }
                    
                    temp.push(
                        <div style={cssStyle} onClick={() => placeQueenOnChessBoard(i, j)} key={`i-${j}`}>
                            {queenPositionFound && (
                                <img src={Queen1} alt={'Queen a'} style={{
                                    height: `100%`, width: `auto`, verticalAlign: `bottom`
                                }} />
                            )}
                        </div>
                    )
                }
                arr.push(temp);
            }
            setChess(arr)
        }
    }

    const generateChessBoard = () => {
        if(!HELPER.isNotEmpty(queenPositions) || queenPositions === []){
            alert('Select queen position first');
        }else{
            const value = parseInt(dimension, 10);
            setQueens(isNaN(value) ? 0 : value);
        }
    }

    const handleChessBoardDimensions = (event) => {
        dispatch(chessBoardAction.RESET_NQUEEN_PERMUTATION_CHESSBOARD());
        setQueenPositions([])
        setDimension(parseInt(event.target.value));
        makeChessBoard();
    }

    const placeQueenOnChessBoard = async(row, col) => {
        if((searching || resultFound) && queenPositions !== []){
            alert('It is not allowed to move queen further. Possible permutation result should be loaded soon!!')
            return;
        }

        setQueenPositions([...queenPositions, { row, col }]);
        // setClickedCell({ row, col });
        makeChessBoard();

        const requestData = {
            dimensions: dimension,
            position: { row, col }
        };
        dispatch(chessBoardAction.GENERATE_NQUEEN_PERMUTATION_CHESSBOARD(requestData));
    };

    const showAllChessBoardPermutations = (index = 0) => {
        if(size > 0) {
            if(index in permutations){
                let _permutations = []; 
                permutations[index].map((value, key) => {
                    value.map((valueA, keyA) => {
                        if(valueA === 1) {
                            return _permutations.push({row: key, col: keyA})
                        }
                    })
                })
                setFocusedPermutation(_permutations);
                setFocusedPermutationCount(index+1);
            }else if(index === permutations.length && permutations.length > 0) {
                showAllChessBoardPermutations(0)
            }
            else {
                alert(`Permutation doesn't exists`)
            }
        }
    }

    useEffect(() => {
        setSize(100 / dimension);
        makeChessBoard();
    }, [dimension, size])
    
    useEffect(() => {
        makeChessBoard();
    }, [queenPositions])

    useEffect(() => {
        if(focusedPermutationCount < 1){
            showAllChessBoardPermutations(0);
        }
    }, [permutations])
    
    useEffect(() => {
        if(HELPER.isNotEmpty(focusedPermutation) && focusedPermutation !== []){
            drawPossibleNQueenPermutations()
        }
    }, [focusedPermutation])
    

    return (
        <div>
        <Header/>
        
      <br/>
      <br/>
      <br/>
      <br/>
            <div className='flex justify-center m-12'>
                <h1 className='text-5xl font-medium'>N-Queen</h1>
            </div>
            <div className='grid grid-cols-2 gap-2 justify-center content-center flex ml-20 row'>
                <div className='m-2 col-4'>
                    <p>N-Queen is a problem of placing N chess queens on an NxN chess board, so that no two queens can attack each other. </p>
                    <br />
                    <p>This means that there cannot be more than one queen in the same row, column or diaglonal line.</p>
                    <br />
                    <p>Enter a number to see the solutions: </p>
                    <input
                        value={dimension ?? ''} 
                        type="number"
                        placeholder='N'
                        className='border mt-6'
                        onChange={event => handleChessBoardDimensions(event)}
                    />
                    {
                        (searching || resultFound) ? "" : <button 
                            className='border flex mt-4 justify-center content-center rounded-2xl p-4 btn-chessboard'
                            onClick={generateChessBoard}
                        >Generate N-Queen permutations
                        </button>
                    }
                    {
                        (searching || resultFound) ? 
                        <>
                            <button 
                                className='border flex mt-4 justify-center content-center rounded-2xl p-4 all-btn-chessboard'
                                onClick={() => showAllChessBoardPermutations(focusedPermutationCount)}
                            >{focusedPermutationCount} / {permutations.length} possible permutations 
                            </button>
                            <button 
                                className='border flex mt-4 justify-center content-center rounded-2xl p-4 btn-chessboard'
                                // onClick={generateChessBoard}
                            >{allPermutations.length} total permutations on chessboard
                            </button>
                        </> : ""
                    }
                </div>
                <div className='m-2 col-6 flex ml-20 justify-center content-centerborder border'>
                    <section style={chessBoard} >
                        {chess}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default NQueenProblem