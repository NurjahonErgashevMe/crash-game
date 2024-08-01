export type TState = "betting" | "flying" | "waiting" | "ending";

export type TBetStatus = "bid" | "cancel" | "take" | "wait";

export type TBet = {
  autoBid: boolean;
  autoOutput: boolean;
  autoOutputCoefficent: number;
  status: TBetStatus;
  winning: number | null;
  bid: number;
  moneyBetted: boolean;
};
