import React, { useState, FunctionComponent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../index'
import { setPlayerTwo, setLocalPlayer, setSecondPlayerRoomCode, setView } from '../actions/index'

const JoinOnlineGame: FunctionComponent = () => {
    const [localRoomCode, setLocalRoomCode] = useState('')

    const playerTwo: string[] | string = useSelector((state: AppState) => state.playerTwo)

    const dispatch = useDispatch()

    const handleNameAndCodeRoomSubmit = () => {
        dispatch(setLocalPlayer(playerTwo))
        dispatch(setSecondPlayerRoomCode(localRoomCode))
        dispatch(setView('game'))
    }

    return (
        <>
            <label className="createOrJoinGamePlayerName LatoText">Player Name</label>
            <input className='createOrJoinGameNameInput LatoText' type='text' value={playerTwo[0]} onChange={(e) => dispatch(setPlayerTwo([e.target.value, 'Black']))}></input>
            <label className='joinGameEnterGameCodeText LatoText' >Enter Game Code</label>
            <input className='joinGameEnterGameCodeInput LatoText' type='text' value={localRoomCode} onChange={(e) => setLocalRoomCode(e.target.value)}></input>
            <button className='createOrJoinGameSubmitButton LatoText' onClick={handleNameAndCodeRoomSubmit}>Submit</button>
        </>
    )
}

export default JoinOnlineGame