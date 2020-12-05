import * as actions from '../types/actionStrings'
import { AppActions } from '../types/actions'

export const addToHelloWorld = (newString: string): AppActions => ({
    type: actions.addToHelloWorld,
    newString
})

export const setView = (newString: string): AppActions => ({
    type: actions.setView,
    newString
})

export const setAmountToWin = (newString: string): AppActions => ({
    type: actions.setAmountToWin,
    newString
})

export const setPlayerOne = (player1: string[]): AppActions => ({
    type: actions.setPlayerOne,
    player1
})

export const setPlayerTwo = (player2: string[]): AppActions => ({
    type: actions.setPlayerTwo,
    player2
})

export const setBoard = (board: string[][]): AppActions => ({
    type: actions.setBoard,
    board
})

export const setGameWon = (array: [boolean, string[] | string, string[] | string]): AppActions => ({
    type: actions.setGameWon,
    array
})

export const setWinningPieces = (array: number[][] | null): AppActions => ({
    type: actions.setWinningPieces,
    array
})

export const setRoomCode = (roomCode: string): AppActions => ({
    type: actions.setRoomCode,
    roomCode
})

export const setSecondPlayerRoomCode = (secondPlayerCode: string): AppActions => ({
    type: actions.setSecondPlayerCode,
    secondPlayerCode
})

export const setPlayingOnlineOrNot = (onlineOrNot: boolean): AppActions => ({
    type: actions.setPlayingOnlineOrNot,
    onlineOrNot
})

export const setOnlineColumnClicked = (column: number | null): AppActions => {
    return {
    type: actions.setOnlineColumnClicked,
    column
}
}

export const setRecievedOnlineColumnClicked = (column: number | null): AppActions => ({
    type: actions.setReceivedOnlineColumnClicked,
    column
})

export const setOnlineRerenderCounter = (counter: number): AppActions => ({
    type: actions.setOnlineRerenderCounter,
    counter
})

export const setLocalRerenderCounter = (counter: number): AppActions => ({
    type: actions.setLocalRerenderCounter,
    counter
})

export const setPlayerTurn = (playerTurn: string[]): AppActions => ({
    type: actions.setPlayerTurn,
    playerTurn
})

export const setLocalPlayer = (player: string[]): AppActions => ({
    type: actions.setLocalPlayer,
    player
})

export const agreeToResetGame = (player: string): AppActions => ({
    type: actions.setAgreementToReset,
    player
})

export const setResetApproval = (number: number): AppActions => ({
    type: actions.setResetApproval,
    number
})

export const setOtherOnlinePlayerName = (player: string[]): AppActions => ({
    type: actions.setOtherOnlinePlayerName,
    player
})

export const setNoClickingForOneSecond = (clickOrNot: boolean): AppActions => ({
    type: actions.setNoClickingForOneSecond,
    clickOrNot
})

export const setNumOfPlays = (number: number): AppActions => ({
    type: actions.setNumOfPlays,
    number
})

export const setDropPiecesOffBoard = (setting: number): AppActions => ({
    type: actions.setDropPiecesOffBoard,
    setting
})

export const setDefaultReduxState = (): AppActions => ({
    type: actions.setDefaultReduxState
})

export const setSpeedPlay = (speedPlay: boolean): AppActions => ({
    type: actions.setSpeedPlay,
    speedPlay
})

export const setSpeedTimer = (time: string | number): AppActions => ({
    type: actions.setSpeedTimer,
    time
})

export const setStartSpeedPlay = (start: boolean): AppActions => ({
    type: actions.setStartSpeedPlay,
    start
})

export const setTimerRunningPlayerOne = (): AppActions => ({
    type: actions.setTimerRunningPlayerOne
})

export const setTimerRunningPlayerTwo = (): AppActions => ({
    type: actions.setTimerRunningPlayerTwo
})

export const setChangeTurnsDisabled = (number: number): AppActions => ({
    type: actions.setChangeTurnsDisabled,
    number
})

export const setReadyToPlay = (ready: boolean): AppActions => ({
    type: actions.setReadyToPlay,
    ready
})

export const setPlayerOneReadyToPlay = (ready: boolean): AppActions => ({
    type: actions.setPlayerOneReadyToPlay,
    ready
})