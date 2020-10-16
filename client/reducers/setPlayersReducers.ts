import { AppActions } from '../types/actions'
import * as actions from '../types/actionStrings'

export const setPlayerOneReducer = (state = "", action: AppActions): string[] | string => {
    switch (action.type) {
        case actions.setPlayerOne:
            return action.player1
        
        default:
            return state
    }
}

export const setPlayerTwoReducer = (state = "", action: AppActions): string[] | string => {
    switch (action.type) {
        case actions.setPlayerTwo:
            return action.player2
        
        default:
            return state
    }
}

export const setLocalPlayer = (state = '', action: AppActions): string[] | string => {
    switch (action.type) {
        case actions.setLocalPlayer:
            return action.player
        
        default:
            return state
    }
}

export const setOtherOnlinePlayerNameReducer = (state = '', action: AppActions): string[] | string => {
    switch (action.type) {
        case actions.setOtherOnlinePlayerName:
            return action.player
        
        default:
            return state
    }
}

