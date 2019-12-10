import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export interface AuthState {
    auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
    auth: fromAuth.reducer
};

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getAuth = createSelector(getAuthState, (state: AuthState) => state.auth);
export const getIsAuth = createSelector(getAuth, fromAuth.getIsAuth);