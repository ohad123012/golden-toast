import { serverApi } from './server.api';
import { CriminalType } from '../types/criminalType';
export const criminalApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCriminals: builder.query<CriminalType[], void>({
      query: () => '/criminal',
      providesTags: ['Criminals'],
    }),
    createCriminal: builder.mutation<CriminalType, Omit<CriminalType, 'id'>>({
      query: (criminal) => ({
        url: '/criminal',
        method: 'POST',
        body: criminal,
        invalidatesTags: ['Criminals'],
      }),
    }),
    updateCriminal: builder.mutation<CriminalType, CriminalType>({
      query: (criminal) => ({
        url: `/user/update-criminal/${criminal.id}`,
        method: 'PUT',
        body: criminal,
        invalidatesTags: ['Criminals'],
      }),
    }),
    deleteCriminal: builder.mutation<CriminalType, string>({
      query: (id) => ({
        url: `criminal/${id}`,
        method: 'DELETE',
        body: id,
        invalidatesTags: ['Criminals'],
      }),
    }),
  }),
});
