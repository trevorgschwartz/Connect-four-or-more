import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTimerRunningPlayerTwo } from "../actions"
import { AppState } from '../index'
import useInterval from './UseInterval'

const SpeedGameTimerPlayerTwo = () => {
    
    const speedTimer: number[] = useSelector((state: AppState) => state.speedTimer)
    const player: string = useSelector((state: AppState) => state.playerTwo[0])
    const playerTurn = useSelector((state: AppState) => state.playerTurn)
    const gameWon = useSelector((state: AppState) => state.gameWon)

    const dispatch = useDispatch()

    const [isRunning, setIsRunning] = useState(true)

    useEffect(() => {
        if (playerTurn[0] !== player) setIsRunning(false)
        if (playerTurn[0] === player) setIsRunning(true)
        if (gameWon[0]) setIsRunning(false)
      }, [player, playerTurn, gameWon])
      
      useInterval(() => {
        dispatch(setTimerRunningPlayerTwo())
      }, isRunning ? 1000 : null);

    return (
        <>
            {gameWon[0] && gameWon[1][0] === player ?
            <div className="timeLeft">{player} wins!</div>
            : null
            }
            {gameWon[0] && gameWon[1][0] !== player ?
            <div className="timeLeft">{player} loses!</div>
            : null
            }
            {!gameWon[0] ?
            <div className='timeLeft'>Time Left: {speedTimer[1]} seconds</div>
            : 
            gameWon[1] && speedTimer[1] !== 0 ?
            <div className='timeLeft'>Time Left: {speedTimer[1]} seconds</div>
            : gameWon[0] && speedTimer[1] === 0 ?
            <div className='timeLeft'>You ran out of time!</div>
            : null
            }
        </>
    )
}

export default SpeedGameTimerPlayerTwo