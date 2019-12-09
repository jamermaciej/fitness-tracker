export const enum UITypes {
    START_LOADING  = '[UI] Start loading',
    STOP_LOADING  = '[UI] Decrement'
};

export class StartLoading {
    readonly type = UITypes.START_LOADING
}

export class StopLoading {
    readonly type = UITypes.STOP_LOADING
}

export type UIActions = 
    | StartLoading
    | StopLoading