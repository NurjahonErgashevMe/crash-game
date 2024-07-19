import { FC, useEffect, useState } from "react";
import styles from "./MainGameBlock.module.css";
import { motion } from "framer-motion";

const MainGameBlock: FC = () => {
  const [counter, setCounter] = useState(1.0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (counter < 2.7) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = Math.min(prevCounter + 0.01, 2.7);
          if (newCounter === 2.7) {
            setGameOver(true);
          }
          return parseFloat(newCounter.toFixed(2));
        });
      }, 30); // Adjust the interval as needed
    } else if (interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        {gameOver ? (
          <div className={styles.gameOver}>Game Over</div>
        ) : (
          <>
            <div className={styles.count}>
              x<span>{counter.toFixed(2)}</span>
            </div>
            <motion.div
              className={styles.boyWrapper}
              animate={{
                x: counter * 380,
                y: -(counter * 130),
                rotate: 1,
              }}
              transition={{ type: "spring" }}
            >
              <img src="boy.webp" alt="boy" className={styles.boyImage} />
              <img src="fire.svg" alt="fire" className={styles.fireImage} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainGameBlock;
