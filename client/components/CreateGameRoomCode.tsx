import React, { FunctionComponent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setView } from '../actions/index'
import { AppState } from '../index'
import { setStartSpeedPlay, setReadyToPlay, setPlayerOneReadyToPlay } from '../actions'
import socket from '../utilities/socketConnection'


const CreateGameRoomCode:FunctionComponent = () => {

    const gameCode: string = useSelector((state: AppState) => state.roomCode)
    const speedPlay = useSelector((state: AppState) => state.speedPlay)

    const dispatch = useDispatch()

    const handleStartGame = () => {
        // if (!speedPlay) {
        //     console.log('startSpeedPlay hit')
        //     dispatch(setStartSpeedPlay(true))
        //     socket.emit('start-timer', gameCode)
        // }
        dispatch(setView('game'))
        dispatch(setReadyToPlay(true))
        dispatch(setPlayerOneReadyToPlay(true))
        socket.emit('player-one-ready', gameCode)
    }
    
    return (
        <>
            <label className="createGameGameCodeNotice LatoText">Game Code:</label>
            <label className="createGameGameCode LatoText">{gameCode}</label>
            <button className='startGameCreateGame LatoText' onClick={handleStartGame} >Start Game!</button>
        </>
    )
}

export default CreateGameRoomCode