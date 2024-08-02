import { FC } from "react";
import BetSection from "./BetSection"; // Import the new component
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TBetButtonsIndex,
  getCurrentBetButton,
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
      setValue("autoFirstOutputCoefficient", formatedValue);
      dispatch(
        getCurrentBetButton(index).changeAutoOutputCoefficient(
          Number(formatedValue)
        )
      );
    }
  };

  const changeBid = (value: string, index: TBetButtonsIndex) => {
    const filteredValue = removeSpacesOnWord(value);
    const formatedValue = formatInputValue(filteredValue, 5);
    const newValue = formatStringWithSpaces(formatedValue);
    setValue(!index ? "firstBid" : "secondBid", newValue);
    dispatch(
      getCurrentBetButton(index).changeBetBid(parseFloat(formatedValue))
    );
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
    dispatch(getCurrentBetButton(index).removeBetBid(number));
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
    dispatch(getCurrentBetButton(index).addBetBid(number));
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
      dispatch(getCurrentBetButton(index).changeBetAutoStatus("cancel"));
    } else {
      dispatch(getCurrentBetButton(index).changeBetAutoStatus("bid"));
    }
    dispatch(getCurrentBetButton(index).changeBetAutoBid(checked));
  };

  const changeAutoOutput = (checked: boolean, index: TBetButtonsIndex) => {
    dispatch(getCurrentBetButton(index).changeBetAutoOutput(checked));
  };

  const handleBet = (index: TBetButtonsIndex) => {
    if (bets[index].moneyBetted && state === "flying") {
      dispatch(getCurrentBetButton(index).changeBetAutoStatus("bid"));
    }

    if (!bets[index].moneyBetted) {
      switch (state) {
        case "flying":
          dispatch(getCurrentBetButton(index).changeBetAutoStatus("cancel"));
          break;
        case "betting":
          dispatch(getCurrentBetButton(index).changeBetAutoStatus("wait"));
      }
    }
  };

  return (
    <div className={style.main}>
      <div className={style.container}>
        <BetSection
          changeBid={changeBid}
          betIndex={0}
          bets={bets}
          state={state}
          dispatch={dispatch}
          register={register}
          setValue={setValue}
          getValues={getValues}
          changeAutoOutputCoefficient={changeAutoOutputCoefficient}
          blurAutoOutputCoefficient={blurAutoOutputCoefficient}
          changeAutoBid={changeAutoBid}
          changeAutoOutput={changeAutoOutput}
          removeBid={removeBid}
          addBid={addBid}
          handleBet={handleBet}
        />
        <BetSection
          changeBid={changeBid}
          betIndex={1}
          bets={bets}
          state={state}
          dispatch={dispatch}
          register={register}
          setValue={setValue}
          getValues={getValues}
          changeAutoOutputCoefficient={changeAutoOutputCoefficient}
          blurAutoOutputCoefficient={blurAutoOutputCoefficient}
          changeAutoBid={changeAutoBid}
          changeAutoOutput={changeAutoOutput}
          removeBid={removeBid}
          addBid={addBid}
          handleBet={handleBet}
        />
      </div>
    </div>
  );
};

export default ButtonGameBlock;
