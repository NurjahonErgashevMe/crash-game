import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CoefficientHistorySliceState {
  coefficients: number[];
}

const initialState: CoefficientHistorySliceState = {
  coefficients: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<number>) => {
      state.coefficients.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToHistory } = historySlice.actions;

export default historySlice.reducer;
