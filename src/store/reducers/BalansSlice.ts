import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BalanceSliceState {
  balance: number;
}

const initialState: BalanceSliceState = {
  balance: 25_000,
};

export const balanceSlice = createSlice({
  name: "betHistory",
  initialState,
  reducers: {
    addToBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    removeFromBalance: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
    },
  },
});

export const { addToBalance, removeFromBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
