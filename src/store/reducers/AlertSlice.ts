import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAlert {
  won: number;
  coefficent: number;
}

export interface alertHistorySliceState {
  alert: IAlert | null;
}

const initialState: alertHistorySliceState = {
  alert: null,
};

export const alertHistorySlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    changeAlert: (state, action: PayloadAction<IAlert>) => {
      state.alert = action.payload;
    },
  },
});

export const alertHistoryActions = alertHistorySlice.actions;

export default alertHistorySlice.reducer;
