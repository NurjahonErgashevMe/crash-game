import style from "./ButtonGameBlock.module.css";

const ButtonGameBlock = () => {
  return (
    <div className={style.main}>
      <div className={style.stavka}>
        <div className={style.one}>
          <div className={style.back}>
            <div className={style.only}></div>
          </div>
          <p className={style.text}>Автоставка</p>
          <div className={style.back}>
            <div className={style.only}></div>
          </div>
          <p className={style.text}>Автовывод</p>

          <div className={style.keff}>
            <span className={style.x}>х</span> 2.00
          </div>
        </div>

        <div className={style.background}>
          <div className={style.flex}>
            <div className={style.number}>
              <div className={style.onein}>
                <div className={style.img}>
                  <img
                    style={{ width: "11px" }}
                    src="https://lucky-jet.gamedev-atech.cc/assets/media/97de90559589bee034295a9d2e9e626a.svg"
                    alt=""
                  />
                </div>
                <div className={style.input}>500 ₽</div>
                <div className={style.img}>
                  <img
                    style={{ width: "11px" }}
                    src="https://lucky-jet.gamedev-atech.cc/assets/media/02f73e3c8eee420b71b6f7c6b409b20d.svg"
                    alt=""
                  />
                </div>
              </div>
              <div className={style.twoin}>
                <div className={style.numback}>+50</div>
                <div className={style.numback}>+100</div>
                <div className={style.numback}>+200</div>
                <div className={style.numback}>+500</div>
              </div>
            </div>

            <div className={style.button}>
            <div className={style.stavkabtn}>CTABKA</div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.stavka}>
        <div className={style.one}>
          <div className={style.back}>
            <div className={style.only}></div>
          </div>
          <p className={style.text}>Автоставка</p>
          <div className={style.back}>
            <div className={style.only}></div>
          </div>
          <p className={style.text}>Автовывод</p>

          <div className={style.keff}>
            <span className={style.x}>х</span> 2.00
          </div>
        </div>

        <div className={style.background}>
          <div className={style.flex}>
            <div className={style.number}>
              <div className={style.onein}>
                <div className={style.img}>
                  <img
                    style={{ width: "11px" }}
                    src="https://lucky-jet.gamedev-atech.cc/assets/media/97de90559589bee034295a9d2e9e626a.svg"
                    alt=""
                  />
                </div>
                <div className={style.input}>20 ₽</div>
                <div className={style.img}>
                  <img
                    style={{ width: "11px" }}
                    src="https://lucky-jet.gamedev-atech.cc/assets/media/02f73e3c8eee420b71b6f7c6b409b20d.svg"
                    alt=""
                  />
                </div>
              </div>
              <div className={style.twoin}>
                <div className={style.numback}>+50</div>
                <div className={style.numback}>+100</div>
                <div className={style.numback}>+200</div>
                <div className={style.numback}>+500</div>
              </div>
            </div>

            <div className={style.buttonTWO}>
            <div className={style.stavkabtn}>CTABKA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonGameBlock;
