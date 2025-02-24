import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as contactSelectors from './contact.selectors';
import * as fromContact from './contact.reducer';

import { Observable } from 'rxjs';
import { FormGroupState, NgrxFormsModule, ResetAction, SetValueAction } from 'ngrx-forms';
import { LetDirective } from '@ngrx/component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'contact-form',
  imports: [LetDirective, NgrxFormsModule, RouterLink],
  templateUrl: `./contact-form.component.html`,
})
export class ContactFormComponent {
  form$: Observable<FormGroupState<fromContact.Form>>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(contactSelectors.selectForm);
  }

  reset() {
    const formId = fromContact.initialState.form.id;
    this.store.dispatch(new SetValueAction(formId, fromContact.initialFormState));
    this.store.dispatch(new ResetAction(formId));
  }
}
