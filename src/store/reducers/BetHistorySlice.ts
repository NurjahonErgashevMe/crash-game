import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IBet {
  put: number;
  get: number | null;
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
      state.bet.unshift(action.payload);
      if (state.bet.length > 10) {
        state.bet.pop();
      }
    },
  },
});

export const betHistoryActions = betHistorySlice.actions;

export default betHistorySlice.reducer;
