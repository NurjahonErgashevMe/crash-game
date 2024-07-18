import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import coefficentHistory from "./reducers/CoefficientHistorySlice";

export const store = configureStore({
  reducer: { coefficentHistory },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
