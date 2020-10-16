import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setView, setPlayingOnlineOrNot, } from '../actions/index'
import JoinOnlineGame from './JoinOnlineGame'
import CreateOnlineGame from './CreateOnlineGame'


const OnlineInput = () => {
  
  const dispatch = useDispatch()
    
  const [createGame, setCreateGame] = useState(false)
  const [joinGame, setJoinGame] = useState(false)

  const handlePlayLocallyClick = () => {
    dispatch(setView('input'))
    dispatch(setPlayingOnlineOrNot(false))
  }

  const handleCreateGameClick = () => {
      setJoinGame(false)
      setCreateGame(true)
  }

  const handleJoinGameClick = () => {
      setCreateGame(false)
      setJoinGame(true)
  }

  return (
    <div className='onlineBanner'>
        <button className="LatoText createGameButton" onClick={handleCreateGameClick}>Create Game</button>
        <button className="LatoText joinGameButton" onClick={handleJoinGameClick}>Join Game</button>
        <button className="LatoText playLocallyButton" onClick={handlePlayLocallyClick}>Play Locally</button>
        { createGame && <CreateOnlineGame /> }
        { joinGame && <JoinOnlineGame /> }
    </div>

  )
}

export default OnlineInput