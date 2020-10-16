import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../index'
import socket from '../utilities/socketConnection'

interface LinkStateProp{
    column: number
    slot: string
    dropPieces: number
}

interface LinkDispatchProp{
    placePiece: (column: number) => void,
    setDropPieces: (num: number) => void
}

type Props = LinkDispatchProp & LinkStateProp


const Slot:FunctionComponent<Props> = ({ column, slot, dropPieces, placePiece, setDropPieces }) => {

  const {
    playingOnlineOrNot,
    receivedOnlineColumn,
    onlineRerenderCounter,
    roomCode,
    secondPlayerRoomCode,
    playerTurn,
    localPlayer,
    otherPlayer
  } = useSelector((state: AppState) => state)

  useEffect(() => {
    if (receivedOnlineColumn !== null) {
      placePiece(receivedOnlineColumn)
    }
  }, [onlineRerenderCounter])

  const handleClick = () => {
    if (!playingOnlineOrNot) {
      placePiece(column)
    } else if (playerTurn[0] === localPlayer[0] && otherPlayer[0]) {
        placePiece(column)
        socket.emit('send-move', column, roomCode || secondPlayerRoomCode)
    }
  }

  const handleAnimationEnd = () => {
    if (dropPieces) {
      setDropPieces(0)
    }
  }

  return (
    <div onClick={handleClick}>
      <div data-droppieces={dropPieces} className={`circle${slot}`} onAnimationEnd={handleAnimationEnd}></div>
      <div className="circleWhite"></div>
    </div>
  )
}

export default Slot