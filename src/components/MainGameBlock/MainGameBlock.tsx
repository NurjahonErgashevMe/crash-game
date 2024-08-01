import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./MainGameBlock.module.scss";
import { useCountUp } from "use-count-up";
import clsx from "clsx";
import { Loader } from "../Loader/Loader";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { getResponsiveOptions } from "./helpers/getResponsiveOptions";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

type TDimensions = {
  width: number;
  height: number;
};

const fixedThree = (number: string | number) =>
  typeof number === "number" ? number.toFixed(3) : Number(number).toFixed(3);

type Props = {};

const MainGameBlock: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { state } = useAppSelector((state) => state.state);
  const { currentCoefficient, prevCoefficient } = useAppSelector(
    (state) => state.coefficentHistory
  );

  const windowDimensions = useWindowDimensions();
  const animWrapRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState<boolean>(false);
  const [secondCountStatus, setSecondCountStatus] = useState<
    "flying" | "left" | "right"
  >("flying");
  const [wrapperDimensions, setWrapperDimensions] = useState<TDimensions>();

  const wrapper_width = (multiply_by: number = 1): number =>
    wrapperDimensions ? wrapperDimensions.width * multiply_by : 0;
  const wrapper_height = (multiply_by: number = 1) =>
    wrapperDimensions ? wrapperDimensions.height * multiply_by : 0;

  const countsResponsiveOptions = getResponsiveOptions(windowDimensions.width);

  const toggleStatus = () => {
    switch (secondCountStatus) {
      case "flying":
        setSecondCountStatus("right");
        wCountupResetRight();
        wCountupBoyResetRight();
        break;
      case "right":
        setSecondCountStatus("left");
        wCountupResetLeft();
        wCountupBoyResetLeft();
        break;
      case "left":
        setSecondCountStatus("right");
        wCountupResetRight();
        wCountupBoyResetRight();
        break;
      default: {
        setSecondCountStatus("flying");
      }
    }
  };

  const {
    value: currentCoefficientValue,
    reset: currentCoefficientReset,
  } = useCountUp({
    isCounting: start,
    start: prevCoefficient ?? 0,
    end: currentCoefficient ?? 1,
    duration: 2.3,
    decimalPlaces: 2,
  });

  const { value: vwCountupBoy, reset: wCountupBoyReset } = useCountUp({
    isCounting: start,
    end: wrapper_width(0.789),
    duration: 3,
  });

  const { value: vwCountupBoyRight, reset: wCountupBoyResetRight } = useCountUp(
    {
      isCounting: start,
      start: wrapper_width(0.789),
      end: wrapper_width(0.82),
      duration: 3,
      easing: "linear",
      onComplete: () => toggleStatus(),
    }
  );
  const { value: vwCountupBoyLeft, reset: wCountupBoyResetLeft } = useCountUp({
    isCounting: start,
    start: wrapper_width(0.82),
    end: wrapper_width(0.789),
    duration: 3,
    easing: "linear",
    onComplete: () => toggleStatus(),
  });
  const { value: vhCountupBoy, reset: hCountupBoyReset } = useCountUp({
    isCounting: start,

    ...countsResponsiveOptions({
      small: {
        duration: 3,
        start: wrapper_height(0.9),
        end: wrapper_height(0.1),
      },
      medium: {
        duration: 3,
        start: wrapper_height(1 - 0.15),
        end: wrapper_height(0.19),
      },
      big: {
        duration: 3,
        start: wrapper_height(1.15),
        end: wrapper_height(0.25),
      },
    }),
  });

  // for line
  const { value: vwCountup, reset: wCountupReset } = useCountUp({
    isCounting: start,
    end: wrapper_width(0.52),
    duration: 3,
  });
  const { value: vwCountup2, reset: wCountupReset2 } = useCountUp({
    isCounting: start,
    end: wrapper_width(0.8),
    duration: 3,
  });

  const { value: vwCountup2Left, reset: wCountupResetLeft } = useCountUp({
    isCounting: start,
    start: wrapper_width(0.83),
    end: wrapper_width(0.8),
    duration: 3,
    easing: "linear",
  });

  const { value: vwCountup2Right, reset: wCountupResetRight } = useCountUp({
    isCounting: start,
    start: wrapper_width(0.8),
    end: wrapper_width(0.83),
    duration: 3,
    easing: "linear",
  });

  const { value: vhCountup2, reset: hCountupReset2 } = useCountUp({
    isCounting: start,

    ...countsResponsiveOptions({
      small: {
        duration: 3,
        start: wrapper_height(1.1),
        end: wrapper_height(0.3),
      },
      medium: {
        duration: 2.8,
        start: wrapper_height(1),
        end: wrapper_height(0.35),
      },
      big: {
        duration: 3,
        start: wrapper_height(1.2),
        end: wrapper_height(0.35),
      },
    }),
  });
  const secondCounts = useMemo<Record<"flying" | "left" | "right", number>>(
    () => ({
      flying: Number(vwCountup2),
      left: Number(vwCountup2Left),
      right: Number(vwCountup2Right),
    }),
    [vwCountup2, vwCountup2Left, vwCountup2Right]
  );
  const boyCounts = useMemo<Record<"flying" | "left" | "right", number>>(
    () => ({
      flying: Number(vwCountupBoy),
      left: Number(vwCountupBoyLeft),
      right: Number(vwCountupBoyRight),
    }),
    [vwCountupBoyRight, vwCountupBoyLeft, vwCountupBoy]
  );

  const handleStart = useCallback(() => {
    if (animWrapRef.current && state !== "ending") {
      setStart(true); // Start the animation
      setWrapperDimensions({
        width: animWrapRef.current?.clientWidth,
        height: animWrapRef.current?.clientHeight,
      });

      setSecondCountStatus("flying");

      wCountupBoyReset();
      hCountupBoyReset();

      wCountupReset();
      wCountupReset2();
      hCountupReset2();

      currentCoefficientReset();
    }
  }, [state]);

  useEffect(() => {
    currentCoefficientReset();
  }, [currentCoefficient]);

  useEffect(() => {
    if (animWrapRef.current) {
      setWrapperDimensions({
        width: animWrapRef.current?.clientWidth,
        height: animWrapRef.current?.clientHeight,
      });
    }
  }, [windowDimensions]);

  const isLoading = state === "betting";
  const isEnded = state === "ending";

  return (
    <div className={styles.jetMainAnimation}>
      <div className={styles.jetMainAnimationContent}>
        <div
          className={clsx(styles.jetMainSchedule, styles.scheduleActive, {
            [styles.scheduleEnd]: isLoading || state === "ending",
          })}
        >
          <div
            className={clsx(styles.loading, {
              [styles.hide]: !isLoading,
            })}
          >
            <Loader
              duration={5}
              onStart={handleStart}
              onEnded={() => setStart(false)}
            />
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
              className={styles.luckyJet__pilot}
              style={{
                transform: isEnded
                  ? `translate(150%,-200%)`
                  : `translate(${boyCounts[secondCountStatus]}px, ${vhCountupBoy}px)`,
              }}
            >
              <div className={styles.luckyJet__pilotImg}>
                <img src="fire.svg" alt="fire" className={styles.fire} />
                <img src="boy.gif" alt="boy" className={styles.boy} />
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
                  d={`M 0 ${wrapper_height()} Q ${fixedThree(
                    Number(vwCountup)
                  )} ${wrapper_height()} ${fixedThree(
                    Number(secondCounts[secondCountStatus])
                  )} ${fixedThree(Number(vhCountup2))}`}
                ></path>
                <path
                  className={styles.luckyJet__svgGrad}
                  fill="url(#grad)"
                  d={`M 0 ${wrapper_height()} Q ${fixedThree(
                    Number(vwCountup)
                  )} ${wrapper_height()} ${fixedThree(
                    Number(secondCounts[secondCountStatus])
                  )} ${fixedThree(Number(vhCountup2))} L ${fixedThree(
                    Number(secondCounts[secondCountStatus])
                  )} ${wrapper_height()} Z`}
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
