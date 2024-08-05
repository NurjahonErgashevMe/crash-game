import { FC, useCallback, useEffect } from "react";
import BetSection from "./BetSection";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TBetButtonsIndex,
  changeBetAutoBid,
  changeBetAutoOutput,
  changeBetAutoOutputCoefficent,
  changeBetStatus,
  changeBetWinning,
  changeBetBid,
  addBetBid,
  removeBetBid,
  changeBetMoney,
} from "@/store/reducers/BetSlice";
import style from "./ButtonGameBlock.module.scss";
import { formatInputValue } from "@/helpers/formatInputValue";
import { BetCoefficentLimits } from "@/types/enums";
import {
  NUMBER_AND_DOT_REGEX,
  NUMBER_AND_DOT_SPACE_REGEX,
} from "@/shared/regexp";
import { isValidNumber } from "@/shared/validations";
import { formatStringWithSpaces } from "@/helpers/formatWithSpace";
import { removeSpacesOnWord } from "@/helpers/removeSpaces";
import { useGame } from "@/hooks/useGame";

const schema = z.object({
  autoOutputCoefficient: z
    .string()
    .regex(NUMBER_AND_DOT_REGEX, "Must be a valid number")
    .transform((val) => parseFloat(val).toFixed(2)),
  firstBid: z.string().regex(NUMBER_AND_DOT_REGEX, "Must be a valid number"),
  secondBid: z
    .string()
    .regex(NUMBER_AND_DOT_SPACE_REGEX, "Must be a valid number"),
});

const ButtonGameBlock: FC = () => {
  const { bets } = useAppSelector((state) => state.bets);
  const { state } = useAppSelector((state) => state.state);
  const { currentCoefficient } = useAppSelector(
    (state) => state.coefficentHistory
  );

  const dispatch = useAppDispatch();

  const {
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      autoFirstOutputCoefficient: bets[0].autoOutputCoefficent.toFixed(2),
      autoSecondOutputCoefficient: bets[1].autoOutputCoefficent.toFixed(2),
      firstBid: bets[0].bid.toString(),
      secondBid: bets[1].bid.toString(),
    },
    resolver: zodResolver(schema),
  });

  const changeAutoOutputCoefficient = (
    value: string,
    index: TBetButtonsIndex
  ) => {
    const formatedValue = formatInputValue(value);
    if (isValidNumber(value)) {
      setValue(
        !index ? "autoFirstOutputCoefficient" : "autoFirstOutputCoefficient",
        formatedValue
      );
      dispatch(
        changeBetAutoOutputCoefficent({ index, value: Number(formatedValue) })
      );
    }
  };

  const changeBid = (value: string, index: TBetButtonsIndex) => {
    const filteredValue = removeSpacesOnWord(value);
    const formatedValue = formatInputValue(filteredValue, 5);
    const newValue = formatStringWithSpaces(formatedValue);
    setValue(!index ? "firstBid" : "secondBid", newValue);
    dispatch(changeBetBid({ index, value: parseFloat(formatedValue) }));
  };

  const removeBid = (number: number, index: TBetButtonsIndex) => {
    if (bets[index].bid <= BetCoefficentLimits.min) {
      return;
    }
    const currentBid: "firstBid" | "secondBid" = !index
      ? "firstBid"
      : "secondBid";
    const value = removeSpacesOnWord(getValues(currentBid));
    setValue(currentBid, `${parseFloat(value) - number}`);
    dispatch(removeBetBid({ index, value: number }));
  };

  const addBid = (number: number, index: TBetButtonsIndex) => {
    if (bets[index].bid >= BetCoefficentLimits.max - 10) {
      return;
    }
    const currentBid: "firstBid" | "secondBid" = !index
      ? "firstBid"
      : "secondBid";
    const value = removeSpacesOnWord(getValues(currentBid));
    setValue(currentBid, `${parseFloat(value) + number}`);
    dispatch(addBetBid({ index, value: number }));
  };

  const blurAutoOutputCoefficient = (e: any, index: TBetButtonsIndex) => {
    const valueName = !index
      ? "autoFirstOutputCoefficient"
      : "autoSecondOutputCoefficient";
    const value = parseFloat(e.target.value) || 0;

    if (value <= 1) {
      setValue(valueName, "1.01");
    } else {
      setValue(valueName, value.toFixed(2));
    }
  };

  const changeAutoBid = (checked: boolean, index: TBetButtonsIndex) => {
    if (checked) {
      dispatch(changeBetStatus({ index, value: "cancel" }));
    } else {
      dispatch(changeBetStatus({ index, value: "bid" }));
    }
    dispatch(changeBetAutoBid({ index, value: checked }));
  };

  const changeAutoOutput = (checked: boolean, index: TBetButtonsIndex) => {
    dispatch(changeBetAutoOutput({ index, value: checked }));
  };

  const handleBet = (index: TBetButtonsIndex) => {
    const status = bets[index].status;

    if (bets[index].moneyBetted) {
      if (state === "flying") {
        dispatch(changeBetStatus({ index, value: "bid" }));
        dispatch(changeBetMoney({ index, value: false }));
        alert(`taked! won - ${bets[index].bid * currentCoefficient}`);
      }
    } else {
      if (status === "cancel") {
        dispatch(changeBetStatus({ index, value: "bid" }));
        dispatch(changeBetMoney({ index, value: false }));
      } else if (status === "take") {
        dispatch(changeBetStatus({ index, value: "bid" }));
        dispatch(changeBetMoney({ index, value: false }));
      } else if (status === "bid") {
        if (state === "flying") {
          if (!bets[index].moneyBetted) {
            dispatch(changeBetStatus({ index, value: "cancel" }));
            dispatch(changeBetMoney({ index, value: false }));
          } else {
            dispatch(changeBetStatus({ index, value: "bid" }));
            dispatch(changeBetMoney({ index, value: true }));
          }
        } else {
          dispatch(changeBetStatus({ index, value: "wait" }));
          dispatch(changeBetMoney({ index, value: true }));
        }
      }
    }
  };

  const onChangeState = useCallback(
    (index: TBetButtonsIndex) => {
      const status = bets[index].status;
      if (bets[index].moneyBetted) {
        if (state === "flying") {
          dispatch(changeBetStatus({ index, value: "take" }));
        } else if (state === "ending") {
          if (status === "take") {
            dispatch(changeBetStatus({ index, value: "bid" }));
            dispatch(changeBetMoney({ index, value: false }));
          } else if (status === "cancel") {
            dispatch(changeBetStatus({ index, value: "wait" }));
            dispatch(changeBetMoney({ index, value: true }));
          }
        } else {
          if (status === "cancel") {
            dispatch(changeBetStatus({ index, value: "wait" }));
            dispatch(changeBetMoney({ index, value: true }));
          }
        }
      } else {
        if (status === "cancel") {
          dispatch(changeBetStatus({ index, value: "wait" }));
          dispatch(changeBetMoney({ index, value: true }));
        }
      }
    },
    [state, bets]
  );

  useEffect(() => {
    onChangeState(0);
    onChangeState(1);
  }, [state]);

  return (
    <div className={style.main}>
      <div className={style.container}>
        <BetSection
          betIndex={0}
          register={register}
          bets={bets}
          addBid={addBid}
          removeBid={removeBid}
          changeBid={changeBid}
          blurAutoOutputCoefficient={blurAutoOutputCoefficient}
          changeAutoBid={changeAutoBid}
          changeAutoOutput={changeAutoOutput}
          changeAutoOutputCoefficient={changeAutoOutputCoefficient}
          handleBet={handleBet}
        />
        <BetSection
          betIndex={1}
          register={register}
          bets={bets}
          addBid={addBid}
          removeBid={removeBid}
          changeBid={changeBid}
          blurAutoOutputCoefficient={blurAutoOutputCoefficient}
          changeAutoBid={changeAutoBid}
          changeAutoOutput={changeAutoOutput}
          changeAutoOutputCoefficient={changeAutoOutputCoefficient}
          handleBet={handleBet}
        />
      </div>
    </div>
  );
};

export default ButtonGameBlock;
