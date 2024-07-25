import style from "./Header.module.scss";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logo}>
          <img src="/public/lucky.svg" />
        </div>

        <div className={style.events}>
          <div className={style.one}>
            <div className={style.volume}>
              <img src="/public/volume.svg" />
            </div>
            <div className={style.separator}></div> {/* Добавляем линию */}
            <div className={style.music}>
              <img src="/public/music.svg" />
            </div>
          </div>

          <div className={style.two}>
            <div className={style.what}>
              <img style={{ marginLeft: "-1px" }} src="/public/what.svg" />{" "}
              <p className={style.textW}>Как играть?</p>
            </div>
            <div className={style.separator}></div> {/* Добавляем линию */}
            <div className={style.money}>
              <img src="/public/money.svg" />{" "}
              <p className={style.text}>125 720.46 ₽</p>
            </div>
            <div className={style.separator}></div> {/* Добавляем линию */}
            <div className={style.collection}>
              <img src="/public/collection.svg" />
            </div>
          </div>

          <div className={style.three}>
            <div className={style.chat}>
              <img src="/public/chat.svg" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
