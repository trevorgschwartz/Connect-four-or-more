import React, { FunctionComponent, MouseEvent, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAmountToWin, setPlayerOne, setLocalPlayer, setRoomCode, setSpeedPlay, setSpeedTimer } from '../actions/index'
import { AppState } from '../index'
/* @ts-ignore  */
import randomWords from 'random-words'

interface LinkDispatchProps {
    setCreateGameView: (view: string) => void
}

const CreateGameEnterName:FunctionComponent<LinkDispatchProps> = ({ setCreateGameView }) => {
    
    const playerOne: string[] = useSelector((state: AppState) => state.playerOne)
    const amountToWin: string = useSelector((state: AppState) => state.amountToWin)
    const speedPlay: boolean = useSelector((state: AppState) => state.speedPlay)
    const speedTimer: string = useSelector((state: AppState) => state.speedTimer)

    const dispatch = useDispatch()

    const handleCreateGameNameAndWinAmountSubmit = () => {
        dispatch(setLocalPlayer(playerOne))
        const newRoom = randomWords({ exactly: 2, join: '', maxLength: 4 });
        dispatch(setRoomCode(newRoom))
        setCreateGameView('getCode')
    }
    
    const handleSpeedPlayButtonClick = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(setSpeedPlay(!speedPlay))
      }

    const handleSpeedPlayEntry = (e: ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
        dispatch(setSpeedTimer(e.target.value))
    }

    }
    
    return (
        <>
            <label className="createOrJoinGamePlayerName LatoText">Player Name</label>
            <input className='createOrJoinGameNameInput LatoText' type='text' value={playerOne[0]} onChange={(e) => dispatch(setPlayerOne([e.target.value, 'Red']))}></input>
            <label className='createGameWinAmountLabel LatoText' >Win Amount</label>
            <input className="createGameWinAmountInput LatoText" type="number" min="2" max="6" value={amountToWin} onChange={(e) => dispatch(setAmountToWin(e.target.value))}></ input>
            <button className='createOrJoinGameSubmitButton LatoText' onClick={handleCreateGameNameAndWinAmountSubmit}>Submit</button>
            <button className="createGameSpeedPlay LatoText" onClick={handleSpeedPlayButtonClick}>Speed Play?</button>
            {speedPlay ? <input type="number" min="2" max="10000" className="LatoText onlineSpeedPlay" placeholder='Enter Seconds' value={speedTimer[0]} onChange={handleSpeedPlayEntry} /> : null}
            
        </>
    )
}

export default CreateGameEnterName