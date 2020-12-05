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

  
  const playingOnlineOrNot: boolean = useSelector((state: AppState) => state.playingOnlineOrNot)
  const receivedOnlineColumn: number | null = useSelector((state: AppState) => state.receivedOnlineColumn)
  const onlineRerenderCounter: number = useSelector((state: AppState) => state.onlineRerenderCounter)
  const roomCode: string = useSelector((state: AppState) => state.roomCode)
  const secondPlayerRoomCode: string = useSelector((state: AppState) => state.secondPlayerRoomCode)
  const playerTurn: string[] = useSelector((state: AppState) => state.playerTurn)
  const localPlayer: string[] = useSelector((state: AppState) => state.localPlayer)
  const otherPlayer: string[] = useSelector((state: AppState) => state.otherPlayer)
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