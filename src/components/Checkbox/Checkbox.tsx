import { FC } from "react";

import styles from "./Checkbox.module.scss";

import clsx from "clsx";

type Props = {
  disable?: boolean;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  id?: string;
  className?: string;
};

const Checkbox: FC<Props> = (props) => {
  const { checked, setChecked, className, id } = props;
  const toggle = () => {
    setChecked(!checked);
  };
  return (
    <div
      id={id}
      className={clsx(styles.checkbox, className, {
        [styles.checked]: checked,
      })}
      onClick={toggle}
    ></div>
  );
};

export default Checkbox;
