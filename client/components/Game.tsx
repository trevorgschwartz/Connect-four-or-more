import React, { useState, useEffect, FunctionComponent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setBoard, setGameWon, setPlayerOne, setPlayerTwo, setAmountToWin, setView, setWinningPieces, setPlayerTurn, agreeToResetGame, setResetApproval, setOtherOnlinePlayerName, setLocalPlayer, setRecievedOnlineColumnClicked, setPlayingOnlineOrNot, setSecondPlayerRoomCode, setRoomCode, setNoClickingForOneSecond, setNumOfPlays, setDropPiecesOffBoard } from '../actions/index'
import { AppState } from '../index'
import Rows from './Rows'
import socket from '../utilities/socketConnection'
import { changePlayerTurn, copyBoardAndPlacePiece, emptyBoard } from '../utilities/gameLogicUtilities'

const Game: FunctionComponent = () => {

  const [toCheck, setToCheck] = useState([0, 0])
  const [newBoardClicked, setNewBoardClicked] = useState(0)
  const [changeTurnsDisabled, setChangeTurnsDisabled] = useState(0)
  const [resetRulesClickedOnce, setResetRulesClickedOnce] = useState(false)
  
  const winningPieces: number[][] = useSelector((state: AppState) => state.winningPieces)
  const amountToWin: string = useSelector((state: AppState) => state.amountToWin)
  const board: string[][] = useSelector((state: AppState) => state.board)
  const gameWon: [boolean, string] = useSelector((state: AppState) => state.gameWon)
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

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('reset-board', (playerOne: string[]) => {
      resetBoard(playerOne)
    })

    socket.on('reset-unfinished-board', (player: string[], agreeToReset: string, player1: string[]) => {
      if (agreeToReset.length === 0) {
        dispatch(agreeToResetGame(player[0]))
        dispatch(setResetApproval(1))
      } else if (player) {
        resetBoard(player1)
      }
    })

    socket.on('cancel-agree-to-reset-to-other-player', () => {
      dispatch(agreeToResetGame(''))
      dispatch(setResetApproval(0))
    })
  },[])

  useEffect(() => {
    winDetection(toCheck[0], toCheck[1])
    if (numOfPlays === 42) dispatch(setGameWon([true, 'Tie']))
  }, [toCheck])

  useEffect(() => {
    if (numOfPlays !== 0) setChangeTurnsDisabled(1)
    else setChangeTurnsDisabled(0)
  }, [numOfPlays])
  
  useEffect(() => {
    if (winningPieces) {
      setTimeout(() => {
        let newBoard = board.map(row => row.slice())
        winningPieces.forEach((piece: number[]) => {
          newBoard[piece[0]][piece[1]] = "Yellow"
        })
        return dispatch(setBoard(newBoard))
      }, 1000)
    }
  }, [winningPieces])

  const placePiece = (column: number) => {
    if (!gameWon[0]) {
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

  const checkLeftRight = (board: string[][], row: number, col: number) => {
    let color = board[row][col]
    let leftCheck = col
    let rightCheck = col
    let rightStillMatched = true
    let leftStillMatched = true
    let localWinningPieces = [[row, col]]
    while (leftStillMatched || rightStillMatched) {
      if (leftCheck > 0 && board[row][leftCheck - 1] === color && color !== 'O') {
        leftCheck--
        localWinningPieces.push([row, leftCheck])
      } else leftStillMatched = false
      
      if (rightCheck < (board[0].length - 1) && board[row][rightCheck + 1] === color && color !== 'O') {
        rightCheck++
        localWinningPieces.push([row, rightCheck])
      } else rightStillMatched = false
      
      if (localWinningPieces.length >= Number(amountToWin) && amountToWin !== '') {
        return localWinningPieces
      }
    }
    return []
  }

  const checkUpDown = (board: string[][], row: number, col: number) => {
    let color = board[row][col]
    let upCheck = row
    let downCheck = row
    let upStillMatched = true
    let downStillMatched = true
    let localWinningPieces = [[row, col]]
    while (upStillMatched || downStillMatched) {
      if (upCheck > 0 && board[upCheck - 1][col] === color && color !== 'O') {
        upCheck--
        localWinningPieces.push([upCheck, col])
      } else upStillMatched = false
      
      if (downCheck < board.length - 1 && board[downCheck + 1][col] === color && color !== 'O') {
        downCheck++
        localWinningPieces.push([downCheck, col])
      } else downStillMatched = false
      
      if (localWinningPieces.length >= Number(amountToWin) && amountToWin !== '') {
        return localWinningPieces
      }
    }
    return []
  }

  const checkMinorDiagonal = (board: string[][], row: number, col: number) => {
    let color = board[row][col]
    let topRightCheck = [row, col]
    let bottomLeftCheck = [row, col]
    let upRightStillMatched = true
    let downLeftStillMatched = true
    let localWinningPieces = [[row, col]]
    while (upRightStillMatched || downLeftStillMatched) {
      if (topRightCheck[0] > 0 && topRightCheck[1] < (board[0].length - 1) && board[topRightCheck[0] - 1][topRightCheck[1] + 1] === color && color !== 'O') {
        topRightCheck = [topRightCheck[0] - 1, topRightCheck[1] + 1]
        localWinningPieces.push([topRightCheck[0], topRightCheck[1]])
      } else upRightStillMatched = false
      
      if (bottomLeftCheck[0] < (board.length - 1) && bottomLeftCheck[1] > 0 && board[bottomLeftCheck[0] + 1][bottomLeftCheck[1] - 1] === color && color !== 'O') {
        bottomLeftCheck = [bottomLeftCheck[0] + 1, bottomLeftCheck[1] - 1]
        localWinningPieces.push([bottomLeftCheck[0], bottomLeftCheck[1]])
      } else downLeftStillMatched = false
      
      if (localWinningPieces.length >= Number(amountToWin) && amountToWin !== '') {
        return localWinningPieces
      }
    }
    return []
  }

  const checkMajorDiagonal = (board: string[][], row: number, col: number) => {
    let color = board[row][col]
    let topLeftCheck = [row, col]
    let bottomRightCheck = [row, col]
    let upLeftStillMatched = true
    let downRightStillMatched = true
    let localWinningPieces = [[row, col]]
    while (upLeftStillMatched || downRightStillMatched) {
      if (topLeftCheck[0] > 0 && topLeftCheck[1] > 0 && board[topLeftCheck[0] - 1][topLeftCheck[1] - 1] === color && color !== 'O') {
        topLeftCheck = [topLeftCheck[0] - 1, topLeftCheck[1] - 1]
        localWinningPieces.push([topLeftCheck[0], topLeftCheck[1]])
      } else upLeftStillMatched = false
      
      if (bottomRightCheck[0] < (board.length - 1) && bottomRightCheck[1] < board[0].length - 1 && board[bottomRightCheck[0] + 1][bottomRightCheck[1] + 1] === color && color !== 'O') {
        bottomRightCheck = [bottomRightCheck[0] + 1, bottomRightCheck[1] + 1]
        localWinningPieces.push([bottomRightCheck[0], bottomRightCheck[1]])
      } else downRightStillMatched = false
      
      if (localWinningPieces.length >= Number(amountToWin) && amountToWin !== '') {
        return localWinningPieces
      }
    }
    return []
  }

  const winDetection = (row: number, col: number) => {

    let upDown = checkUpDown(board, row, col)
    let leftRight = checkLeftRight(board, row, col)
    let minorDial = checkMinorDiagonal(board, row, col)
    let majorDial = checkMajorDiagonal(board, row, col)
    const winPieces = upDown.concat(leftRight, minorDial, majorDial)
    if (winPieces.length > 0) {
      dispatch(setWinningPieces(winPieces))
      let player
        if (playerTurn === playerOne) {
          player = playerTwo
        } else {
          player = playerOne
        }
        dispatch(setGameWon([true, player]))
    }
  }

  const resetBoard = (player: string[] = playerOne) => {
    dispatch(setNoClickingForOneSecond(true))
    setTimeout(() => {
      return dispatch(setNoClickingForOneSecond(false))
    }, 1000)
    dispatch(setPlayerTurn(player))
    dispatch(setDropPiecesOffBoard(3))

    setTimeout(() => {
      //TODO: change this dispatch
      dispatch(setDropPiecesOffBoard(0))
      return dispatch(setBoard(emptyBoard))
      
    }, 1000)

    dispatch(setGameWon([false, '']))
    dispatch(setNumOfPlays(0))
    setNewBoardClicked(3)
    dispatch(setWinningPieces(null))
    dispatch(agreeToResetGame(''))
    dispatch(setResetApproval(0))
  }

  const handleBoardResetClick = () => {
    if (playingOnlineOrNot) {
      if (gameWon[0]) {
        socket.emit('reset-board', playerOne, roomCode || secondPlayerRoomCode)
        resetBoard()
      } else {
        if (!agreeToReset && numOfPlays) {
          socket.emit('reset-unfinished-board', localPlayer, agreeToReset, playerOne, roomCode || secondPlayerRoomCode)
          dispatch(agreeToResetGame(localPlayer[0]))
          dispatch(setResetApproval(1))
        } else if (agreeToReset !== localPlayer[0] && numOfPlays) {
          socket.emit('reset-unfinished-board', localPlayer, agreeToReset, playerOne, roomCode || secondPlayerRoomCode)
          resetBoard()
        } else if (agreeToReset === localPlayer[0] && numOfPlays) {
          socket.emit('cancel-agree-to-reset', roomCode || secondPlayerRoomCode)
          dispatch(agreeToResetGame(''))
          dispatch(setResetApproval(0))
        }
      }
    } else {
      resetBoard()
    }
  }

  const handleResetRulesClick = () => {
    if (resetRulesClickedOnce) {
      dispatch(setBoard(emptyBoard))
      dispatch(setGameWon([false, '']))
      dispatch(setPlayerOne(''))
      dispatch(setPlayerTwo(''))
      dispatch(setAmountToWin(''))
      dispatch(setView('input'))
      dispatch(setNumOfPlays(0))
      dispatch(setWinningPieces(null))
      dispatch(setOtherOnlinePlayerName(''))
      dispatch(setResetApproval(0))
      dispatch(agreeToResetGame(''))
      dispatch(setLocalPlayer(''))
      dispatch(setPlayerTurn(''))
      dispatch(setRecievedOnlineColumnClicked(null))
      dispatch(setPlayingOnlineOrNot(false))
      dispatch(setRoomCode(''))
      dispatch(setSecondPlayerRoomCode(''))
      setResetRulesClickedOnce(false)
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
    if (numOfPlays === 0) {
      let copyPlayerTurn = playerOne.slice()
      dispatch(setPlayerOne(playerTwo.slice()))
      dispatch(setPlayerTwo(copyPlayerTurn))
      if (playingOnlineOrNot) {
        socket.emit('change-turns', roomCode || secondPlayerRoomCode, playerOne, playerTwo)
      }
    }
  }

  const renderPlayerTurnAndCircle = () => {
    return (
        <div>
          <div className="vh LatoText">{`${playerTurn[0]}'s turn`}</div>
          <div className={`circle${playerTurn[1]} vh`}></div>
        </div> 
    )
  }

  return (
  <>
      <div className="banner2">
        { !gameWon[0] && renderPlayerTurnAndCircle()}
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
        <button onClick={handleChangeTurnsClick} className="button2 LatoText2" id='buttonTransparency' data-changeTurnsDisabled={changeTurnsDisabled}>Change Turns</button>
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