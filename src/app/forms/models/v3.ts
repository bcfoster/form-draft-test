export interface Form {
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
}

export const initialFormState: Form = {
  firstName: '',
  middleName: '',
  lastName: '',
  age: 0,
};
