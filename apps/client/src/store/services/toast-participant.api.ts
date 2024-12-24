import { serverApi } from './server.api';
import { ToastParticipantType } from '../types/toast-participant';

export const toastParticipantApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllToastParticipants: builder.query<ToastParticipantType[], void>({
      query: () => '/toast-participants',
      providesTags: ['ToastParticipants'],
    }),
    getAllParticipantsForToastId: builder.query<ToastParticipantType[], string>(
      {
        query: (id: string) => `/toast-participants/all-users/${id}`,
        providesTags: ['ToastParticipants'],
      }
    ),

    getAllToastsForUser: builder.query<ToastParticipantType[], string>({
      query: (id: string) => `/toast-participants/all-toasts-for-user/${id}`,
      providesTags: ['ToastParticipants'],
    }),

    createToastParticipants: builder.mutation<
      ToastParticipantType[],
      Omit<ToastParticipantType[], 'id'>
    >({
      query: (toastParticipants: ToastParticipantType[]) => ({
        url: '/toast-participants',
        method: 'POST',
        body: toastParticipants,
      }),
      invalidatesTags: ['ToastParticipants'],
    }),

    deleteToastParticipant: builder.mutation<ToastParticipantType, string>({
      query: (id) => ({
        url: `toast-participants/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['ToastParticipants'],
    }),
  }),
});
export const {
  useGetAllToastParticipantsQuery,
  useGetAllToastsForUserQuery,
  useLazyGetAllParticipantsForToastIdQuery,
  useGetAllParticipantsForToastIdQuery,
  useDeleteToastParticipantMutation,
} = toastParticipantApi;
