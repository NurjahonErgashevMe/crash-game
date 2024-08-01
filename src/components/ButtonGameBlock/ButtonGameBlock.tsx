import { FC } from "react";
import Checkbox from "../Checkbox/Checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  TBetButtonsIndex,
  getCurrentBetButton,
} from "@/store/reducers/BetSlice";

import style from "./ButtonGameBlock.module.scss";

import clsx from "clsx";
import { formatInputValue } from "@/helpers/formatInputValue";
import { BetCoefficentLimits } from "@/types/enums";
import {
  NUMBER_AND_DOT_REGEX,
  NUMBER_AND_DOT_SPACE_REGEX,
} from "@/shared/regexp";
import { isValidNumber } from "@/shared/validations";
import {
  formatStringWithSpaces,
  formatNumberWithSpaces,
} from "@/helpers/formatWithSpace";
import { removeSpacesOnWord } from "@/helpers/removeSpaces";
import { TBetStatus } from "@/types/types";

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

const betButtonTexts: Record<TBetStatus, string> = {
  bid: "СТАВКА",
  cancel: "ОТМЕНИТЬ",
  take: "ЗАБРАТЬ",
  wait: "ОЖИДАНИЕ",
};

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
      firstBid: bets[0].bid.toString(),
      secondBid: bets[1].bid.toString(),
    },
    resolver: zodResolver(schema),
  });

  const isAutoBidDisabled = state === "waiting";
  const isAutoOutputDisabled = state === "flying";

  const isControllerDisable = (index: TBetButtonsIndex) =>
    bets[index].moneyBetted && bets[index].status !== "bid";

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

  const blurAutoOutputCoefficient = (e: any) => {
    const value = parseFloat(e.target.value) || 0;
    if (value <= 1) {
      setValue("autoFirstOutputCoefficient", "1.01");
    } else {
      setValue("autoFirstOutputCoefficient", value.toFixed(2));
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
        <div className={style.bet}>
          <div id="slot-header" className={style.header}>
            <div
              className={clsx(style.autoBet, {
                [style.disabled]: isAutoBidDisabled,
              })}
            >
              <Checkbox
                checked={bets[0].autoBid}
                setChecked={(checked) => changeAutoBid(checked, 0)}
              />
              <div
                onClick={() => changeAutoBid(!bets[0].autoBid, 0)}
                className={style.checkboxLabel}
              >
                Автоставка
              </div>
            </div>
            <div
              className={clsx(style.autoOutput, {
                [style.disabled]: isAutoOutputDisabled,
              })}
            >
              <Checkbox
                checked={bets[0].autoOutput}
                setChecked={(checked) => changeAutoOutput(checked, 0)}
              />
              <div
                onClick={() => changeAutoOutput(!bets[0].autoOutput, 0)}
                className={style.checkboxLabel}
              >
                Автовывод
              </div>
            </div>
            <div className={clsx(style.firstOutputCoefficientWrapper)}>
              <input
                id="coef-input"
                type="text"
                className={clsx(style.firstOutputCoefficientIput, {
                  [style.disable]: bets[0].autoOutput,
                })}
                {...register("autoFirstOutputCoefficient")}
                onChange={(e) => changeAutoOutputCoefficient(e.target.value, 0)}
                onBlur={blurAutoOutputCoefficient}
                disabled={bets[0].autoOutput}
              />
              <div
                className={clsx(style.firstOutputCoefficientValue, {
                  [style.disable]: bets[0].autoOutput,
                })}
              >
                <div>x</div>
                <div>{bets[0].autoOutputCoefficent.toFixed(2)}</div>
              </div>
            </div>
          </div>
          <div className={style.betAmountController}>
            <div
              className={clsx(style.controllerWrapper, {
                [style.disable]: isControllerDisable(0),
              })}
            >
              <div className={style.betControl}>
                <div className={style.buttonWrapper}>
                  <button
                    className={style.button}
                    id="bet-control-minus"
                    onClick={() => removeBid(10, 0)}
                    disabled={isControllerDisable(0)}
                  >
                    <div
                      className={clsx(style.buttonContent, style.buttonStyles)}
                    >
                      <img src="https://lucky-jet.gamedev-atech.cc/assets/media/97de90559589bee034295a9d2e9e626a.svg" />
                    </div>
                  </button>
                </div>
                <div className={style.inputWrapper}>
                  <input
                    id="bet-amount-input"
                    className={style.input}
                    {...register("firstBid")}
                    onChange={(e) => changeBid(e.target.value, 0)}
                    disabled={isControllerDisable(0)}
                  />
                  <div
                    id="bet-control-input-overlay"
                    className={style.inputOverlay}
                  >
                    <div>{formatNumberWithSpaces(bets[0].bid)}</div>
                    <div>₽</div>
                  </div>
                </div>
                <div className={style.buttonWrapper}>
                  <button
                    className={style.button}
                    id="bet-control-plus"
                    onClick={() => addBid(10, 0)}
                    disabled={isControllerDisable(0)}
                  >
                    <div
                      className={clsx(style.buttonContent, style.buttonStyles)}
                    >
                      <img src="https://lucky-jet.gamedev-atech.cc/assets/media/02f73e3c8eee420b71b6f7c6b409b20d.svg" />
                    </div>
                  </button>
                </div>
              </div>
              <div id="bet-control-actions" className={style.actions}>
                {[50, 100, 200, 500].map((amount) => (
                  <div className={style.actionButtonWrapper} key={amount}>
                    <button
                      key={amount}
                      className={style.actionButton}
                      onClick={() => addBid(amount, 0)}
                      disabled={isControllerDisable(0)}
                    >
                      <div className={clsx(style.amount, style.buttonStyles)}>
                        +{amount}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              id="make-bet-button"
              type="button"
              className={style.makeBetButton}
              disabled={bets[0].status === "wait"}
              onClick={() => handleBet(0)}
            >
              <div
                className={clsx(
                  style.makeBetButtonContent,
                  style[bets[0].status]
                )}
              >
                {betButtonTexts[bets[0].status]}
              </div>
            </button>
          </div>
        </div>
        {/* <div className={style.bet}>
          <div id="slot-header" className={style.header}>
            <div
              className={clsx(style.autoBet, {
                [style.disabled]: isAutoBidDisabled,
              })}
            >
              <Checkbox
                checked={bets[0].autoBid}
                setChecked={(checked) => changeAutoBid(checked, 0)}
              />
              <div
                onClick={() => changeAutoBid(!bets[0].autoBid, 0)}
                className={style.checkboxLabel}
              >
                Автоставка
              </div>
            </div>
            <div
              className={clsx(style.autoOutput, {
                [style.disabled]: isAutoOutputDisabled,
              })}
            >
              <Checkbox
                checked={bets[0].autoOutput}
                setChecked={(checked) => changeAutoOutput(checked, 0)}
              />
              <div
                onClick={() => changeAutoOutput(!bets[0].autoOutput, 0)}
                className={style.checkboxLabel}
              >
                Автовывод
              </div>
            </div>
            <div className={clsx(style.firstOutputCoefficientWrapper)}>
              <input
                id="coef-input"
                type="text"
                className={clsx(style.firstOutputCoefficientIput, {
                  [style.disable]: bets[0].autoOutput,
                })}
                {...register("autoFirstOutputCoefficient")}
                onChange={(e) => changeAutoOutputCoefficient(e.target.value, 0)}
                onBlur={blurAutoOutputCoefficient}
                disabled={bets[0].autoOutput}
              />
              <div
                className={clsx(style.firstOutputCoefficientValue, {
                  [style.disable]: bets[0].autoOutput,
                })}
              >
                <div>x</div>
                <div>{bets[0].autoOutputCoefficent.toFixed(2)}</div>
              </div>
            </div>
          </div>
          <div className={style.betAmountController}>
            <div className={style.controllerWrapper}>
              <div className={style.betControl}>
                <div className={style.buttonWrapper}>
                  <button
                    className={style.button}
                    id="bet-control-minus"
                    onClick={() => removeBid(10, 0)}
                  >
                    <div
                      className={clsx(style.buttonContent, style.buttonStyles)}
                    >
                      <img src="https://lucky-jet.gamedev-atech.cc/assets/media/97de90559589bee034295a9d2e9e626a.svg" />
                    </div>
                  </button>
                </div>
                <div className={style.inputWrapper}>
                  <input
                    id="bet-amount-input"
                    className={style.input}
                    {...register("firstBid")}
                    onChange={(e) => changeBid(e.target.value, 0)}
                  />
                  <div
                    id="bet-control-input-overlay"
                    className={style.inputOverlay}
                  >
                    <div>{formatNumberWithSpaces(bets[0].bid)}</div>
                    <div>₽</div>
                  </div>
                </div>
                <div className={style.buttonWrapper}>
                  <button
                    className={style.button}
                    id="bet-control-plus"
                    onClick={() => addBid(10, 0)}
                  >
                    <div
                      className={clsx(style.buttonContent, style.buttonStyles)}
                    >
                      <img src="https://lucky-jet.gamedev-atech.cc/assets/media/02f73e3c8eee420b71b6f7c6b409b20d.svg" />
                    </div>
                  </button>
                </div>
              </div>
              <div id="bet-control-actions" className={style.actions}>
                {[50, 100, 200, 500].map((amount) => (
                  <div className={style.actionButtonWrapper} key={amount}>
                    <button
                      key={amount}
                      className={style.actionButton}
                      onClick={() => addBid(amount, 0)}
                    >
                      <div className={clsx(style.amount, style.buttonStyles)}>
                        +{amount}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              id="make-bet-button"
              type="button"
              className={style.makeBetButton}
              disabled={bets[0].status === "wait"}
              onClick={() => changeBetStatus(0)}
            >
              <div
                className={clsx(
                  style.makeBetButtonContent,
                  style[bets[0].status]
                )}
              >
                {betButtonTexts[bets[0].status]}
              </div>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ButtonGameBlock;
