import * as fromAuth from '../actions';
import { User } from '../../models/user.model';


export interface AuthState {
    isAuth: boolean;
    user: User;
}

export const initialState = {
    isAuth: false,
    user: {
        uid: null,
        displayName: null,
        email: null,
        emailVerified: false,
        creationTime: null,
        lastSignInTime: null,
        phoneNumber: null,
        photoURL: null
    }
};

export function reducer(
    state = initialState,
    action: fromAuth.AuthActions
): AuthState {
    switch(action.type) {
        case fromAuth.AuthTypes.SET_AUTHENTICATED: {
            return {
                ...state,
                isAuth: true
            }
        }
        case fromAuth.AuthTypes.SET_UNAUTHENTICATED: {
            return {
                ...state,
                isAuth: false
            }
        }
        case fromAuth.AuthTypes.SET_USER: {
            return {
                ...state,
                user: action.payload
            }
        }
        case fromAuth.AuthTypes.CLEAR_USER: {
            return {
                ...state,
                user: null
            }
        }
        default: {
            return state;
        }
    }
}

export const getIsAuth = (state: AuthState) => state.isAuth;
export const getUser = (state: AuthState) => state.user;