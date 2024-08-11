import { FC } from "react";
import style from "./Header.module.scss";

import Logo from "public/lucky.svg";
import VolumeIcon from "public/volume.svg";
import MusicIcon from "public/music.svg";
import CollectionIcon from "public/collection.svg";
import ChatIcon from "public/chat.svg";
import MoneyIcon from "public/money.svg";
import WhatIcon from "public/what.svg";
import { useAppSelector } from "@/hooks/redux";
import { formatNumberWithSpaces, formatStringWithSpaces } from "@/helpers/formatWithSpace";

const Header: FC = () => {
  const { balance } = useAppSelector((state) => state.balance);
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logo}>
          <Logo />
        </div>

        <div className={style.events}>
          <div className={style.one}>
            <div className={style.volume}>
              <VolumeIcon />
            </div>
            <div className={style.separator}></div> {/* Добавляем линию */}
            <div className={style.music}>
              <MusicIcon />
            </div>
          </div>

          <div className={style.two}>
            <div className={style.what}>
              <WhatIcon style={{ marginLeft: "-1px" }} />
              <p className={style.textW}>Как играть?</p>
            </div>
            <div className={style.separator}></div> {/* Добавляем линию */}
            <div className={style.money}>
              {/* <img src="/public/money.svg" />{" "} */}
              <MoneyIcon />
              <p className={style.text}>{formatStringWithSpaces(balance?.toFixed(2))} ₽</p>
            </div>
            <div className={style.separator}></div> {/* Добавляем линию */}
            <div className={style.collection}>
              <CollectionIcon />
            </div>
          </div>

          <div className={style.three}>
            <div className={style.chat}>
              <ChatIcon />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
