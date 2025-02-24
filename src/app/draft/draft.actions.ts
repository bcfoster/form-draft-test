import { createActionGroup, props } from '@ngrx/store';

export const DraftActions = createActionGroup({
  source: 'Draft',
  events: {
    'Restore Draft': props<{ json: string; version: number }>(),
    'Update Draft': props<{ json: string; version: number }>(),
  },
});
