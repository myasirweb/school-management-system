import { Route, Routes } from "react-router-dom";
import WorkBoardPage from "./Page";

const WorkBoardIndex = () => {
  return (
    <Routes>
      <Route index element={<WorkBoardPage />} />
    </Routes>
  );
};

export default WorkBoardIndex;
