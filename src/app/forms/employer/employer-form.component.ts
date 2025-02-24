import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as employerSelectors from './employer.selectors';
import * as fromEmployer from './employer.reducer';

import { Observable } from 'rxjs';
import { FormGroupState, NgrxFormsModule, ResetAction, SetValueAction } from 'ngrx-forms';
import { LetDirective } from '@ngrx/component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'employer-form',
  imports: [LetDirective, NgrxFormsModule, RouterLink],
  templateUrl: `./employer-form.component.html`,
})
export class EmployerFormComponent {
  form$: Observable<FormGroupState<fromEmployer.Form>>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(employerSelectors.selectForm);
  }

  reset() {
    const formId = fromEmployer.initialState.form.id;
    this.store.dispatch(new SetValueAction(formId, fromEmployer.initialFormState));
    this.store.dispatch(new ResetAction(formId));
  }
}
