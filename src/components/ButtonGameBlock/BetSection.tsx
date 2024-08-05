import { FC } from "react";
import Checkbox from "../Checkbox/Checkbox";
import { TBetButtonsIndex } from "@/store/reducers/BetSlice";
import style from "./ButtonGameBlock.module.scss";
import clsx from "clsx";
import { formatNumberWithSpaces } from "@/helpers/formatWithSpace";
import { TBet, TBetStatus } from "@/types/types";

const betButtonTexts: Record<TBetStatus, string> = {
  bid: "СТАВКА",
  cancel: "ОТМЕНИТЬ",
  take: "ЗАБРАТЬ",
  wait: "ОЖИДАНИЕ",
};

interface BetSectionProps {
  bets: Record<number, TBet>;
  state?: string;
  dispatch?: any;
  register?: any;
  setValue?: any;
  getValues?: any;
  betIndex: TBetButtonsIndex;
  changeAutoOutputCoefficient: (value: string, index: TBetButtonsIndex) => void;
  blurAutoOutputCoefficient: (e: any, index: TBetButtonsIndex) => void;
  changeAutoBid: (checked: boolean, index: TBetButtonsIndex) => void;
  changeAutoOutput: (checked: boolean, index: TBetButtonsIndex) => void;
  removeBid: (number: number, index: TBetButtonsIndex) => void;
  addBid: (number: number, index: TBetButtonsIndex) => void;
  handleBet: (index: TBetButtonsIndex) => void;
  changeBid: (value: string, index: TBetButtonsIndex) => void;
}

const BetSection: FC<BetSectionProps> = ({
  bets,
  state,
  dispatch,
  register,
  setValue,
  getValues,
  changeAutoOutputCoefficient,
  blurAutoOutputCoefficient,
  changeAutoBid,
  changeAutoOutput,
  removeBid,
  addBid,
  handleBet,
  betIndex,
  changeBid,
}) => {
  const isAutoBidDisabled = state === "waiting";
  const isAutoOutputDisabled = state === "flying";

  const isControllerDisable = (index: TBetButtonsIndex) =>
    bets[index].moneyBetted && bets[index].status !== "bid";

  return (
    <div className={style.bet}>
      <div id="slot-header" className={style.header}>
        <div
          className={clsx(style.autoBet, {
            [style.disabled]: isAutoBidDisabled,
          })}
        >
          <Checkbox
            checked={bets[betIndex].autoBid}
            setChecked={(checked) => changeAutoBid(checked, betIndex)}
          />
          <div
            onClick={() => changeAutoBid(!bets[betIndex].autoBid, betIndex)}
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
            checked={bets[betIndex].autoOutput}
            setChecked={(checked) => changeAutoOutput(checked, betIndex)}
          />
          <div
            onClick={() =>
              changeAutoOutput(!bets[betIndex].autoOutput, betIndex)
            }
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
              [style.disable]: bets[betIndex].autoOutput,
            })}
            {...register(
              !betIndex
                ? "autoFirstOutputCoefficient"
                : "autoSecondOutputCoefficient"
            )}
            onChange={(e) =>
              changeAutoOutputCoefficient(e.target.value, betIndex)
            }
            onBlur={(e) => blurAutoOutputCoefficient(e, betIndex)}
            disabled={bets[betIndex].autoOutput}
          />
          <div
            className={clsx(style.firstOutputCoefficientValue, {
              [style.disable]: bets[betIndex].autoOutput,
            })}
          >
            <div>x</div>
            <div>{bets[betIndex].autoOutputCoefficent.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div className={style.betAmountController}>
        <div
          className={clsx(style.controllerWrapper, {
            [style.disable]: isControllerDisable(betIndex),
          })}
        >
          <div className={style.betControl}>
            <div className={style.buttonWrapper}>
              <button
                className={style.button}
                id="bet-control-minus"
                onClick={() => removeBid(10, betIndex)}
                disabled={isControllerDisable(betIndex)}
              >
                <div className={clsx(style.buttonContent, style.buttonStyles)}>
                  <img src="https://lucky-jet.gamedev-atech.cc/assets/media/97de90559589bee034295a9d2e9e626a.svg" />
                </div>
              </button>
            </div>
            <div className={style.inputWrapper}>
              <input
                id="bet-amount-input"
                className={style.input}
                {...register(!betIndex ? "firstBid" : "secondBid")}
                onChange={(e) => changeBid(e.target.value, betIndex)}
                disabled={isControllerDisable(betIndex)}
              />
              <div
                id="bet-control-input-overlay"
                className={style.inputOverlay}
              >
                <div>{formatNumberWithSpaces(bets[betIndex].bid)}</div>
                <div>₽</div>
              </div>
            </div>
            <div className={style.buttonWrapper}>
              <button
                className={style.button}
                id="bet-control-plus"
                onClick={() => addBid(10, betIndex)}
                disabled={isControllerDisable(betIndex)}
              >
                <div className={clsx(style.buttonContent, style.buttonStyles)}>
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
                  onClick={() => addBid(amount, betIndex)}
                  disabled={isControllerDisable(betIndex)}
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
          className={clsx(style.makeBetButton, style[bets[betIndex].status])}
          disabled={bets[betIndex].status === "wait"}
          onClick={() => handleBet(betIndex)}
        >
          <div className={style.makeBetButtonContent}>
            {betButtonTexts[bets[betIndex].status]}
          </div>
        </button>
      </div>
    </div>
  );
};

export default BetSection;
