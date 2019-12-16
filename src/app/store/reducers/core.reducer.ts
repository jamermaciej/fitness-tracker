export interface State {
    version: string;
}

export const initialState = {
    version: '1.0.0',
};

export function reducer(
    state = initialState,
    action
): State {
    return state;
}

export const getVersion = (state: State) => state.version;