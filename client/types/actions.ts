import * as actions from './actionStrings'

interface HelloWorldAction {
    type: typeof actions.addToHelloWorld
    newString: string
}

interface SetViewAction {
    type: typeof actions.setView
    newString: string
}

interface SetAmountToWin {
    type: typeof actions.setAmountToWin
    newString: string
}

interface SetPlayerOne {
    type: typeof actions.setPlayerOne
    player1: string[]
}

interface SetPlayerTwo {
    type: typeof actions.setPlayerTwo
    player2: string[]
}

interface SetBoard {
    type: typeof actions.setBoard
    board: string[][]
}

interface SetGameWon {
    type: typeof actions.setGameWon
    array: [boolean, string[] | string, string[] | string]
}

interface SetWinningPieces {
    type: typeof actions.setWinningPieces
    array: number[][] | null
}

interface SetRoomCode {
    type: typeof actions.setRoomCode
    roomCode: string
}

interface SetSecondPlayerCode {
    type: typeof actions.setSecondPlayerCode
    secondPlayerCode: string
}

interface SetPlayingOnlineOrNot {
    type: typeof actions.setPlayingOnlineOrNot
    onlineOrNot: boolean
}

interface SetOnlineColumnClicked {
    type: typeof actions.setOnlineColumnClicked
    column: number | null
}

interface SetReceivedOnlineColumnClicked {
    type: typeof actions.setReceivedOnlineColumnClicked
    column: number | null
}

interface SetOnlineRerenderCounter {
    type: typeof actions.setOnlineRerenderCounter
    counter: number
}

interface SetLocalRerenderCounter {
    type: typeof actions.setLocalRerenderCounter
    counter: number
}

interface SetPlayerTurn {
    type: typeof actions.setPlayerTurn
    playerTurn: string[]
}

interface SetLocalPlayer {
    type: typeof actions.setLocalPlayer
    player: string[]
}

interface SetAgreementToReset {
    type: typeof actions.setAgreementToReset
    player: string
}

interface SetResetApproval {
    type: typeof actions.setResetApproval
    number: number
}

interface SetOtherOnlinePlayerName {
    type: typeof actions.setOtherOnlinePlayerName
    player: string[]
}

interface SetNoClickingForOneSecond {
    type: typeof actions.setNoClickingForOneSecond
    clickOrNot: boolean
}

interface SetNumOfPlays {
    type: typeof actions.setNumOfPlays
    number: number
}

interface SetDropPiecesOffBoard {
    type: typeof actions.setDropPiecesOffBoard
    setting: number
}

interface SetDefaultReduxState {
    type: typeof actions.setDefaultReduxState
}

interface SetSpeedPlay {
    type: typeof actions.setSpeedPlay
    speedPlay: boolean
}

interface SetSpeedTimer {
    type: typeof actions.setSpeedTimer
    time: string | number
}

interface SetStartSpeedPlay {
    type: typeof actions.setStartSpeedPlay
    start: boolean
}

interface SetTimerRunningPlayerOne {
    type: typeof actions.setTimerRunningPlayerOne
}

interface SetTimerRunningPlayerTwo {
    type: typeof actions.setTimerRunningPlayerTwo
}

interface SetChangeTurnsDisabled {
    type: typeof actions.setChangeTurnsDisabled
    number: number
}

interface SetReadyToPlay {
    type: typeof actions.setReadyToPlay
    ready: boolean
}

interface SetPlayerOneReadyToPlay {
    type: typeof actions.setPlayerOneReadyToPlay
    ready: boolean
}

export type AppActions = 
HelloWorldAction | 
SetViewAction | 
SetAmountToWin | 
SetPlayerOne | 
SetPlayerTwo |
SetBoard |
SetGameWon | 
SetWinningPieces |
SetRoomCode |
SetSecondPlayerCode |
SetPlayingOnlineOrNot |
SetOnlineColumnClicked |
SetReceivedOnlineColumnClicked |
SetOnlineRerenderCounter |
SetLocalRerenderCounter |
SetPlayerTurn |
SetLocalPlayer |
SetAgreementToReset |
SetResetApproval |
SetOtherOnlinePlayerName |
SetNoClickingForOneSecond |
SetNumOfPlays |
SetDropPiecesOffBoard |
SetDefaultReduxState |
SetSpeedPlay |
SetSpeedTimer |
SetStartSpeedPlay |
SetTimerRunningPlayerOne |
SetTimerRunningPlayerTwo |
SetChangeTurnsDisabled |
SetReadyToPlay |
SetPlayerOneReadyToPlay