
export interface AuthState {
    isAuth: boolean;
}

export const initialState = {
    isAuth: false
};

export function reducer(
    state = initialState,
    action
) {
    return state;
}
