import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { coursesApi } from "./api/coursesApi";
import { analyticsApi } from "./api/analyticsApi";
import { paymentsApi } from "./api/paymentsApi";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/themeSlice";
import { chatApi } from "./api/chatapi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    [authApi.reducerPath]: authApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      coursesApi.middleware,
      analyticsApi.middleware,
      paymentsApi.middleware,
      chatApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
