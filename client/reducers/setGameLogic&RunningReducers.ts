import { defaultCipherList } from 'constants'
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

export const setGameWonReducer = (state: [boolean, string, string] = [false, '', ''], action: AppActions): [boolean, string[] | string, string[] | string] => {
    switch (action.type) {
        case actions.setGameWon:
            return action.array
        
        default:
            return state
    }
}

export const setPlayerTurnReducer = (state = ['', ''], action: AppActions): string[] => {
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

export const setSpeedPlay = (state = false, action: AppActions): boolean => {
    switch (action.type) {
        case actions.setSpeedPlay:
            return action.speedPlay

        default:
            return state
    }
}

export const setSpeedGameTimer = (state = ['', '', ''], action: AppActions): (number | string)[] => {
    switch (action.type) {
        case actions.setSpeedTimer:
            return [Number(action.time), Number(action.time), Number(action.time)]

        case actions.setTimerRunningPlayerOne:
            if (typeof state[0] === 'number' && state[0] > 0) return [Number(state[0]) - 1, Number(state[1]), Number(state[2])]
            
        case actions.setTimerRunningPlayerTwo:
            if (typeof state[1] === 'number' && state[1] > 0) return [Number(state[0]), Number(state[1]) - 1, Number(state[2])]
            
        default:
            return state
    }
}

export const startSpeedPlay = (state = false, action: AppActions): boolean => {
    switch (action.type) {
        case actions.setStartSpeedPlay:
            return action.start

        default:
            return state
    }
}

export const setChangeTurnsDisabled = (state = 0, action: AppActions): number => {
    switch (action.type) {
        case actions.setChangeTurnsDisabled:
            return action.number
        
        default:
            return state
    }
}

export const setReadyToPlay = (state = false, action: AppActions) => {
    switch (action.type) {
        case actions.setReadyToPlay:
            return action.ready
        
        default:
            return state
    }
}

export const setPlayerOneReadyToPlay = (state = false, action: AppActions) => {
    switch (action.type) {
        case actions.setPlayerOneReadyToPlay:
            return action.ready

        default:
            return state
    }
}