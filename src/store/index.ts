import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import coefficentHistory from "./reducers/CoefficientHistorySlice";
import betHistory from "./reducers/BetHistorySlice";
import balance from "./reducers/BalansSlice";
import state from "./reducers/StateSlice";
import data from "./reducers/data";
import bets from "./reducers/BetSlice";

export const store = configureStore({
  reducer: { coefficentHistory, betHistory, balance, data, state, bets },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
