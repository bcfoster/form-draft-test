import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs';
import * as fromContact from '../forms/contact/contact.reducer';
import * as fromEmployer from '../forms/employer/employer.reducer';
import * as formSelectors from '../forms/form.selectors';
import { Store } from '@ngrx/store';
import { DraftActions } from './draft.actions';
import { SetValueAction } from 'ngrx-forms';
import { Form } from '../forms';

import * as v1 from '../forms/models/v1';
import * as v2 from '../forms/models/v2';
import * as v3 from '../forms/models/v3';
import * as v4 from '../forms/models/v4';
import * as v5 from '../forms/models/v5';

@Injectable()
export class DraftEffects {
  restore$;
  v1ToV2;
  v2ToV3;
  v3Tov4;
  v4Tov5;
  v5ToV6;

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {
    this.restore$ = createEffect(() =>
      actions$.pipe(
        ofType(DraftActions.restoreDraft),
        withLatestFrom(store.select(formSelectors.selectVersion)),
        mergeMap(([action, formVersion]) => {
          const form: Form = JSON.parse(action.json);

          return formVersion == action.version
            ? [
                new SetValueAction(fromContact.initialState.form.id, form.contact),
                new SetValueAction(fromEmployer.initialState.form.id, form.employer),
              ]
            : [DraftActions.updateDraft({ json: action.json, version: action.version })];
        }),
      ),
    );

    // new mandatory field added (age)
    this.v1ToV2 = createEffect(() =>
      actions$.pipe(
        ofType(DraftActions.updateDraft),
        filter((action) => action.version == 1),
        map((action) => {
          const existing: v1.Form = JSON.parse(action.json);

          const updated: v2.Form = {
            firstName: existing.firstName,
            lastName: existing.lastName,
            age: v2.initialFormState.age,
          };

          return DraftActions.restoreDraft({
            json: JSON.stringify(updated),
            version: action.version + 1,
          });
        }),
      ),
    );

    // new optional field added (middle name)
    this.v2ToV3 = createEffect(() =>
      actions$.pipe(
        ofType(DraftActions.updateDraft),
        filter((action) => action.version == 2),
        map((action) => {
          const existing: v2.Form = JSON.parse(action.json);

          const updated: v3.Form = {
            firstName: existing.firstName,
            middleName: v3.initialFormState.middleName,
            lastName: existing.lastName,
            age: existing.age,
          };

          return DraftActions.restoreDraft({
            json: JSON.stringify(updated),
            version: action.version + 1,
          });
        }),
      ),
    );

    // existing mandatory field removed (age)
    this.v3Tov4 = createEffect(() =>
      actions$.pipe(
        ofType(DraftActions.updateDraft),
        filter((action) => action.version == 4),
        map((action) => {
          const existing: v3.Form = JSON.parse(action.json);

          const updated: v4.Form = {
            firstName: existing.firstName,
            middleName: existing.middleName,
            lastName: existing.lastName,
          };

          return DraftActions.restoreDraft({
            json: JSON.stringify(updated),
            version: action.version + 1,
          });
        }),
      ),
    );

    // existing optional field removed (middle name)
    this.v4Tov5 = createEffect(() =>
      actions$.pipe(
        ofType(DraftActions.updateDraft),
        filter((action) => action.version == 5),
        map((action) => {
          const existing: v4.Form = JSON.parse(action.json);

          const updated: v5.Form = {
            firstName: existing.firstName,
            lastName: existing.lastName,
          };

          return DraftActions.restoreDraft({
            json: JSON.stringify(updated),
            version: action.version + 1,
          });
        }),
      ),
    );

    this.v5ToV6 = createEffect(() =>
      actions$.pipe(
        ofType(DraftActions.updateDraft),
        filter((action) => action.version == 5),
        map((action) => {
          const existing: v5.Form = JSON.parse(action.json);

          const updated: Form = {
            contact: {
              name: {
                first: existing.firstName,
                middle: fromContact.initialFormState.name.middle,
                last: existing.lastName,
              },
              age: fromContact.initialFormState.age,
              human: fromContact.initialFormState.human,
            },
            employer: {
              name: fromEmployer.initialFormState.name,
            },
          };

          return DraftActions.restoreDraft({
            json: JSON.stringify(updated),
            version: action.version + 1,
          });
        }),
      ),
    );
  }
}
