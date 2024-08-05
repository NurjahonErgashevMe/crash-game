import React, { useCallback } from "react";
import styles from "./MainGameBlock.module.scss";
import clsx from "clsx";
import { Loader } from "../Loader/Loader";
import { useGame } from "@/hooks/useGame";
import { useAppSelector } from "@/hooks/redux";

const fixedThree = (number: string | number) =>
  typeof number === "number" ? number.toFixed(3) : Number(number).toFixed(3);

const MainGameBlock: React.FC = () => {
  const { state } = useAppSelector((state) => state.state);
  const {
    animWrapRef,
    secondCountStatus,
    currentCoefficientValue,
    vhCountupBoy,
    vwCountup,
    vhCountup2,
    secondCounts,
    boyCounts,
    handleStart,
    handleEnd,
    isLoading,
    isEnded,
    wrapper_height,
  } = useGame();

  return (
    <div className={styles.jetMainAnimation}>
      <div className={styles.jetMainAnimationContent}>
        <div
          className={clsx(styles.jetMainSchedule, styles.scheduleActive, {
            [styles.scheduleEnd]: isLoading || isEnded,
          })}
        >
          <div
            className={clsx(styles.loading, {
              [styles.hide]: !isLoading,
            })}
          >
            <Loader duration={5} onStart={handleStart} onEnded={handleEnd} />
          </div>

          <div className={clsx(styles.scheduleBg, styles.scheduleBg1)} />
          <div className={clsx(styles.scheduleBg, styles.scheduleBg2)} />
          <div className={clsx(styles.scheduleBg, styles.scheduleBg3)} />
          <div className={clsx(styles.scheduleBg, styles.scheduleBg4)} />
          <div className={styles.luckyJet} ref={animWrapRef}>
            <div className={clsx(styles.coefficientWrapper, styles[state])}>
              <div id="main-coefficient" className={styles.currentCoefficient}>
                {currentCoefficientValue}
              </div>
              <div id="flew-away-text" className={styles.coefficientEnded}>
                Улетел
              </div>
            </div>
            <div
              className={clsx(styles.luckyJet__pilot, {
                [styles.ended]: isEnded,
              })}
              style={{
                transform: isEnded
                  ? `translate(3000%,-200%)`
                  : `translate(${boyCounts[secondCountStatus]}px, ${vhCountupBoy}px)`,
              }}
            >
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
                  className={styles.luckyJet__svgStroke}
                  fill="transparent"
                  stroke="url(#grad_stroke)"
                  d={
                    isLoading
                      ? `M 0 0 Q 0 0 Q 0 0`
                      : `M 0 ${wrapper_height()} Q ${fixedThree(
                          Number(vwCountup)
                        )} ${wrapper_height()} ${fixedThree(
                          Number(secondCounts[secondCountStatus])
                        )} ${fixedThree(Number(vhCountup2))}`
                  }
                ></path>
                <path
                  className={styles.luckyJet__svgGrad}
                  fill="url(#grad)"
                  d={
                    isLoading
                      ? `M 0 0 Q 0 0 0 0 L 0 0 Z`
                      : `M 0 ${wrapper_height()} Q ${fixedThree(
                          Number(vwCountup)
                        )} ${wrapper_height()} ${fixedThree(
                          Number(secondCounts[secondCountStatus])
                        )} ${fixedThree(Number(vhCountup2))} L ${fixedThree(
                          Number(secondCounts[secondCountStatus])
                        )} ${wrapper_height()} Z`
                  }
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
