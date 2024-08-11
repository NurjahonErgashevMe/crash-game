import { FC } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

export type TLuckyJet = {
  start: () => void;
  end: () => void;
  updateSizes: () => void;
};

const App: FC = () => {
  return (
    <div className="container">
      <Header />
      <MainContent />
    </div>
  );
};

export default App;
