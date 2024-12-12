import { serverApi } from './server.api';
import { ToastType } from '../types';

export const toastApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFutureToasts: builder.query<ToastType[], void>({
      query: () => '/toast/all-future-toasts',
    }),
  }),
});

export const { useGetAllFutureToastsQuery } = toastApi;
