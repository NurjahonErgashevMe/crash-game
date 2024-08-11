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
import { createLuckyJet } from "@/helpers/graph";
import { jetActions } from "@/store/reducers/JetSlice";

const GameBlock: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => ({
    data: state.data.data,
    jet: state.jet.jet,
  }));

  const prevDataCoufficent = usePrevious(data?.current_coefficients?.[0]);
  const bufferRef = useRef<any[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchData());
    }, 500);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    const luckyJet = createLuckyJet({
      glidePointX: 80,
      glidePointY: 30,
      svgOffsetX: 30,
      svgOffsetY: 60,
      svgCurve: 66,
      glideOffsetX: 7,
      glideOffsetY: 4,
      stage1Duration: 2,
      stage2Duration: 1,
      stage3Duration: 0.4,
    });

    luckyJet.updateSizes();

    dispatch(jetActions.changeJet(luckyJet));
  }, []);

  useEffect(() => {
    if (data) {
      bufferRef.current.push(data);

      setTimeout(() => {
        const bufferedData = bufferRef.current.shift();
        if (bufferedData) {
          // console.log(bufferedData , 'bufferedData')
          dispatch(changeState(bufferedData.state));
          dispatch(
            historyActions.changePrevCoefficient(prevDataCoufficent ?? null)
          );
          dispatch(
            historyActions.changeCoefficient(
              bufferedData.current_coefficients?.[0]
            )
          );
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
