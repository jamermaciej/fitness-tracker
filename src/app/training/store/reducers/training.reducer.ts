import { Exercise } from './../../models/exercise.model';
import * as fromTraining from '../index';

export interface State {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise;
}

export const initialState: State = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null
}

export function reducer(
    state = initialState,
    action: fromTraining.TrainingActions
): State {
    switch(action.type) {
        case fromTraining.TrainingTypes.SET_AVAILABLE_EXERCISE: {
            return {
                ...state,
                availableExercises: action.payload
            }
        }
        case fromTraining.TrainingTypes.SET_FINISHED_EXERCISE: {
            return {
                ...state,
                finishedExercises: action.payload
            }
        }
        case fromTraining.TrainingTypes.START_TRAINING: {
            return {
                ...state,
                activeTraining: state.availableExercises.find(exercise => exercise.id === action.payload)
            }
        }
        case fromTraining.TrainingTypes.STOP_TRAINING: {
            return {
                ...state,
                activeTraining: null
            }
        }
        default: {
            return state;
        }
    }
}

export const getAvailableExercises = (state: State) => state.availableExercises;
export const getFinishedExercises = (state: State) => state.finishedExercises;
export const getActiveTraining = (state: State) => state.activeTraining;

export const getIsTraining = (state: State) => state.activeTraining != null;