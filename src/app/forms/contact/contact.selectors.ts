import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContact from './contact.reducer';
import { countRequiredSteps } from '../utils';
import { ResetAction } from 'ngrx-forms';

const selectFeature = createFeatureSelector<fromContact.State>(fromContact.featureKey);

export const selectForm = createSelector(selectFeature, (state) => state.form);

export const selectTotalSteps = createSelector(() => {
  const state = fromContact.reducer(
    fromContact.initialState,
    new ResetAction(fromContact.initialState.form.id),
  );

  return countRequiredSteps(state.form);
});

export const selectIncompleteSteps = createSelector(selectForm, (form) => countRequiredSteps(form));

export const selectCompleteSteps = createSelector(
  selectTotalSteps,
  selectIncompleteSteps,
  (total, incomplete) => total - incomplete,
);

export const selectPercentCompleted = createSelector(
  selectTotalSteps,
  selectCompleteSteps,
  (total, complete) => Math.ceil((complete / total) * 100),
);
