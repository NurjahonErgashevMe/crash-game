interface IHistory {
  coefficient_index: number;
  slot_index: 0 | 1;
  event_type: "cash_out" | "bet";
  event_id: string;
  thanus_user_id: string;
}

export interface IBet extends IHistory {
  currency: string;
  bet_size: number;
  bet_size_usd: number;
}

export interface ICashOut extends IHistory {
  prize_size: number;
  coefficient: number;
}

export type TAutoCashOut = { min: number; max: number };

export type TResponseState = "betting" | "flying" | "waiting" | "ending";
export interface IResponeStartEvent {
  event_type: string;
  next_state_time: string;
  current_time: string;
  autocashout_settings: TAutoCashOut;
  state: TResponseState;
}

export interface IResponse {
  state: TResponseState;
  state_changed_at: null;
  next_state_time: string;
  current_time: string;
  current_coefficients: [number];
  stop_coefficients: [number | null];
  bets: IBet[];
  cash_outs: ICashOut[];
  start_event: {};
}
