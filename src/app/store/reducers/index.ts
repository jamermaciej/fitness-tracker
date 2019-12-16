import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromCore from './core.reducer';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from './router.reducer';
import { RouterReducerState } from '@ngrx/router-store';
import * as fromUI from '../../navigation/shared/store';

export interface State {
    ui: fromUI.State;
    core: fromCore.State;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.redcuer,
  core: fromCore.reducer,
  router: fromRouter.routerReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export const getCoreRootState = createFeatureSelector<State>('core');
export const getCoreState = createSelector(getCoreRootState, (state: State) => state.core);

export const getUIRootState = createFeatureSelector<State>('ui');
export const getUIState = createSelector(getUIRootState, (state: State) => state.ui);

export const getVersion = createSelector(getCoreState, fromCore.getVersion);
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);

