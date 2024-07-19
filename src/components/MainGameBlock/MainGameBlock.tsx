import { FC, useEffect, useState } from "react";
import styles from "./MainGameBlock.module.css";
import { motion } from "framer-motion";

const MainGameBlock: FC = () => {
  const [counter, setCounter] = useState(1.0);
  const [gameOver, setGameOver] = useState(false);
  const [countStopNumber, setCountStopNumber] = useState(3.1);
  const [imageStopNumber, setImageStopNumber] = useState(2.1);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (counter < countStopNumber && !gameOver) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = Math.min(prevCounter + 0.01, countStopNumber);
          if (newCounter >= countStopNumber - 0.01) {
            // Small threshold for precision issues
            setGameOver(true);
          }
          return parseFloat(newCounter.toFixed(2));
        });
      }, 30); // Adjust the interval as needed
    } else if (interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [counter, gameOver, countStopNumber]);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <>
          <div className={styles.count}>
            x<span>{counter.toFixed(2)}</span>
          </div>
          {gameOver ? (
            <>
              <br />
              <div className={styles.gameOver}>Game Over</div>
            </>
          ) : (
            <motion.div
              className={styles.boyWrapper}
              animate={{
                x:
                  imageStopNumber < counter
                    ? imageStopNumber * 380
                    : counter * 380,
                y:
                  imageStopNumber < counter
                    ? imageStopNumber * -130
                    : counter * -130,
                rotate: 1,
              }}
              transition={{ type: "spring" }}
            >
              <img src="boy.webp" alt="boy" className={styles.boyImage} />
              <img src="fire.svg" alt="fire" className={styles.fireImage} />
            </motion.div>
          )}
        </>
      </div>
    </div>
  );
};

export default MainGameBlock;
