import { configureStore } from "@reduxjs/toolkit/react";
import FileSlice from "./FileSlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
    reducer: {
      files: FileSlice,
      user: UserSlice.reducer
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;