import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Exercise } from '../../models/exercise.model';
import * as fromTraining from './training.reducer';
import * as fromRoot from '../../../store';

export interface State extends fromRoot.State {
    training: TrainingState;
}

export interface TrainingState {
    training: fromTraining.State;
}

export const reducers: ActionReducerMap<TrainingState> = {
    training: fromTraining.reducer
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');
export const getTraining = createSelector(getTrainingState, (state: TrainingState) => state.training);

export const getAvailableExercises = createSelector(getTraining, fromTraining.getAvailableExercises);
export const getFinishedExercises = createSelector(getTraining, fromTraining.getFinishedExercises);
export const getActiveTraining = createSelector(getTraining, fromTraining.getActiveTraining);

export const getIsTraining = createSelector(getTraining, fromTraining.getIsTraining);
