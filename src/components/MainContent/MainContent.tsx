import { FC, useEffect } from "react";
import HistoryBlock from "../HistoryBlock/HistoryBlock";
import GameBlock from "../GameBlock/GameBlock";
import style from "./MainContent.module.scss";
import Alert from "../Alert/Alert";


const MainContent: FC = () => {
  return (
    <div className={style.container}>
      <Alert />
      <HistoryBlock />
      <GameBlock />
    </div>
  );
};

export default MainContent;
