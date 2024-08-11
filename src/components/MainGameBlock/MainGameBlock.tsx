import React, { useEffect } from "react";
import clsx from "clsx";
import { Loader } from "../Loader/Loader";
import { useGame } from "@/hooks/useGame";
import { useAppSelector } from "@/hooks/redux";

import styles from "./MainGameBlock.module.scss";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

const MainGameBlock: React.FC = () => {
  const dimensions = useWindowDimensions();
  const { state, jet } = useAppSelector((state) => ({
    state: state.state.state,
    jet: state.jet.jet,
  }));
  const { animWrapRef, currentCoefficientValue, handleStart } = useGame();

  useEffect(() => {
    jet?.updateSizes();
    if (state === "ending") {
      jet?.end();
    }
  }, [dimensions]);

  return (
    <div className={styles.jetMainAnimation}>
      <div className={styles.jetMainAnimationContent}>
        <div
          className={clsx(styles.jetMainSchedule, styles.scheduleActive, {
            [styles.scheduleEnd]: state === "ending",
          })}
        >
          <Loader duration={5} onStart={handleStart} />

          <div className={clsx(styles.scheduleBg, styles.scheduleBg1)} />
          <div className={clsx(styles.scheduleBg, styles.scheduleBg2)} />
          <div className={clsx(styles.scheduleBg, styles.scheduleBg3)} />
          <div className={clsx(styles.scheduleBg, styles.scheduleBg4)} />
          <div className={clsx(styles.luckyJet, "lucky-jet")} ref={animWrapRef}>
            <div className={clsx(styles.coefficientWrapper, styles[state])}>
              <div id="main-coefficient" className={styles.currentCoefficient}>
                {currentCoefficientValue}
              </div>
              <div id="flew-away-text" className={styles.coefficientEnded}>
                Улетел
              </div>
            </div>
            <div className={clsx(styles.luckyJet__pilot, "lucky-jet__pilot")}>
              <div className={styles.luckyJet__pilotImg}>
                <img src="fire.svg" alt="fire" className={styles.fire} />
                <img src="boy.webp" alt="boy" className={styles.boy} />
              </div>
            </div>
            <svg className={styles.luckyJet__svg}>
              <defs>
                <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
                  <stop stopColor="#9d7aff" stopOpacity=".33"></stop>
                  <stop
                    offset=".987"
                    stopColor="#9d7aff"
                    stopOpacity="0"
                  ></stop>
                </linearGradient>
                <linearGradient id="grad_stroke" x1="0" x2="1" y1="0" y2="1">
                  <stop stopColor="#9D7AFF"></stop>
                  <stop offset=".787" stopColor="#622BFC"></stop>
                  <stop offset="1" stopColor="#5c24fc" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <g>
                <path
                  className={clsx(
                    styles.luckyJet__svgStroke,
                    "lucky-jet__svg-stroke"
                  )}
                  fill="transparent"
                  stroke="url(#grad_stroke)"
                ></path>
                <path
                  className={clsx(
                    styles.luckyJet__svgGrad,
                    "lucky-jet__svg-grad"
                  )}
                  fill="url(#grad)"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainGameBlock;
