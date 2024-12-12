import { configureStore } from '@reduxjs/toolkit';

import { serverApi } from './services';
import userReducer from './slices/user.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
