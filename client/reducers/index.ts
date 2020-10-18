import { combineReducers, Reducer } from 'redux'
import * as actions from '../types/actionStrings'
import { AppActions } from '../types/actions'
import { AppState } from '../index'

import { 
    setAmountToWinReducer,
    setBoardReducer, setGameWonReducer,
    setPlayerTurnReducer,
    setReceivedOnlineColumnClickedReducer,
    setOnlineRerenderCounterReducer,
    setAgreementToResetReducer,
    setResetApprovalReducer,
    setWinningPiecesReducer,
    setNoClickingForOneSecondReducer,
    setNumOfPlaysReducer,
    setDropPiecesOffBoard
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


const appReducer = combineReducers({
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
    otherPlayer: setOtherOnlinePlayerNameReducer,
    noClickingForOneSecond: setNoClickingForOneSecondReducer,
    numOfPlays: setNumOfPlaysReducer,
    dropPiecesOffBoard: setDropPiecesOffBoard
})

const rootReducer: Reducer = (state: AppState, action: AppActions): AppState => {   
    if(action.type === actions.setDefaultReduxState) state = undefined
    
    return appReducer(state, action);
 }

export default rootReducer