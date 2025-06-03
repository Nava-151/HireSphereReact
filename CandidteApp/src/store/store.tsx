import { configureStore } from "@reduxjs/toolkit/react";
import FileSlice from "./FileSlice";
import UserSlice from "./UserSlice";
import VideoCallSlice from "./VideoCallSlice";
import ChatSlice from "./ChatSlice";

export const store = configureStore({

  reducer: {
    files: FileSlice,
    user: UserSlice,
    videoCall: VideoCallSlice,
    chat:ChatSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;