import { createReducer } from '@ngrx/store';
import {
  createFormGroupState,
  FormGroupState,
  onNgrxForms,
  updateGroup,
  validate,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

export const featureKey = 'employer';

export interface Form {
  name: string;
}

export const initialFormState: Form = {
  name: '',
};

export interface State {
  form: FormGroupState<Form>;
}

export const initialState: State = {
  form: createFormGroupState(featureKey, initialFormState),
};

const rawReducer = createReducer(initialState, onNgrxForms());

const validateForm = updateGroup<Form>({
  name: validate(required),
});

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  (state) => state.form,
  validateForm,
);
