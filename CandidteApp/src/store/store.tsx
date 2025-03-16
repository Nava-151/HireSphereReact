import { combineSlices, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";

const store = configureStore(
    {
        reducer: combineSlices(UserSlice)
    });

export type RootState = ReturnType<typeof store.getState>

export type UserDispatch = typeof store.dispatch

export default store;

