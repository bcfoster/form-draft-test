import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEmployer from './employer.reducer';
import { countRequiredSteps } from '../utils';
import { ResetAction } from 'ngrx-forms';

const selectFeature = createFeatureSelector<fromEmployer.State>(fromEmployer.featureKey);

export const selectForm = createSelector(selectFeature, (state) => state.form);

export const selectTotalSteps = createSelector(() => {
  const state = fromEmployer.reducer(
    fromEmployer.initialState,
    new ResetAction(fromEmployer.initialState.form.id),
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
