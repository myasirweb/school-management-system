import { Route, Routes } from "react-router-dom";
import PagesPage from "./Page";

const PagesIndex = () => {
  return (
    <Routes>
      <Route index element={<PagesPage />} />
    </Routes>
  );
};

export default PagesIndex;
