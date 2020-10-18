import React, { ChangeEvent, FormEvent, FunctionComponent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAmountToWin, setPlayerOne, setPlayerTwo, setView, setPlayingOnlineOrNot } from '../actions/index'
import { AppState } from '../index'

const PlayerInput: FunctionComponent = () => {

  const playerOne: string[] = useSelector((state: AppState) => state.playerOne)
  const playerTwo: string[] = useSelector((state: AppState) => state.playerTwo)
  const amountToWin: string = useSelector((state: AppState) => state.amountToWin)
  
  const dispatch = useDispatch()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setView('game'))
  }

  const handleOnlineClick = () => {
    dispatch(setView('onlineInput'))
    dispatch(setPlayingOnlineOrNot(true))
  }

  return (
    <div className='inputs'>
      <form  onSubmit={handleSubmit} className="banner1 LatoText">
        <label >Player One</label>
          <input type="text" className="LatoText" value={playerOne[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setPlayerOne([e.target.value, 'Red']))} />
        <label >Player Two</label>
          <input type="text" className="LatoText" value={playerTwo[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setPlayerTwo([e.target.value, 'Black']))} />
        <label >Win Amount</label>
          <input className="LatoText" type="number" min="2" max="6" value={amountToWin} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setAmountToWin(e.target.value))} />
        <input type="submit" className="LatoText localFormSubmit"/>
      </form>
        <button className=" playOnline LatoText" onClick={handleOnlineClick}>Play Online</button>
    </div>

  )
}

export default PlayerInput