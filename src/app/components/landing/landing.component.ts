import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { DraftActions } from '../../draft/draft.actions';
import * as contactSelectors from '../../forms/contact/contact.selectors';
import * as employerSelectors from '../../forms/employer/employer.selectors';
import * as v1 from '../../forms/models/v1';
import { Form } from '../../forms';

@Component({
  selector: 'landing',
  imports: [RouterLink, PushPipe],
  templateUrl: 'landing.component.html',
})
export class LandingComponent {
  contactPercentCompleted$: Observable<number>;
  employerPercentCompleted$: Observable<number>;

  constructor(private readonly store: Store) {
    this.contactPercentCompleted$ = this.store.select(contactSelectors.selectPercentCompleted);
    this.employerPercentCompleted$ = this.store.select(employerSelectors.selectPercentCompleted);
  }

  update() {
    const form: v1.Form = {
      firstName: 'John',
      lastName: 'Appleseed',
    };

    this.store.dispatch(DraftActions.restoreDraft({ json: JSON.stringify(form), version: 1 }));
  }

  restore() {
    const form: Form = {
      contact: {
        name: {
          first: 'John',
          middle: '',
          last: 'Appleseed',
        },
        age: 42,
        human: null,
      },
      employer: {
        name: '',
      },
    };

    this.store.dispatch(DraftActions.restoreDraft({ json: JSON.stringify(form), version: 6 }));
  }
}
