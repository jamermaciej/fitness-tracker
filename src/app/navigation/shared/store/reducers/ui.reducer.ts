import * as fromUI from '../actions/ui.action';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false
}

export function redcuer(
    state = initialState,
    action: fromUI.UIActions
): State {
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

export const getIsLoading = (state: State) => state.isLoading;