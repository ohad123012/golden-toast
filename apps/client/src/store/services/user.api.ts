import { serverApi } from './server.api';
import { UserType } from '../types';

export const userApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], void>({
      query: () => '/user',
      providesTags: ['Users'],
    }),
    getUserByUserId: builder.query<UserType, string>({
      query: (id) => `/user/get-user/${id}`,
      providesTags: ['Users'],
    }),
    getAllParticipantsForToastId: builder.query<UserType[], string>({
      query: (id: string) => `/user/all-users/${id}`,
      providesTags: ['ToastParticipants'],
    }),

    createUser: builder.mutation<UserType, Omit<UserType, 'id'>>({
      query: (user) => ({
        url: '/user',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),

    updateUser: builder.mutation<UserType, UserType>({
      query: (user) => ({
        url: `/user/update-user/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<UserType, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByUserIdQuery,
  useLazyGetUserByUserIdQuery,
  useGetAllParticipantsForToastIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
