import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TLuckyJet = {
  start: () => void;
  end: () => void;
  updateSizes: () => void;
};

export interface CoefficientHistorySliceState {
  jet: TLuckyJet | null;
}

const initialState: CoefficientHistorySliceState = {
  jet: null,
};

export const jetSlice = createSlice({
  name: "jet",
  initialState,
  reducers: {
    changeJet: (state, action: PayloadAction<TLuckyJet>) => {
      state.jet = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const jetActions = jetSlice.actions;

export default jetSlice.reducer;
