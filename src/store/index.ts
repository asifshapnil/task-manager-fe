import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import categorySlice from "./category.slice";
import authSlice from "./auth.slice";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    categories: categorySlice
  },
  // middleware: (getDefaultMiddleware: () => any) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
