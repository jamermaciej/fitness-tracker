export interface CoreState {
    version: string;
}

export const initialState = {
    version: '1.0.0',
};

export function reducer(
    state = initialState,
    action
) {
    return state;
}

export const getVersion = (state: CoreState) => state.version;