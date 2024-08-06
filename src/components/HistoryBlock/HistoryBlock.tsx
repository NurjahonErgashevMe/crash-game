import { FC } from "react";
import Tabs, { Tab } from "../Tabs/Tabs";

import style from "./HistoryBlock.module.scss";
// import { betsHistory, cashOutHistory, ICashOut } from "@/mocks/betHistory";
import clsx from "clsx";
import { getCoefficentColor } from "@/helpers/getCoefficentColor";
import { useAppSelector } from "@/hooks/redux";

const tabs: Tab[] = [
  { name: "Все", disabled: true },
  { name: "Мои" },
  { name: "Топ", disabled: true },
];

// const isBetDone = (user_id: string): ICashOut | undefined =>
//   cashOutHistory.find((cash) => cash.thanus_user_id === user_id);

const HistoryBlock: FC = () => {
  const { bet } = useAppSelector((state) => state.betHistory);

  return (
    <section className={style.section}>
      <div className={style.container}>
        <div className={style.tabsWrapper}>
          <div className={style.tabs}>
            <Tabs tabs={tabs} defaultTab="Мои" />
          </div>
        </div>
        <div className={style.history}>
          {bet.slice(0, 10).map((bet, index) => {
            const isDone = !!bet.get;
            return (
              <div
                className={clsx(style.bet, {
                  [style.betDone]: !!isDone,
                })}
                key={index}
              >
                <b className={style.betSize}>{bet.put.toFixed(2)}₽</b>
                <div
                  className={style.coefficient}
                  style={{
                    backgroundColor: isDone
                      ? getCoefficentColor(bet.coefficent)
                      : "transparent",
                  }}
                >
                  {isDone ? `${bet.coefficent}x` : "-"}
                </div>
                <div
                  className={clsx(style.prize, {
                    [style.done]: isDone,
                  })}
                >
                  {isDone ? `${bet.get.toFixed(2)}₽` : "-"}
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
