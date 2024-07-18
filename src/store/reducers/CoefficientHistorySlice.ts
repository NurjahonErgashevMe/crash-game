import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CoefficientHistorySliceState {
  coefficient: number[];
}

const initialState: CoefficientHistorySliceState = {
  coefficient: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<number>) => {
      state.coefficient.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToHistory } = historySlice.actions;

export default historySlice.reducer;
