import React, { ChangeEvent, FormEvent, FunctionComponent, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAmountToWin, setPlayerOne, setPlayerTwo, setView, setPlayingOnlineOrNot, setSpeedPlay, setSpeedTimer, setStartSpeedPlay } from '../actions/index'
import { AppState } from '../index'

const PlayerInput: FunctionComponent = () => {

  const playerOne: string[] = useSelector((state: AppState) => state.playerOne)
  const playerTwo: string[] = useSelector((state: AppState) => state.playerTwo)
  const amountToWin: string = useSelector((state: AppState) => state.amountToWin)
  const speedTimer: string = useSelector((state: AppState) => state.speedTimer)
  const speedPlay: boolean = useSelector((state: AppState) => state.speedPlay)
  
  const dispatch = useDispatch()

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setView('game'))
  }

  const handleOnlineClick = () => {
    dispatch(setView('onlineInput'))
    dispatch(setPlayingOnlineOrNot(true))
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
    <div className='inputs'>
      <form  onSubmit={handleFormSubmit} className="banner1 LatoText">
        <label >Player One</label>
          <input type="text" className="LatoText" value={playerOne[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setPlayerOne([e.target.value, 'Red']))} />
        <label >Player Two</label>
          <input type="text" className="LatoText" value={playerTwo[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setPlayerTwo([e.target.value, 'Black']))} />
        <label >Win Amount</label>
          <input className="LatoText" type="number" min="2" max="6" value={amountToWin} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setAmountToWin(e.target.value))} />
        <button className="LatoText" onClick={handleSpeedPlayButtonClick}>Speed Play?</button>
        {speedPlay ? <input type="number" min="2" max="10000" className="LatoText" placeholder='Enter Amount of Seconds for Each Player' value={speedTimer[0]} onChange={handleSpeedPlayEntry} /> : null}
        <input type="submit" className="LatoText localFormSubmit"/>
      </form>
        <button className=" playOnline LatoText" onClick={handleOnlineClick}>Play Online</button>
    </div>

  )
}

export default PlayerInput