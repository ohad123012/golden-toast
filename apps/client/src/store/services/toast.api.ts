import { serverApi } from './server.api';
import { ToastHasDone, ToastType } from '../types';

export const toastApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllToasts: builder.query<ToastType[], void>({
      query: () => '/toast',
      providesTags: ['Toasts'],
    }),
    getToastByToastId: builder.query<ToastType[], string>({
      query: (id: string) => `/toast/${id}`,
      providesTags: ['Toasts'],
    }),

    getPastToastForUser: builder.query<ToastType[], string>({
      query: (id: string) => `/toast/past-toasts/${id}`,
      providesTags: ['Toasts'],
    }),
    getAllPastToasts: builder.query<ToastType[], void>({
      query: () => '/toast/all-past-toasts',
      providesTags: ['Toasts'],
    }),
    getAllFutureToasts: builder.query<ToastType[], void>({
      query: () => '/toast/all-future-toasts',
      providesTags: ['Toasts'],
    }),
    getAllFutureToastsForUser: builder.query<ToastType[], string>({
      query: (userId) => `/toast/all-future-toasts/${userId}`,
      providesTags: ['Toasts'],
    }),
    getAmountToastsForCurrentPeriod: builder.query<ToastType[], void>({
      query: () => '/toast/amount-toasts-period',
      providesTags: ['Toasts'],
    }),
    getAllTimeRecord: builder.query<ToastType[], void>({
      query: () => '/toast/all-time-record',
      providesTags: ['Toasts'],
    }),
    getAmountToastsForCurrentPeriodPerUser: builder.query<ToastType[], void>({
      query: () => '/toast/amount-toasts-period-per-user',
      providesTags: ['Toasts'],
    }),
    createToast: builder.mutation<ToastType, Omit<ToastType, 'id'>>({
      query: (toast) => ({
        url: '/toast',
        method: 'POST',
        body: toast,
      }),
      invalidatesTags: ['Toasts'],
    }),
    updateToast: builder.mutation<ToastType, ToastType>({
      query: (toast) => ({
        url: `/toast/update-toast/${toast.id}`,
        method: 'PUT',
        body: toast,
      }),
      invalidatesTags: ['Toasts'],
    }),
    updateToastHasDone: builder.mutation<ToastType, ToastHasDone>({
      query: (toast) => ({
        url: `/toast/update-toast/${toast.id}`,
        method: 'PUT',
        body: toast,
      }),
      invalidatesTags: ['Toasts'],
    }),
    deleteToast: builder.mutation<ToastType, string>({
      query: (id) => ({
        url: `toast/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Toasts'],
    }),
  }),
});

export const {
  useGetAllToastsQuery,
  useGetToastByToastIdQuery,
  useGetPastToastForUserQuery,
  useGetAllPastToastsQuery,
  useGetAllFutureToastsQuery,
  useGetAllFutureToastsForUserQuery,
  useGetAmountToastsForCurrentPeriodQuery,
  useGetAllTimeRecordQuery,
  useGetAmountToastsForCurrentPeriodPerUserQuery,
  useCreateToastMutation,
  useUpdateToastMutation,
  useUpdateToastHasDoneMutation,
  useDeleteToastMutation,
} = toastApi;
