import { isArrayState, isGroupState } from 'ngrx-forms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function countRequiredSteps(state: any): number {
  if (isArrayState(state)) {
    return 0;
  }

  if (!isGroupState(state)) {
    return Object.keys(state.errors).length > 0 ? 1 : 0;
  }

  let steps = 0;

  Object.values(state.controls).forEach((c) => {
    steps += countRequiredSteps(c);
  });

  return steps;
}
