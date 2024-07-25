import { FC, useState } from "react";
import clsx from "clsx";

import styles from "./HistoryGameBlock.module.scss";

import WatchIcon from "public/watch.svg";
import XIcon from "public/x.svg";

type Props = {
  coefficients: number[];
};
enum Colors {
  low = "rgb(62, 91, 194)",
  medium = "rgb(117, 62, 194)",
  large = "rgb(222, 139, 3)",
}

const getCoefficentColor = (coefficient: number) =>
  coefficient <= 2
    ? Colors["low"]
    : coefficient >= 10
    ? Colors["large"]
    : Colors["medium"];

const HistoryGameBlock: FC<Props> = ({ coefficients }) => {
  const [viewHistory, setViewHistory] = useState<boolean>(false);

  const toggleViewHistory = () => {
    setViewHistory((prev) => !prev);
  };
  return (
    <section
      className={clsx(styles.section, {
        [styles.active]: viewHistory,
      })}
    >
      <div className={styles.historyBg} />
      <div className={styles.historyHeader}>
        <div className={styles.historyHeaderContent}>
          <div className={styles.historyHeaderLeft}>
            <i className="fa-solid fa-clock"></i>
            HISTORY OF ROUNDS
          </div>
          <div className={styles.historyHeaderRight}>
            <button
              className={styles.headerCloseBtn}
              onClick={toggleViewHistory}
            >
              <XIcon width={15} height={15} fill="#DE8B03" />
            </button>
          </div>
        </div>
      </div>
      <div id="coefficients" className={styles.historyContent}>
        {coefficients?.map((coefficient, index) => (
          <div
            className={styles.coefficient}
            key={index}
            style={{
              background: getCoefficentColor(coefficient),
            }}
          >
            {coefficient.toFixed(2)}x
          </div>
        ))}
      </div>
      <button
        className={styles.allCoefToggleButton}
        onClick={toggleViewHistory}
      >
        <WatchIcon width={15} height={15} fill="#DFE5F2" />
      </button>
    </section>
  );
};

export default HistoryGameBlock;
