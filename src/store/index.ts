import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import categorySlice from "./category.slice";


export const store = configureStore({
  reducer: {
    employees: categorySlice,
  },
  // middleware: (getDefaultMiddleware: () => any) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
