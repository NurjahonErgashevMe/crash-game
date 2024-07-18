import { FC } from "react";
import styles from "./MainGameBlock.module.css";
import { Loader } from "../Loader/Loader";

const MainGameBlock: FC = () => {
  return (
    <div className={styles.main}>
      {/* <Loader /> */}
      <>
        <div className="boy-wrapper">
          <img src="fire.svg" className="fire" />
          <img
            src="boy.webp"
            className="boy"
          />
        </div>
      </>
    </div>
  );
};

export default MainGameBlock;
