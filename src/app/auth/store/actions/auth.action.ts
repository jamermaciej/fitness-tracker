import { User } from '../../models/user.model';

export const enum AuthTypes {
    SET_AUTHENTICATED = '[Auth] Set authenticated',
    SET_UNAUTHENTICATED = '[Auth] Set unauthenticated',
    SET_USER = '[Auth] Set user',
    CLEAR_USER = '[Auth] Clear user'
}

export class SetAuthenticated {
    readonly type = AuthTypes.SET_AUTHENTICATED;
}

export class SetUnauthenticated {
    readonly type = AuthTypes.SET_UNAUTHENTICATED;
}

export class SetUser {
    readonly type = AuthTypes.SET_USER;

    constructor(public payload: User) {}
}

export class ClearUser {
    readonly type = AuthTypes.CLEAR_USER;
}

export type AuthActions = 
    | SetAuthenticated
    | SetUnauthenticated
    | SetUser
    | ClearUser