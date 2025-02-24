import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromContact from './contact/contact.reducer';
import * as fromEmployer from './employer/employer.reducer';
import * as fromForm from './form.reducer';

export interface State {
  [fromForm.featureKey]: fromForm.State;
  [fromContact.featureKey]: fromContact.State;
  [fromEmployer.featureKey]: fromEmployer.State;
}
export interface Form {
  [fromContact.featureKey]: fromContact.Form;
  [fromEmployer.featureKey]: fromEmployer.Form;
}

export const reducers: ActionReducerMap<State> = {
  [fromForm.featureKey]: fromForm.reducer,
  [fromContact.featureKey]: fromContact.reducer,
  [fromEmployer.featureKey]: fromEmployer.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
