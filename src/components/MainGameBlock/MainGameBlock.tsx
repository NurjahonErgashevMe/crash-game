import { FC, useEffect, useState } from "react";
import styles from "./MainGameBlock.module.css";
import { motion } from "framer-motion";
import { Loader } from "../Loader/Loader";

const MainGameBlock: FC = () => {
  const [counter, setCounter] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [countStopNumber, setCountStopNumber] = useState(3.0);
  const [imageStopNumber, setImageStopNumber] = useState(2.7);
  const [linePercentage, setLinePercentage] = useState(0);

  useEffect(() => {
    // Hide loader after 5 seconds
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
    }, 0);

    return () => clearTimeout(loaderTimer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!showLoader) {
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

      // Update linePercentage based on counter
      setLinePercentage(counter * 33); // Example calculation, adjust as needed
    }

    return () => clearInterval(interval);
  }, [counter, gameOver, countStopNumber, showLoader]);

  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        setShowGameOver(true);
      }, 300); // 300ms delay before showing game over
      return () => clearTimeout(timer);
    }
  }, [gameOver]);

  return (
    <>
      {showLoader ? (
        <Loader duration={5} />
      ) : (
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
                  <img
                    src="graphic.svg"
                    alt="curved line"
                    className={styles.graphicImageOver}
                    style={{
                      clipPath: `polygon(0 0, ${linePercentage}% 0, ${linePercentage}% 100%, 0% 100%)`,
                    }}
                  />
                </>
              ) : (
                <>
                  <motion.div
                    className={styles.boyWrapper}
                    animate={{
                      x: gameOver
                        ? imageStopNumber * 420 + 1000
                        : imageStopNumber < counter
                        ? imageStopNumber * 420
                        : counter * 420,
                      y:
                        counter < 1
                          ? 0
                          : counter < 1.1
                          ? (counter - 1) * -170
                          : counter < 1.2
                          ? (counter - 1) * -180
                          : counter < 1.3
                          ? (counter - 1) * -190
                          : counter < 1.4
                          ? (counter - 1) * -200
                          : counter < 1.5
                          ? (counter - 1) * -210
                          : counter < 1.6
                          ? (counter - 1) * -220
                          : counter < 1.7
                          ? (counter - 1) * -230
                          : counter < 1.8
                          ? (counter - 1) * -240
                          : counter < 1.9
                          ? (counter - 1) * -250
                          : counter < 2.0
                          ? (counter - 1) * -260
                          : counter < 2.1
                          ? (counter - 1) * -270
                          : counter < 2.2
                          ? (counter - 1) * -280
                          : counter < 2.3
                          ? (counter - 1) * -290
                          : counter < 2.4
                          ? (counter - 1) * -300
                          : imageStopNumber < counter
                          ? imageStopNumber * -170
                          : counter * -170,
                      rotate: 1,
                    }}
                    transition={{ type: "spring" }}
                  >
                    <img src="boy.webp" alt="boy" className={styles.boyImage} />
                    <img
                      src="fire.svg"
                      alt="fire"
                      className={styles.fireImage}
                    />
                  </motion.div>
                  <img
                    src="graphic.svg"
                    alt="curved line"
                    className={styles.graphicImage}
                    style={{
                      opacity: 1,
                      clipPath: `polygon(0 0, ${linePercentage}% 0, ${linePercentage}% 100%, 0% 100%)`,
                    }}
                  />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default MainGameBlock;
