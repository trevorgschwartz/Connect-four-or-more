import React, { FunctionComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../index'
import { setDropPiecesOffBoard } from '../actions/index'
import socket from '../utilities/socketConnection'

interface LinkStateProp{
    column: number
    slot: string
}

interface LinkDispatchProp{
    placePiece: (column: number) => void
}

type Props = LinkDispatchProp & LinkStateProp


const Slot:FunctionComponent<Props> = ({ column, slot, placePiece }) => {

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
  const noClickingForOneSecond: boolean = useSelector((state: AppState) => state.noClickingForOneSecond)
  const dropPiecesOffBoard: number = useSelector((state: AppState) => state.dropPiecesOffBoard)

  const dispatch = useDispatch()

  useEffect(() => {
    if (receivedOnlineColumn !== null) {
      placePiece(receivedOnlineColumn)
    }
  }, [onlineRerenderCounter])

  const handleClick = () => {
    if (!noClickingForOneSecond) {
      if (!playingOnlineOrNot) {
        placePiece(column)
      } else if (playerTurn[0] === localPlayer[0] && otherPlayer[0]) {
          placePiece(column)
          socket.emit('send-move', column, roomCode || secondPlayerRoomCode)
      }
    }
  }

  const handleAnimationEnd = () => {
    if (dropPiecesOffBoard) {
      dispatch(setDropPiecesOffBoard(0))
    }
  }

  return (
    <div onClick={handleClick}>
      <div data-droppieces={dropPiecesOffBoard} className={`circle${slot}`} onAnimationEnd={handleAnimationEnd}></div>
      <div className="circleWhite"></div>
    </div>
  )
}

export default Slot