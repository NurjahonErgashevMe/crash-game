import { useCallback, useEffect, useRef, useState } from "react";
import { useCountUp } from "use-count-up";
import { useAppSelector } from "@/hooks/redux";
import { TState } from "@/types/types";

export const useGame = () => {
  const { state } = useAppSelector((state) => state.state);
  const { jet } = useAppSelector((state) => state.jet);
  const { currentCoefficient, prevCoefficient } = useAppSelector(
    (state) => state.coefficentHistory
  );

  const animWrapRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState<boolean>(false);
  const [loaderStatus, setLoaderStatus] = useState<"loader" | "wait" | "none">(
    "loader"
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

  const handleStart = useCallback(() => {
    if (animWrapRef.current && jet) {
      jet.start();
      setStart(true);
    }
  }, [state, jet]);

  const handleEnd = useCallback(() => {
    if (jet) {
      jet?.end();
      console.log("end()");
      setTimeout(() => {
        setLoaderStatus(() => "none");
      }, 2000);
    }
  }, [jet]);

  const onStateChange = useCallback(
    (state: TState) => {
      switch (state) {
        case "ending":
          console.log("ending end()");
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
    [loaderStatus, jet]
  );

  useEffect(() => {
    onStateChange(state);
  }, [state]);

  useEffect(() => {
    currentCoefficientReset();
  }, [currentCoefficient]);

  return {
    animWrapRef,
    start,
    handleStart,
    handleEnd,
    onStateChange,
    loaderStatus,
    setLoaderStatus,
    currentCoefficientValue,
  };
};
