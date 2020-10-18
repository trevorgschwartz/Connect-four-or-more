import React, { FunctionComponent, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAmountToWin, setPlayerOne, setLocalPlayer, setRoomCode } from '../actions/index'
import { AppState } from '../index'
/* @ts-ignore  */
import randomWords from 'random-words'

interface LinkDispatchProps {
    setCreateGameView: (view: string) => void
}

const CreateGameEnterName:FunctionComponent<LinkDispatchProps> = ({ setCreateGameView }) => {
    
    const playerOne: string[] | string = useSelector((state: AppState) => state.playerOne)
    const amountToWin: string = useSelector((state: AppState) => state.amountToWin)

    const dispatch = useDispatch()

    const handleCreateGameNameAndWinAmountSubmit = () => {
        dispatch(setLocalPlayer(playerOne))
        const newRoom = randomWords({ exactly: 2, join: '', maxLength: 4 });
        dispatch(setRoomCode(newRoom))
        setCreateGameView('getCode')
    }
    
    return (
        <>
            <label className="createOrJoinGamePlayerName LatoText">Player Name</label>
            <input className='createOrJoinGameNameInput LatoText' type='text' value={playerOne[0]} onChange={(e) => dispatch(setPlayerOne([e.target.value, 'Red']))}></input>
            <label className='createGameWinAmountLabel LatoText' >Win Amount</label>
            <input className="createGameWinAmountInput LatoText" type="number" min="2" max="6" value={amountToWin} onChange={(e) => dispatch(setAmountToWin(e.target.value))}></ input>
            <button className='createOrJoinGameSubmitButton LatoText' onClick={handleCreateGameNameAndWinAmountSubmit}>Submit</button>
            
        </>
    )
}

export default CreateGameEnterName