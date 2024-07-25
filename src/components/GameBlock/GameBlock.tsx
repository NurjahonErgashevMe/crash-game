// import ButtonGameBlock from "../ButtonGameBlock/ButtonGameBlock";
import { FC } from "react";
import MainGameBlock from "../MainGameBlock/MainGameBlock";
import HistoryGameBlock from "../HistoryGameBlock/HistoryGameBlock";

import { historyCoefficients } from "@/mocks/history";

import style from "./GameBlock.module.scss";


const GameBlock:FC = () => {
  return (
    <div className={style.game}>
      <HistoryGameBlock coefficients={historyCoefficients} />
      <MainGameBlock />
      {/* <ButtonGameBlock /> */}
    </div>
  );
};

export default GameBlock;
