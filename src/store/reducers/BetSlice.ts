import { TBet, TBetStatus } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TBetButtonsIndex = 0 | 1;
type TBets = Record<TBetButtonsIndex, TBet>;

export interface BetSliceBet {
  bets: TBets;
}

const initialState: BetSliceBet = {
  bets: {
    0: {
      winning: null,
      autoBid: false,
      autoOutput: false,
      autoOutputCoefficent: 2,
      status: "bid",
      bid: 20,
      moneyBetted: false,
    },
    1: {
      winning: null,
      autoBid: false,
      autoOutput: false,
      autoOutputCoefficent: 2,
      status: "bid",
      bid: 20,
      moneyBetted: false,
    },
  },
};

export const BetSlice = createSlice({
  name: "bet",
  initialState,
  reducers: {
    changeBetWinning(state, action: PayloadAction<{ index: TBetButtonsIndex, value: number | null }>) {
      state.bets[action.payload.index].winning = action.payload.value;
    },
    changeBetAutoBid(state, action: PayloadAction<{ index: TBetButtonsIndex, value: boolean }>) {
      state.bets[action.payload.index].autoBid = action.payload.value;
    },
    changeBetAutoOutputCoefficent(state, action: PayloadAction<{ index: TBetButtonsIndex, value: number }>) {
      state.bets[action.payload.index].autoOutputCoefficent = action.payload.value;
    },
    changeBetAutoOutput(state, action: PayloadAction<{ index: TBetButtonsIndex, value: boolean }>) {
      state.bets[action.payload.index].autoOutput = action.payload.value;
    },
    changeBetStatus(state, action: PayloadAction<{ index: TBetButtonsIndex, value: TBetStatus }>) {
      state.bets[action.payload.index].status = action.payload.value;
    },
    changeBetBid(state, action: PayloadAction<{ index: TBetButtonsIndex, value: number }>) {
      state.bets[action.payload.index].bid = action.payload.value;
    },
    addBetBid(state, action: PayloadAction<{ index: TBetButtonsIndex, value: number }>) {
      state.bets[action.payload.index].bid += action.payload.value;
    },
    removeBetBid(state, action: PayloadAction<{ index: TBetButtonsIndex, value: number }>) {
      state.bets[action.payload.index].bid -= action.payload.value;
    },
    changeBetMoney(state, action: PayloadAction<{ index: TBetButtonsIndex, value: boolean }>) {
      state.bets[action.payload.index].moneyBetted = action.payload.value;
    },
  },
});

export const {
  changeBetAutoBid,
  changeBetAutoOutput,
  changeBetAutoOutputCoefficent,
  changeBetStatus,
  changeBetWinning,
  changeBetBid,
  addBetBid,
  removeBetBid,
  changeBetMoney,
} = BetSlice.actions;

export default BetSlice.reducer;
