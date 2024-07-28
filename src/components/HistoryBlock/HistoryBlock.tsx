import { FC } from "react";
import Tabs, { Tab } from "../Tabs/Tabs";

import style from "./HistoryBlock.module.scss";
import { betsHistory, cashOutHistory, ICashOut } from "@/mocks/betHistory";
import clsx from "clsx";
import { getCoefficentColor } from "@/helpers/getCoefficentColor";

const tabs: Tab[] = [
  { name: "Все", disabled: true },
  { name: "Мои" },
  { name: "Топ", disabled: true },
];

const isBetDone = (user_id: string): ICashOut | undefined =>
  cashOutHistory.find((cash) => cash.thanus_user_id === user_id);

const HistoryBlock: FC = () => {
  return (
    <section className={style.section}>
      <div className={style.container}>
        <div className={style.tabsWrapper}>
          <div className={style.tabs}>
            <Tabs tabs={tabs} defaultTab="Мои" />
          </div>
        </div>
        <div className={style.history}>
          {betsHistory.map((bet) => {
            const isDone = isBetDone(bet.thanus_user_id);
            return (
              <div
                className={clsx(style.bet, {
                  [style.betDone]: !!isDone,
                })}
                key={bet.event_id}
              >
                <b className={style.betSize}>{bet.bet_size.toFixed(2)}₽</b>
                <div
                  className={style.coefficient}
                  style={{
                    backgroundColor: isDone
                      ? getCoefficentColor(isDone.coefficient)
                      : "transparent",
                  }}
                >
                  {isDone ? `${isDone.coefficient}x` : "-"}
                </div>
                <div
                  className={clsx(style.prize, {
                    [style.done]: isDone,
                  })}
                >
                  {isDone ? `${isDone.prize_size.toFixed(2)}₽` : "-"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HistoryBlock;
