import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDraft from '../reducers/draft.reducer';

const selectFeature = createFeatureSelector<fromDraft.State>(fromDraft.featureKey);

export const selectVersion = createSelector(selectFeature, (state) => state.version);
