import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForm from './form.reducer';

const selectFeature = createFeatureSelector<fromForm.State>(fromForm.featureKey);

export const selectVersion = createSelector(selectFeature, (state) => state.version);
