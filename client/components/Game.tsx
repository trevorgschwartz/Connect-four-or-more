import React, { useState, useEffect, FunctionComponent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../index'
import { changePlayerTurn, copyBoardAndPlacePiece, emptyBoard } from '../utilities/gameLogicUtilities'
import { winDetection } from '../utilities/winDetection'
import socket from '../utilities/socketConnection'
import Rows from './Rows'
import { 
  setBoard,
  setGameWon,
  setPlayerOne,
  setPlayerTwo,
  setWinningPieces,
  setPlayerTurn,
  agreeToResetGame,
  setResetApproval,
  setNoClickingForOneSecond,
  setNumOfPlays,
  setDropPiecesOffBoard,
  setDefaultReduxState,
  setStartSpeedPlay,
  setSpeedTimer,
  setChangeTurnsDisabled,
  setReadyToPlay } from '../actions/index'


const Game: FunctionComponent = () => {

  const [toCheck, setToCheck] = useState([0, 0])
  const [newBoardClicked, setNewBoardClicked] = useState(0)
  const [resetRulesClickedOnce, setResetRulesClickedOnce] = useState(false)
  const [userLeftGame, setUserLeftGame] = useState(false)
  
  const winningPieces: number[][] = useSelector((state: AppState) => state.winningPieces)
  const amountToWin: string = useSelector((state: AppState) => state.amountToWin)
  const board: string[][] = useSelector((state: AppState) => state.board)
  const gameWon = useSelector((state: AppState) => state.gameWon)
  const playerOne: string[] = useSelector((state: AppState) => state.playerOne)
  const playerTwo: string[] = useSelector((state: AppState) => state.playerTwo)
  const playerTurn: string[] = useSelector((state: AppState) => state.playerTurn)
  const roomCode: string = useSelector((state: AppState) => state.roomCode)
  const secondPlayerRoomCode: string = useSelector((state: AppState) => state.secondPlayerRoomCode)
  const agreeToReset: string = useSelector((state: AppState) => state.agreeToReset)
  const playingOnlineOrNot: boolean = useSelector((state: AppState) => state.playingOnlineOrNot)
  const localPlayer: string[] | string = useSelector((state: AppState) => state.localPlayer)
  const resetApproval: number = useSelector((state: AppState) => state.resetApproval)
  const otherPlayer: string[] = useSelector((state: AppState) => state.otherPlayer)
  const numOfPlays: number = useSelector((state: AppState) => state.numOfPlays)
  const playerOneTime: number = useSelector((state: AppState) => state.speedTimer[0])
  const playerTwoTime: number = useSelector((state: AppState) => state.speedTimer[1])
  const originalTime: number = useSelector((state: AppState) => state.speedTimer[2])
  const startSpeedPlay: boolean = useSelector((state: AppState) => state.startSpeedPlay)
  const speedPlay: boolean = useSelector((state: AppState) => state.speedPlay)
  const changeTurnsDisabled: boolean = useSelector((state: AppState) => state.changeTurnsDisabled)

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('reset-board', (playerOne: string[], timer: number) => {
      resetBoard(playerOne, timer)
    })

    socket.on('reset-unfinished-board', (player: string[], agreeToReset: string, player1: string[], timer: number) => {
      if (agreeToReset.length === 0) {
        dispatch(agreeToResetGame(player[0]))
        dispatch(setResetApproval(1))
      } else if (player) {
        resetBoard(player1, timer)
      }
    })

    socket.on('cancel-agree-to-reset-to-other-player', () => {
      dispatch(agreeToResetGame(''))
      dispatch(setResetApproval(0))
    })

    socket.on('user-left-room', () => {
      setUserLeftGame(true)
    })
    
    return () => {
      socket.disconnect()
    }
  },[])

  useEffect(() => {
    let possibleWinningPieces = winDetection(toCheck[0], toCheck[1], board, amountToWin)
    
    if (possibleWinningPieces.length > 0) {
      dispatch(setWinningPieces(possibleWinningPieces))
      playerTurn === playerOne ? dispatch(setGameWon([true, playerTwo, playerOne])) : dispatch(setGameWon([true, playerOne, playerTwo]))
    }
    
    if (numOfPlays === 42) dispatch(setGameWon([true, 'Tie', '']))
  }, [toCheck])

  useEffect(() => {
    if (numOfPlays !== 0) dispatch(setChangeTurnsDisabled(1))
    else dispatch(setChangeTurnsDisabled(0))
  }, [numOfPlays])
  
  useEffect(() => {
    if (winningPieces) {
      setTimeout(() => {
        let newBoard = board.map(row => row.slice())
        winningPieces.forEach((piece: number[]) => {
          newBoard[piece[0]][piece[1]] = "Yellow"
        })
        dispatch(setBoard(newBoard))
      }, 1000)
    }
  }, [winningPieces])

  useEffect(() => {
    if (playerOneTime === 0) dispatch(setGameWon([true, playerTwo, playerOne]))
  }, [playerOneTime])
  
  useEffect(() => {
    if (playerTwoTime === 0) dispatch(setGameWon([true, playerOne, playerTwo]))
  }, [playerTwoTime])

  const placePiece = (column: number) => {
    if (!gameWon[0] && startSpeedPlay) {
      for (let i = board.length - 1; i >= 0; i--) {
        if (board[i][column] === "O") {
          dispatch(setBoard(copyBoardAndPlacePiece(board, playerTurn, column, i)))
          dispatch(setPlayerTurn(changePlayerTurn(playerTurn, playerOne, playerTwo)))
          setToCheck([i, column])
          dispatch(setNumOfPlays(numOfPlays + 1))
          break;
        }
      }
    } else if (!gameWon[0] && !speedPlay) {
      for (let i = board.length - 1; i >= 0; i--) {
        if (board[i][column] === "O") {
          dispatch(setBoard(copyBoardAndPlacePiece(board, playerTurn, column, i)))
          dispatch(setPlayerTurn(changePlayerTurn(playerTurn, playerOne, playerTwo)))
          setToCheck([i, column])
          dispatch(setNumOfPlays(numOfPlays + 1))
          break;
        }
      }
    }
  }
  
  const resetBoard = (player: string[] = playerOne, timer: number) => {
    dispatch(setNoClickingForOneSecond(true))
    dispatch(setPlayerTurn(player))
    dispatch(setDropPiecesOffBoard(3))
    dispatch(setGameWon([false, '', '']))
    dispatch(setNumOfPlays(0))
    setNewBoardClicked(3)
    dispatch(setWinningPieces(null))
    dispatch(agreeToResetGame(''))
    dispatch(setResetApproval(0))
    dispatch(setStartSpeedPlay(false))
    dispatch(setSpeedTimer(timer))
    dispatch(setReadyToPlay(true))

    setTimeout(() => {
      dispatch(setDropPiecesOffBoard(0))
      dispatch(setBoard(emptyBoard))
      dispatch(setNoClickingForOneSecond(false))
    }, 1000)
  }

  const handleBoardResetClick = () => {
    if (playingOnlineOrNot) {
      if (gameWon[0]) {
        socket.emit('reset-board', playerOne, roomCode || secondPlayerRoomCode)
        resetBoard(playerOne, originalTime)
      } else {
        if (!agreeToReset) {
          socket.emit('reset-unfinished-board', localPlayer, agreeToReset, playerOne, roomCode || secondPlayerRoomCode)

          dispatch(agreeToResetGame(localPlayer[0]))
          dispatch(setResetApproval(1))
        } else if (agreeToReset !== localPlayer[0]) {
          socket.emit('reset-unfinished-board', localPlayer, agreeToReset, playerOne, roomCode || secondPlayerRoomCode)

          resetBoard(playerOne, originalTime)
        } else if (agreeToReset === localPlayer[0]) {
          socket.emit('cancel-agree-to-reset', roomCode || secondPlayerRoomCode)
          dispatch(agreeToResetGame(''))
          dispatch(setResetApproval(0))
        }
      }
    } else {
      resetBoard(playerOne, originalTime)
    }
  }

  const handleResetRulesClick = () => {
    if (resetRulesClickedOnce) {
      dispatch(setDefaultReduxState())
    } else {
      setResetRulesClickedOnce(true)
    }
  }

  const handleCancelResetRulesClick = () => {
    setResetRulesClickedOnce(false)
  }

  const handleAnimationEnd = () => {
    if (newBoardClicked !== 0) {
      setNewBoardClicked(1)
    }
  }

  const handleChangeTurnsClick = () => {
    if (numOfPlays === 0 && !startSpeedPlay) {
      let copyPlayerTurn = playerOne.slice()
      dispatch(setPlayerOne(playerTwo.slice()))
      dispatch(setPlayerTwo(copyPlayerTurn))
      if (playingOnlineOrNot) {
        socket.emit('change-turns', roomCode || secondPlayerRoomCode, playerOne, playerTwo)
      }
    }
  }

  return (
  <>
      <div className="banner2">
        { !gameWon[0] && !userLeftGame ? 
          <div>
            <div className="vh LatoText">{`${playerTurn[0]}'s turn`}</div>
            <div className={`circle${playerTurn[1]} vh`}></div>
          </div>
        :
        !gameWon[0] && userLeftGame ?
          <div>
            <div className="vh LatoText">{`${otherPlayer[0]} left the game`}</div>
            <div className={`circle${otherPlayer[1]} vh`}></div>
          </div> 
        : null
        }
        { gameWon[0] && numOfPlays === 42 && <span className="vh LatoText">Tie Game!</span>}
        { gameWon[0] && numOfPlays !== 42 && <span className="vh LatoText">{`${gameWon[1][0]} wins!`}</span> }
        { resetApproval === 0 ?
          <button onClick={handleBoardResetClick}  className="button1 LatoText2">Reset Board</button>
          : resetApproval === 1 && localPlayer[0] === agreeToReset ?
          <button onClick={handleBoardResetClick}  className="button1 LatoText2">Waiting...Click To Cancel</button>
          : resetApproval === 1 && localPlayer[0] !== agreeToReset ?
          <button onClick={handleBoardResetClick}  className="button1 LatoText2">{otherPlayer[0]} requested Reset</button>
          : null
        }
        <button onClick={handleChangeTurnsClick} className="button2 LatoText2" id='buttonTransparency' data-changeturnsdisabled={changeTurnsDisabled}>Change Turns</button>
        { !resetRulesClickedOnce && <button onClick={handleResetRulesClick} className="button3 LatoText2">Reset Rules</button> }
        { resetRulesClickedOnce && <button onClick={handleCancelResetRulesClick} className="button3 LatoText2">Cancel Rules Reset</button> }
        { resetRulesClickedOnce && <button onClick={handleResetRulesClick} className="button4 LatoText2">Confirm Rules Reset?</button> }
      </div>
      <div className='div'></div>
      <div className='container'>
        <div className="board" data-newboardclicked={newBoardClicked} onAnimationEnd={handleAnimationEnd}>
          { board.map((row, i) => <Rows key={i} row={row} placePiece={placePiece} />) }
          </div>
      </div>
  </>
  )
}

export default Game

