import { createReducer } from '@ngrx/store';
import {
  createFormGroupState,
  FormGroupState,
  onNgrxForms,
  updateGroup,
  validate,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';
import { greaterThanOrEqualTo, required } from 'ngrx-forms/validation';

export const featureKey = 'contact';

export interface Name {
  first: string;
  middle: string;
  last: string;
}

export interface Form {
  name: Name;
  age: number;
  human: 'yes' | 'no' | 'maybe' | null;
}

export const initialFormState: Form = {
  name: {
    first: '',
    middle: '',
    last: '',
  },
  age: 0,
  human: null,
};

export interface State {
  form: FormGroupState<Form>;
}

export const initialState: State = {
  form: createFormGroupState(featureKey, initialFormState),
};

const rawReducer = createReducer(initialState, onNgrxForms());

const validateForm = updateGroup<Form>({
  name: updateGroup<Name>({
    first: validate(required),
    last: validate(required),
  }),
  age: validate(greaterThanOrEqualTo(19)),
  human: validate(required),
});

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  (state) => state.form,
  validateForm,
);
