import { Exercise } from './../../models/exercise.model';
import * as fromTraining from '../index';

export interface TrainingState {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise;
}

export const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null
}


export function reducer(
    state = initialState,
    action: fromTraining.TrainingActions
) {
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

export const getAvailableExercises = (state: TrainingState) => state.availableExercises;
export const getFinishedExercises = (state: TrainingState) => state.finishedExercises;
export const getActiveTraining = (state: TrainingState) => state.activeTraining;

export const getIsTraining = (state: TrainingState) => state.activeTraining != null;