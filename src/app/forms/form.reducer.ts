import { createReducer } from '@ngrx/store';

export const featureKey = 'form';

export interface State {
  version: number;
}

export const initialState: State = {
  version: 6,
};

export const reducer = createReducer(initialState);
