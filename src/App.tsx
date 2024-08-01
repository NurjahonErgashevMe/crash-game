import { FC } from "react";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

const App: FC = () => {
  return (
    <div>
      <Header />
      <MainContent />
    </div>
  );
};

export default App;
