import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import coefficentHistory from "./CoefficientHistorySlice";
import betHistory from "./BetHistorySlice";
import balance from "./BalansSlice";
import state from "./StateSlice";
import data from "./data";
import bets from "./BetSlice";
import alert from "./AlertSlice";
import jet from "./JetSlice";

const reducer = combineReducers({
  coefficentHistory: persistReducer(
    { key: "coefficients", storage, keyPrefix: "" },
    coefficentHistory
  ),
  betHistory: persistReducer(
    {
      key: "history",
      storage,
      keyPrefix: "",
    },
    betHistory
  ),
  balance,
  data,
  state,
  bets,
  alert,
  jet,
});

export default reducer;
