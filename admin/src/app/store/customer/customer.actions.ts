import { createActionGroup, props } from '@ngrx/store';

import { IOrderResponse, OrderQueryType } from '@app/models';

export const customerActions = createActionGroup({
  source: '[Customer]',
  events: {
    'Get Orders': props<{ request?: OrderQueryType }>(),
    'Get Orders Success': props<{ response: IOrderResponse[] }>(),
    'Get Orders Failure': props<{ error: any }>(),
  },
});
