import { AppActions } from '../types/actions'
import * as actions from '../types/actionStrings'

export const setViewReducer = (state = "input", action: AppActions): string => {
    switch (action.type) {
        case actions.setView:
            return action.newString
        
        default:
            return state
    }
}

export const setPlayingOnlineOrNotReducer = (state = false, action: AppActions): boolean => {
    switch (action.type) {
        case actions.setPlayingOnlineOrNot:
            return action.onlineOrNot
        
        default:
            return state
    }
}