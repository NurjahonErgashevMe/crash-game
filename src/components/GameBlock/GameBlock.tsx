import ButtonGameBlock from "../ButtonGameBlock/ButtonGameBlock";
import { FC, useEffect } from "react";
import MainGameBlock from "../MainGameBlock/MainGameBlock";
import HistoryGameBlock from "../HistoryGameBlock/HistoryGameBlock";

import style from "./GameBlock.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchData } from "@/store/reducers/data";

const GameBlock: FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.data);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchData());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  console.log(data, "data");
  console.log(loading, "loading");
  console.log(error, "err");
  return (
    <div className={style.game}>
      <HistoryGameBlock />
      <MainGameBlock  />
      <ButtonGameBlock />
    </div>
  );
};

export default GameBlock;
