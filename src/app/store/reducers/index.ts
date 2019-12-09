import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromCore from './core.reducer';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from './router.reducer';
import { RouterReducerState } from '@ngrx/router-store';

export interface State {
    core: fromCore.CoreState;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  core: fromCore.reducer,
  router: fromRouter.routerReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');
export const getCoreState = createFeatureSelector<fromCore.CoreState>('core');
export const getVersion = createSelector(getCoreState, fromCore.getVersion);


