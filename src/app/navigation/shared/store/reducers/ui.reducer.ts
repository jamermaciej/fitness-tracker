import { UIState } from './ui.reducer';
import * as fromUI from '../actions/ui.action';

export interface UIState {
    isLoading: boolean;
}

export const initialState: UIState = {
    isLoading: false
}

export function redcuer(
    state = initialState,
    action: fromUI.UIActions
): UIState {
    switch(action.type) {
        case fromUI.UITypes.START_LOADING: {
            return {
                isLoading: true
            }
        }
        case fromUI.UITypes.STOP_LOADING: {
            return {
                isLoading: false
            }
        }
        default: {
            return state;
        }
    }
}

export const getIsLoading = (state: UIState) => state.isLoading;