import { FC, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import clsx from "clsx";
import style from "./Alert.module.scss";

const Alert: FC = () => {
  const { alert } = useAppSelector((state) => state.alert);
  const [isOpen, setIsOpen] = useState(false);

  const handleAlert = () => {
    setIsOpen(true);

    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 5000); // 5 секунд

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (alert) {
      const cleanup = handleAlert();
      return cleanup;
    }
  }, [alert]);

  return (
    <div
      className={clsx(style.alert, {
        [style.open]: isOpen,
      })}
    >
      <div
        id="win-notify"
        className={style.notify}
        onClick={() => setIsOpen(false)}
      >
        {!alert ? (
          <></>
        ) : (
          <>
            <div className={style.coefficient}>
              <span>Вы успели забрать!</span>
              <h2>x{alert.coefficent.toFixed(2)}</h2>
            </div>
            <div className={style.won}>
              <h2>{alert.won.toFixed(2)}&nbsp;₽</h2>
              <span>Ваш выигрыш</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Alert;
