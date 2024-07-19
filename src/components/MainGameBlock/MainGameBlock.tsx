import { FC, useEffect, useState } from "react";
import styles from "./MainGameBlock.module.css";
import { motion } from "framer-motion";

const MainGameBlock: FC = () => {
  const [counter, setCounter] = useState(1.0);
  const [gameOver, setGameOver] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [countStopNumber, setCountStopNumber] = useState(1.5);
  const [imageStopNumber, setImageStopNumber] = useState(2.1);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (counter < countStopNumber && !gameOver) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = parseFloat((prevCounter + 0.01).toFixed(2));
          if (newCounter >= countStopNumber) {
            setGameOver(true);
          }
          return newCounter;
        });
      }, 30); // Adjust the interval as needed
    } else if (interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [counter, gameOver, countStopNumber]);

  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        setShowGameOver(true);
      }, 300); // 300ms delay before showing game over
      return () => clearTimeout(timer);
    }
  }, [gameOver]);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <>
          <div className={styles.count}>
            x<span>{counter.toFixed(2)}</span>
          </div>
          {showGameOver ? (
            <>
              <br />
              <div className={styles.gameOver}>Game Over</div>
            </>
          ) : (
            <motion.div
              className={styles.boyWrapper}
              animate={{
                x: gameOver
                  ? imageStopNumber * 380 + 1000
                  : imageStopNumber < counter
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
