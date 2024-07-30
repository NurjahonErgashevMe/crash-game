import { FC } from "react";
import clsx from "clsx";

import styles from "./HistoryGameBlock.module.scss";

import WatchIcon from "public/watch.svg";
import XIcon from "public/x.svg";

import { getCoefficentColor } from "@/helpers/getCoefficentColor";
import { useAppSelector } from "@/hooks/redux";

const HistoryGameBlock: FC = () => {
  const { coefficients } = useAppSelector((state) => state.coefficentHistory);
  // const [viewHistory, setViewHistory] = useState<boolean>(false);

  // const toggleViewHistory = () => {
  //   setViewHistory((prev) => !prev);
  // };
  return (
    <section
      className={clsx(styles.section, {
        [styles.active]: false,
      })}
    >
      <div className={styles.historyBg} />
      {/* <div className={styles.historyHeader}>
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
      </div> */}
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
        // onClick={toggleViewHistory}
      >
        <WatchIcon width={15} height={15} fill="#DFE5F2" />
      </button>
    </section>
  );
};

export default HistoryGameBlock;
