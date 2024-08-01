import { TBet, TBetStatus } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
    // first bet
    changeFirstBetWinning(state, action: PayloadAction<number | null>) {
      state.bets[0].winning = action.payload;
    },
    changeFirstBetAutoBid(state, action: PayloadAction<boolean>) {
      state.bets[0].autoBid = action.payload;
    },
    changeFirstBetAutoOutputCoefficent(state, action: PayloadAction<number>) {
      state.bets[0].autoOutputCoefficent = action.payload;
    },
    changeFirstBetAutoOutput(state, action: PayloadAction<boolean>) {
      state.bets[0].autoOutput = action.payload;
    },
    changeFirstBetAutoStatus(state, action: PayloadAction<TBetStatus>) {
      state.bets[0].status = action.payload;
    },
    addFirstBetBid(state, action: PayloadAction<number>) {
      state.bets[0].bid += action.payload;
    },

    removeFirstBetBid(state, action: PayloadAction<number>) {
      state.bets[0].bid -= action.payload;
    },

    changeFirstBetBid(state, action: PayloadAction<number>) {
      state.bets[0].bid = action.payload;
    },
    changeFirstBetMoney(state, action: PayloadAction<boolean>) {
      state.bets[0].moneyBetted = action.payload;
    },

    // second set

    changeSecondBetWinning(state, action: PayloadAction<number | null>) {
      state.bets[1].winning = action.payload;
    },
    changeSecondBetAutoBid(state, action: PayloadAction<boolean>) {
      state.bets[1].autoBid = action.payload;
    },
    changeSecondBetAutoOutputCoefficent(state, action: PayloadAction<number>) {
      state.bets[1].autoOutputCoefficent = action.payload;
    },
    changeSecondBetAutoOutput(state, action: PayloadAction<boolean>) {
      state.bets[1].autoOutput = action.payload;
    },
    changeSecondBetAutoStatus(state, action: PayloadAction<TBetStatus>) {
      state.bets[1].status = action.payload;
    },
    changeSecondBetBid(state, action: PayloadAction<number>) {
      state.bets[1].bid = action.payload;
    },
    addSecondBetBid(state, action: PayloadAction<number>) {
      state.bets[1].bid += action.payload;
    },
    removeSecondBetBid(state, action: PayloadAction<number>) {
      state.bets[1].bid -= action.payload;
    },
    changeSecondBetMoney(state, action: PayloadAction<boolean>) {
      state.bets[1].moneyBetted = action.payload;
    },
  },
});

export const {
  changeFirstBetAutoBid,
  changeFirstBetAutoOutput,
  changeFirstBetAutoOutputCoefficent,
  changeFirstBetAutoStatus,
  changeFirstBetWinning,
  changeFirstBetBid,
  addFirstBetBid,
  removeFirstBetBid,
  changeFirstBetMoney,

  changeSecondBetAutoBid,
  changeSecondBetAutoOutput,
  changeSecondBetAutoOutputCoefficent,
  changeSecondBetAutoStatus,
  changeSecondBetWinning,
  changeSecondBetBid,
  addSecondBetBid,
  removeSecondBetBid,
  changeSecondBetMoney,
} = BetSlice.actions;

/**
 * Returns an object containing functions to change bet-related settings based on the provided index.
 *
 * This function conditionally returns different sets of handler functions depending on the value of the `index` parameter.
 * - If `index` is falsy (e.g., `0`, `null`, or `undefined`), it returns handlers for the first bet.
 * - If `index` is truthy (e.g., `1`), it returns handlers for the second bet.
 *
 * The returned object includes the following functions:
 * - `changeAutoOutputCoefficient(value: number)`: Updates the auto output coefficient for the specified bet.
 * - `changeBetAutoBid(checked: boolean)`: Toggles the auto-bid setting for the specified bet.
 * - `changeBetAutoOutput(checked: boolean)`: Toggles the auto-output setting for the specified bet.
 *
 * @param {TBetButtonsIndex} index - The index to determine which set of handler functions to return.
 *                                   If `index` is falsy, handlers for the first bet are returned.
 *                                   If `index` is truthy, handlers for the second bet are returned.
 * @returns {{
 *   changeAutoOutputCoefficient: (value: number) => any;
 *   changeBetAutoBid: (checked: boolean) => any;
 *   changeBetAutoOutput: (checked: boolean) => any;
 * }} - An object containing handler functions based on the `index` value.
 */
export const getCurrentBetButton = (
  index: TBetButtonsIndex
): {
  changeAutoOutputCoefficient: (value: number) => any;
  changeBetAutoBid: (checked: boolean) => any;
  changeBetAutoOutput: (checked: boolean) => any;
  changeBetAutoStatus: (type: TBetStatus) => any;
  changeBetBid: (bet: number) => any;
  addBetBid: (bet: number) => any;
  removeBetBid: (bet: number) => any;
  changeBetMoney: (betted: boolean) => any;
} => {
  if (!index) {
    return {
      changeAutoOutputCoefficient: (value: number) =>
        changeFirstBetAutoOutputCoefficent(value),
      changeBetAutoBid: (checked: boolean) => changeFirstBetAutoBid(checked),
      changeBetAutoOutput: (checked: boolean) =>
        changeFirstBetAutoOutput(checked),
      changeBetAutoStatus: (type) => changeFirstBetAutoStatus(type),
      changeBetBid: (id) => changeFirstBetBid(id),
      addBetBid: (id) => addFirstBetBid(id),
      removeBetBid: (id) => removeFirstBetBid(id),
      changeBetMoney: (betted) => changeFirstBetMoney(betted),
    };
  }

  return {
    changeAutoOutputCoefficient: (value: number) =>
      changeSecondBetAutoOutputCoefficent(value),
    changeBetAutoBid: (checked: boolean) => changeSecondBetAutoBid(checked),
    changeBetAutoOutput: (checked: boolean) =>
      changeSecondBetAutoOutput(checked),
    changeBetAutoStatus: (type) => changeSecondBetAutoStatus(type),
    changeBetBid: (id) => changeSecondBetBid(id),
    addBetBid: (id) => addSecondBetBid(id),
    removeBetBid: (id) => removeSecondBetBid(id),
    changeBetMoney: (betted) => changeSecondBetMoney(betted),
  };
};
export default BetSlice.reducer;
