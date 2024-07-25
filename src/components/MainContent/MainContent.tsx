import { FC } from "react";
import HistoryBlock from "../HistoryBlock/HistoryBlock";
import GameBlock from "../GameBlock/GameBlock";
import style from "./MainContent.module.scss";

const MainContent: FC = () => {
  return (
    <div className={style.container}>
      <HistoryBlock />
      <GameBlock />
    </div>
  );
};

export default MainContent;
