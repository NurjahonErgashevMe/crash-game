import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCountUp } from "use-count-up";
import { useWindowDimensions } from "./useWindowDimensions";
import { getResponsiveOptions } from "@/helpers/getResponsiveOptions";
import { useAppSelector } from "@/hooks/redux";
import { TState } from "@/types/types";

export const useGame = () => {
  const { state } = useAppSelector((state) => state.state);
  const { currentCoefficient, prevCoefficient } = useAppSelector(
    (state) => state.coefficentHistory
  );

  const windowDimensions = useWindowDimensions();
  const animWrapRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState<boolean>(false);
  const [loaderStatus, setLoaderStatus] = useState<"loader" | "wait" | "none">(
    "loader"
  );
  const [secondCountStatus, setSecondCountStatus] = useState<
    "flying" | "left" | "right"
  >("flying");
  const [wrapperDimensions, setWrapperDimensions] = useState<{
    width: number;
    height: number;
  }>();

  const isStarted = loaderStatus === "none";
  const isEnded = state === "ending";

  const wrapper_width = (multiply_by: number = 1): number =>
    wrapperDimensions ? wrapperDimensions.width * multiply_by : 0;
  const wrapper_height = (multiply_by: number = 1) =>
    wrapperDimensions ? wrapperDimensions.height * multiply_by : 0;

  const countsResponsiveOptions = useMemo(
    () => getResponsiveOptions(windowDimensions.width),
    [windowDimensions.width]
  );

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

  const { value: vwCountup, reset: wCountupReset } = useCountUp({
    isCounting: start,
    start: 0,
    end: wrapper_width(0.52),
    duration: 3,
  });

  const { value: vwCountup2, reset: wCountupReset2 } = useCountUp({
    isCounting: start,
    start: 0,
    end: wrapper_width(0.8),
    duration: 3,
    // onComplete: () => toggleStatus(),
  });

  const { value: vwCountup2Left, reset: wCountupResetLeft } = useCountUp({
    isCounting: start,
    start: wrapper_width(0.83),
    end: wrapper_width(0.8),
    duration: 3,
    easing: "linear",
    // onComplete: () => toggleStatus(),
  });

  const { value: vwCountup2Right, reset: wCountupResetRight } = useCountUp({
    isCounting: start,
    start: wrapper_width(0.8),
    end: wrapper_width(0.83),
    duration: 3,
    easing: "linear",
    // onComplete: () => toggleStatus(),
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

  const toggleStatus = () => {
    console.log(secondCountStatus);
    switch (secondCountStatus) {
      case "flying":
        wCountupResetRight();
        wCountupBoyResetRight();
        setSecondCountStatus("right");
        break;
      case "right":
        wCountupResetLeft();
        wCountupBoyResetLeft();
        setSecondCountStatus("left");
        break;
      case "left":
        wCountupResetRight();
        wCountupBoyResetRight();
        setSecondCountStatus("right");
        break;
      default:
        setSecondCountStatus("flying");
    }
  };

  const handleStart = useCallback(() => {
    if (animWrapRef.current) {
      setStart(true);
      setWrapperDimensions({
        width: animWrapRef.current?.clientWidth,
        height: animWrapRef.current?.clientHeight,
      });

      // console.log("start");

      setSecondCountStatus("flying");

      wCountupBoyReset();
      hCountupBoyReset();

      wCountupReset();
      wCountupReset2();
      hCountupReset2();

      wCountupResetLeft();
      wCountupResetRight();

      currentCoefficientReset();
    }
  }, [state]);

  const handleEnd = useCallback(() => {
    setStart(false);
    setSecondCountStatus("flying");
    setTimeout(() => {
      setLoaderStatus(() => "none");
    }, 2000);
  }, []);

  const onStateChange = useCallback(
    (state: TState) => {
      switch (state) {
        case "ending":
          handleEnd();
          break;
        case "waiting":
          setLoaderStatus(() => "wait");
          break;
        case "flying":
          handleStart();
          setLoaderStatus(() => "none");
          break;
        case "betting":
          setLoaderStatus(() => "loader");
          break;
      }
    },
    [loaderStatus]
  );

  useEffect(() => {
    // console.log(state , 'state')
    onStateChange(state);
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

  return {
    animWrapRef,
    start,
    secondCountStatus,
    wrapperDimensions,
    currentCoefficientValue,
    vwCountupBoy,
    vwCountupBoyRight,
    vwCountupBoyLeft,
    vhCountupBoy,
    vwCountup,
    vwCountup2,
    vwCountup2Left,
    vwCountup2Right,
    vhCountup2,
    secondCounts,
    boyCounts,
    handleStart,
    handleEnd,
    wrapper_width,
    wrapper_height,
    onStateChange,
    loaderStatus,
    setLoaderStatus,
    isEnded,
  };
};
