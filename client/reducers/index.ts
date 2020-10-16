import { combineReducers } from 'redux'

import { 
    setAmountToWinReducer,
    setBoardReducer, setGameWonReducer,
    setPlayerTurnReducer,
    setReceivedOnlineColumnClickedReducer,
    setOnlineRerenderCounterReducer,
    setAgreementToResetReducer,
    setResetApprovalReducer,
    setWinningPiecesReducer
} from './setGameLogic&RunningReducers'

import {
    setPlayerOneReducer,
    setPlayerTwoReducer,
    setLocalPlayer,
    setOtherOnlinePlayerNameReducer
} from './setPlayersReducers'

import {
    setViewReducer,
    setPlayingOnlineOrNotReducer
} from './settingUpGameReducers'

import {
    setRoomCodeReducer,
    setSecondPlayerCodeReducer
} from './setRoomCodesReducers'


const rootReducer = combineReducers({
    view: setViewReducer,
    amountToWin: setAmountToWinReducer,
    playerOne: setPlayerOneReducer,
    playerTwo: setPlayerTwoReducer,
    board: setBoardReducer,
    gameWon: setGameWonReducer,
    winningPieces: setWinningPiecesReducer,
    roomCode: setRoomCodeReducer,
    secondPlayerRoomCode: setSecondPlayerCodeReducer,
    playingOnlineOrNot: setPlayingOnlineOrNotReducer,
    receivedOnlineColumn: setReceivedOnlineColumnClickedReducer,
    onlineRerenderCounter: setOnlineRerenderCounterReducer,
    playerTurn: setPlayerTurnReducer,
    localPlayer: setLocalPlayer,
    agreeToReset: setAgreementToResetReducer,
    resetApproval: setResetApprovalReducer,
    otherPlayer: setOtherOnlinePlayerNameReducer
})

export default rootReducer