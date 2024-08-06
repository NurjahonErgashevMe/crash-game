import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://lucky-jet-history.gamedev-atech.cc/public/history/api/history",
});
