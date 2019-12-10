import * as fromAuth from '../actions';

export interface AuthState {
    isAuth: boolean;
}

export const initialState = {
    isAuth: false
};

export function reducer(
    state = initialState,
    action: fromAuth.AuthActions
) {
    switch(action.type) {
        case fromAuth.AuthTypes.SET_AUTHENTICATED: {
            return {
                isAuth: true
            }
        }
        case fromAuth.AuthTypes.SET_UNAUTHENTICATED: {
            return {
                isAuth: false
            }
        }
        default: {
            return state;
        }
    }
}

export const getIsAuth = (state: AuthState) => state.isAuth;