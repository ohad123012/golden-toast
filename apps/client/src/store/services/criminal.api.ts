import { serverApi } from './server.api';
import { CriminalPersonaNonGrata, CriminalType } from '../types/criminalType';
export const criminalApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    findAll: builder.query<CriminalType[], void>({
      query: () => '/criminal',
      providesTags: ['Criminals'],
    }),
    getAllCriminals: builder.query<CriminalType[], void>({
      query: () => '/criminal/get-criminals',
      providesTags: ['Criminals'],
    }),

    getAllPersonaNonGrata: builder.query<CriminalType[], void>({
      query: () => '/criminal/get-persona-non-grata',
      providesTags: ['Criminals'],
    }),

    createCriminal: builder.mutation<CriminalType, Omit<CriminalType, 'id'>>({
      query: (criminal) => ({
        url: '/criminal',
        method: 'POST',
        body: criminal,
      }),
      invalidatesTags: ['Criminals'],
    }),
    updateCriminal: builder.mutation<CriminalType, CriminalType>({
      query: (criminal) => ({
        url: `/criminal/update-criminal/${criminal.id}`,
        method: 'PUT',
        body: criminal,
      }),
      invalidatesTags: ['Criminals'],
    }),
    updateCriminalPersonaNonGrata: builder.mutation<
      CriminalType,
      CriminalPersonaNonGrata
    >({
      query: (criminal) => ({
        url: `/criminal/update-criminal/${criminal.id}`,
        method: 'PUT',
        body: criminal,
      }),
      invalidatesTags: ['Criminals'],
    }),

    deleteCriminal: builder.mutation<CriminalType, string>({
      query: (id) => ({
        url: `criminal/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Criminals'],
    }),
  }),
});

export const {
  useFindAllQuery,
  useGetAllCriminalsQuery,
  useGetAllPersonaNonGrataQuery,
  useCreateCriminalMutation,
  useUpdateCriminalMutation,
  useUpdateCriminalPersonaNonGrataMutation,
  useDeleteCriminalMutation,
} = criminalApi;
