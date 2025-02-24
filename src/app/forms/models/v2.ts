export interface Form {
  firstName: string;
  lastName: string;
  age: number;
}

export const initialFormState: Form = {
  firstName: '',
  lastName: '',
  age: 0,
};
