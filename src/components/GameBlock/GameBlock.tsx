import ButtonGameBlock from "../ButtonGameBlock/ButtonGameBlock";
import { FC, useEffect } from "react";
import MainGameBlock from "../MainGameBlock/MainGameBlock";
import HistoryGameBlock from "../HistoryGameBlock/HistoryGameBlock";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchData } from "@/store/reducers/data";
import {
  changeCoefficient,
  changePrevCoefficient,
} from "@/store/reducers/CoefficientHistorySlice";
import { changeState } from "@/store/reducers/StateSlice";

import style from "./GameBlock.module.scss";
import { usePrevious } from "@/hooks/usePrevious";

const GameBlock: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.data);

  const prevDataCoufficent = usePrevious(data?.current_coefficients?.[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchData());
    }, 1500);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(changeState(data.state));
      dispatch(changePrevCoefficient(prevDataCoufficent ?? null));
      dispatch(changeCoefficient(data.current_coefficients?.[0]));
    }
  }, [data]);
  
  return (
    <div className={style.game}>
      <HistoryGameBlock />
      <MainGameBlock />
      <ButtonGameBlock />
    </div>
  );
};

export default GameBlock;
