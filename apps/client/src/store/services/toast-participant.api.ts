import { serverApi } from './server.api';
import { ToastParticipantType } from '../types/toast-participant';
import { UserType } from '../types';

export const toastParticipantApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllToastParticipants: builder.query<ToastParticipantType[], void>({
      query: () => '/toast-participants',
      providesTags: ['ToastParticipants'],
    }),

    getAllToastsForUser: builder.query<ToastParticipantType[], string>({
      query: (id: string) => `/toast-participants/all-toasts-for-user/${id}`,
      providesTags: ['ToastParticipants'],
    }),

    createToastParticipants: builder.mutation<
      ToastParticipantType[],
      Omit<ToastParticipantType, 'id'>[]
    >({
      query: (toastParticipants: ToastParticipantType[]) => ({
        url: '/toast-participants',
        method: 'POST',
        body: toastParticipants,
      }),
      invalidatesTags: ['ToastParticipants', 'Toasts'],
    }),

    deleteToastParticipant: builder.mutation<ToastParticipantType, string>({
      query: (id) => ({
        url: `toast-participants/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['ToastParticipants', 'Toasts'],
    }),

    deleteToastParticipantByToastIdAndUserId: builder.mutation<
      ToastParticipantType,
      { userId: string; toastId: string }
    >({
      query: ({ userId, toastId }) => ({
        url: `toast-participants/by-user-toast/${toastId}/${userId}`,
        method: 'DELETE',
        body: toastId,
      }),
      invalidatesTags: ['ToastParticipants', 'Toasts'],
    }),

    deleteAllToastParticipantsForToastId: builder.mutation<
      ToastParticipantType,
      string
    >({
      query: (toastId) => ({
        url: `toast-participants/for-toast-id/${toastId}`,
        method: 'DELETE',
        body: toastId,
      }),
      invalidatesTags: ['ToastParticipants'],
    }),
    deleteAllToastParticipantsForUserId: builder.mutation<
      ToastParticipantType,
      string
    >({
      query: (userId) => ({
        url: `toast-participants/for-user-id/${userId}`,
        method: 'DELETE',
        body: userId,
      }),
      invalidatesTags: ['ToastParticipants'],
    }),
  }),
});
export const {
  useGetAllToastParticipantsQuery,
  useGetAllToastsForUserQuery,
  useCreateToastParticipantsMutation,
  useDeleteToastParticipantMutation,
  useDeleteToastParticipantByToastIdAndUserIdMutation,
  useDeleteAllToastParticipantsForToastIdMutation,
  useDeleteAllToastParticipantsForUserIdMutation,
} = toastParticipantApi;
