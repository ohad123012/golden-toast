import { serverApi } from './server.api';

export interface ToastType {
  id: string;
  userId: string;
  toastDate: Date;
  reason: string;
  drinks: string;
  foods: string;
  description: string;
  hasDone: boolean;
}

export const toastApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFutureToasts: builder.query<ToastType[], void>({
      query: () => 'toast/all-future-toasts',
    }),
  }),
});
