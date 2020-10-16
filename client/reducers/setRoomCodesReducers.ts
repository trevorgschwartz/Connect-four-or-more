import { AppActions } from '../types/actions'
import * as actions from '../types/actionStrings'

export const setRoomCodeReducer = (state = '', action: AppActions): string => {
    switch (action.type) {
        case actions.setRoomCode:
            return action.roomCode
        
        default:
            return state
    }
}

export const setSecondPlayerCodeReducer = (state = '', action: AppActions): string => {
    switch (action.type) {
        case actions.setSecondPlayerCode:
            return action.secondPlayerCode
        
        default:
            return state
    }
}