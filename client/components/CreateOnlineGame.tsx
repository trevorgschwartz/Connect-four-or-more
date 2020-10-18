import React, { useState, useEffect, FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../index'
import CreateGameEnterName from './CreateGameEnterName'
import socket from '../utilities/socketConnection'
import CreateGameRoomCode from './CreateGameRoomCode'

const CreateOnlineGame: FunctionComponent = () => {
    
    const [createGameView, setCreateGameView] = useState('enterName')

    const roomCode: string = useSelector((state: AppState) => state.roomCode)
    const playerOne: string = useSelector((state: AppState) => state.playerOne)
    const amountToWin: string = useSelector((state: AppState) => state.amountToWin)
    
    useEffect(() => {
        if (roomCode.length) socket.emit('create-room', roomCode, playerOne, amountToWin)
    }, [roomCode])

    return (
        <>
            { createGameView === 'enterName' && <CreateGameEnterName setCreateGameView={setCreateGameView} /> }
            { createGameView === 'playGame' &&  <CreateGameRoomCode />}
        </>
    )

}

export default CreateOnlineGame