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
    dispatch(fetchData());
  }, [dispatch]);

  console.log(data)

  return (
    <div className={style.game}>
      <HistoryGameBlock />
      <MainGameBlock 
      stop_coefficients={data?.start_event} 
      // current_coefficients={}
      //  state=""
           />
      <ButtonGameBlock />
    </div>
  );
};

export default GameBlock;
