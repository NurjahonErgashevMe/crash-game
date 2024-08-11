import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CoefficientHistorySliceState {
  coefficients: number[];
  currentCoefficient: number;
  prevCoefficient: number | null;
}

const initialState: CoefficientHistorySliceState = {
  coefficients: [],
  currentCoefficient: 1,
  prevCoefficient: null,
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<number>) => {
      state.coefficients.unshift(action.payload);
      if (state.coefficients.length > 30) {
        state.coefficients.pop();
      }
    },
    changeCoefficient: (state, action: PayloadAction<number>) => {
      state.currentCoefficient = action.payload;
    },
    changePrevCoefficient: (state, action: PayloadAction<number | null>) => {
      state.prevCoefficient = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const historyActions = historySlice.actions;

export default historySlice.reducer;
