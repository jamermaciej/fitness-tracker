import { Exercise } from './../../models/exercise.model';

export const enum TrainingTypes {
    SET_AVAILABLE_EXERCISE = '[Training] Set available exercise',
    SET_FINISHED_EXERCISE = '[Training] Set finished exercise',
    START_TRAINING = '[Training] Start training',
    STOP_TRAINING = '[Training] Stop training'
}

export class SetAvailableExercise {
    readonly type = TrainingTypes.SET_AVAILABLE_EXERCISE;

    constructor(public payload: Exercise[]) {}
}

export class SetFinishedExercise {
    readonly type = TrainingTypes.SET_FINISHED_EXERCISE;

    constructor(public payload: Exercise[]) {}
}

export class StartTraning {
    readonly type = TrainingTypes.START_TRAINING;

    constructor(public payload: string) {}
}

export class StopTraining {
    readonly type = TrainingTypes.STOP_TRAINING;
}

export type TrainingActions =
    | SetAvailableExercise
    | SetFinishedExercise
    | StartTraning
    | StopTraining