import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export interface AuthState {
    auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
    auth: fromAuth.reducer
};
