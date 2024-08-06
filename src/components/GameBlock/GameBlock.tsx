import ButtonGameBlock from "../ButtonGameBlock/ButtonGameBlock";
import { FC, useEffect, useRef } from "react";
import MainGameBlock from "../MainGameBlock/MainGameBlock";
import HistoryGameBlock from "../HistoryGameBlock/HistoryGameBlock";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchData } from "@/store/reducers/data";
import { historyActions } from "@/store/reducers/CoefficientHistorySlice";
import { changeState } from "@/store/reducers/StateSlice";

import style from "./GameBlock.module.scss";
import { usePrevious } from "@/hooks/usePrevious";

const GameBlock: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.data);

  const prevDataCoufficent = usePrevious(data?.current_coefficients?.[0]);
  const bufferRef = useRef<any[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchData());
    }, 500);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      bufferRef.current.push(data);

      setTimeout(() => {
        const bufferedData = bufferRef.current.shift();
        if (bufferedData) {
          // console.log(bufferedData , 'bufferedData')
          dispatch(changeState(bufferedData.state));
          dispatch(historyActions.changePrevCoefficient(prevDataCoufficent ?? null));
          dispatch(historyActions.changeCoefficient(bufferedData.current_coefficients?.[0]));
        }
      }, 2000);
    }
  }, [data, dispatch, prevDataCoufficent]);

  return (
    <div className={style.game}>
      <HistoryGameBlock />
      <MainGameBlock />
      <ButtonGameBlock />
    </div>
  );
};

export default GameBlock;
