import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_NX_BACKEND_URL ?? 'http://localhost:3000/api',
  }),

  endpoints: () => ({}),
});
