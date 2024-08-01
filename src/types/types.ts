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
  start_event: {
    autocashout_settings: TAutoCashOut;
    currency_settings: {
      [key: string]: {
        max_bet_value: number;
        min_bet_value: number;
      };
    };
    current_time: string;
    event_id: string;
    event_type: string;
    maximum_win: number;
    middle_coefficient: number;
    minimum_voucher_cash_out_coefficient: number;
    next_server_seed: number;
    next_state_time: string;
    round_id: string;
    state: "betting";
  };
}
