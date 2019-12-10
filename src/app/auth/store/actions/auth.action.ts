export const enum AuthTypes {
    SET_AUTHENTICATED = '[Auth] Set authenticated',
    SET_UNAUTHENTICATED = '[Auth] Set unauthenticated'
}

export class SetAuthenticated {
    readonly type = AuthTypes.SET_AUTHENTICATED;
}

export class SetUnauthenticated {
    readonly type = AuthTypes.SET_UNAUTHENTICATED;
}

export type AuthActions = 
    | SetAuthenticated
    | SetUnauthenticated