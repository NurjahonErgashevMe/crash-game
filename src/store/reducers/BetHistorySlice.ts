import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IBet {
  put: number;
  get: number;
  coefficent: number;
}

export type TBets = IBet[];

export interface BetHistorySliceState {
  bet: TBets;
}

const initialState: BetHistorySliceState = {
  bet: [],
};

export const betHistorySlice = createSlice({
  name: "betHistory",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<IBet>) => {
      state.bet.push(action.payload);
    },
  },
});

export const { addToHistory } = betHistorySlice.actions;

export default betHistorySlice.reducer;
