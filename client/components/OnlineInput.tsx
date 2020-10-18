import React, { useState, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { setView, setPlayingOnlineOrNot, } from '../actions/index'
import JoinOnlineGame from './JoinOnlineGame'
import CreateOnlineGame from './CreateOnlineGame'


const OnlineInput: FunctionComponent = () => {
  const dispatch = useDispatch()

  const handlePlayLocallyClick = () => {
    dispatch(setView('input'))
    dispatch(setPlayingOnlineOrNot(false))
  }

  const [createOrJoinView, setCreateOrJoinView] = useState('')
  const handleCreateOrJoinGameClick = (view: string) => {
     setCreateOrJoinView(view)
  }

  return (
    <div className='onlineBanner'>
        <button className="LatoText createGameButton" onClick={() => handleCreateOrJoinGameClick('create')}>Create Game</button>
        <button className="LatoText joinGameButton" onClick={() => handleCreateOrJoinGameClick('join')}>Join Game</button>
        <button className="LatoText playLocallyButton" onClick={handlePlayLocallyClick}>Play Locally</button>
        { createOrJoinView === 'create' && <CreateOnlineGame /> }
        { createOrJoinView === 'join' && <JoinOnlineGame /> }
    </div>

  )
}

export default OnlineInput