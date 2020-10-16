import { AppActions } from '../types/actions'
import * as actions from '../types/actionStrings'
import { emptyBoard } from '../utilities/gameLogicUtilities'

export const setBoardReducer = (state: string[][] = emptyBoard, action: AppActions): string[][] => {
    switch (action.type) {
        case actions.setBoard:
            return action.board
        
        default:
            return state
    }
}

export const setAmountToWinReducer = (state = "", action: AppActions): string => {
    switch (action.type) {
        case actions.setAmountToWin:
            return action.newString
        
        default:
            return state
    }
}

export const setGameWonReducer = (state: [boolean, string] = [false, ''], action: AppActions): [boolean, string[] | string] => {
    switch (action.type) {
        case actions.setGameWon:
            return action.array
        
        default:
            return state
    }
}

export const setPlayerTurnReducer = (state = '', action: AppActions): string[] | string => {
    switch (action.type) {
        case actions.setPlayerTurn:
            return action.playerTurn
        
        default:
            return state
    }
}

export const setReceivedOnlineColumnClickedReducer = (state = null, action: AppActions): number | null => {
    switch (action.type) {
        case actions.setReceivedOnlineColumnClicked:
            return action.column
        
        default:
            return state
    }
}

export const setOnlineRerenderCounterReducer = (state = 0, action: AppActions): number => {
    switch (action.type) {
        case actions.setOnlineRerenderCounter:
            return action.counter
        
        default:
            return state
    }
}

export const setAgreementToResetReducer = (state = '', action: AppActions): string => {
    switch (action.type) {
        case actions.setAgreementToReset:
            return action.player
        
        default:
            return state
    }
}

export const setResetApprovalReducer = (state = 0, action: AppActions): number => {
    switch (action.type) {
        case actions.setResetApproval:
            return action.number
        
        default:
            return state
    }
}

export const setWinningPiecesReducer = (state = null, action: AppActions): number[][] | null => {
    switch (action.type) {
        case actions.setWinningPieces:
            return action.array
        
        default:
            return state
    }
}

export const setNoClickingForOneSecondReducer = (state = false, action: AppActions): boolean => {
    switch (action.type) {
        case actions.setNoClickingForOneSecond:
            return action.clickOrNot

        default:
            return state
    }
}

export const setNumOfPlaysReducer = (state = 0, action: AppActions): number => {
    switch (action.type) {
        case actions.setNumOfPlays:
            return action.number
        
        default:
            return state
    }
}

export const setDropPiecesOffBoard = (state = 0, action: AppActions): number => {
    switch (action.type) {
        case actions.setDropPiecesOffBoard:
            return action.setting

        default:
            return state
    }
}