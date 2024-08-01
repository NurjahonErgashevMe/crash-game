import { TState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StateSliceState {
  state: TState;
}

const initialState: StateSliceState = {
  state: "betting",
};

export const StateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    changeState(state, action: PayloadAction<TState>) {
      state.state = action.payload;
    },
  },
});

export const { changeState } = StateSlice.actions;

export default StateSlice.reducer;
