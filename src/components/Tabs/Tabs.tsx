import { motion } from "framer-motion";
import { useState, FC } from "react";
import styles from "./Tabs.module.scss";
import clsx from "clsx";

export type Tab = { name: string; disabled?: boolean };

type Props = {
  tabs: Tab[];
  defaultTab: string;
};

const Tabs: FC<Props> = ({ defaultTab, tabs }) => {
  const [selected, setSelected] = useState<string>(defaultTab);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {tabs.map((tab) => (
          <Tab
            text={tab.name}
            disabled={!!tab.disabled}
            selected={selected === tab.name}
            setSelected={setSelected}
            key={tab.name}
          />
        ))}
      </div>
    </div>
  );
};

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
  disabled: boolean;
}

const Tab: FC<TabProps> = (props) => {
  const { text, selected, setSelected, disabled } = props;
  return (
    <button
      onClick={() => setSelected(text)}
      disabled={disabled}
      className={clsx(
        styles.button,
        selected ? styles.selected : styles.unselected,
        {
          [styles.disabled]: disabled,
        }
      )}
    >
      <span className={styles.zIndex}>{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className={styles.pillTab}
        ></motion.span>
      )}
    </button>
  );
};

export default Tabs;
