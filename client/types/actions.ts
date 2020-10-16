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
    player1: string[] | string
}

interface SetPlayerTwo {
    type: typeof actions.setPlayerTwo
    player2: string[] | string
}

interface SetBoard {
    type: typeof actions.setBoard
    board: string[][]
}

interface SetGameWon {
    type: typeof actions.setGameWon
    array: [boolean, string[] | string]
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
    playerTurn: string[] | string
}

interface SetLocalPlayer {
    type: typeof actions.setLocalPlayer
    player: string[] | string
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
    player: string[] | string
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
SetOtherOnlinePlayerName