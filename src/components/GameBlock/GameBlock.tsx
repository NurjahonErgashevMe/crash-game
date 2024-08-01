import ButtonGameBlock from "../ButtonGameBlock/ButtonGameBlock";
import { FC, useEffect } from "react";
import HistoryGameBlock from "../HistoryGameBlock/HistoryGameBlock";

import style from "./GameBlock.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchData } from "@/store/reducers/data";
import MainGameBlock from "../MainGameBlock/MainGameBlock";

const GameBlock: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  console.log(data);

  return (
    <div className={style.game}>
      <HistoryGameBlock />
      <MainGameBlock />
      <ButtonGameBlock />
    </div>
  );
};

export default GameBlock;
