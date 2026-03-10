import { Route, Routes } from "react-router-dom";
import GroupsPage from "./Page";

const GroupsIndex = () => {
  return (
    <Routes>
      <Route index element={<GroupsPage />} />
    </Routes>
  );
};

export default GroupsIndex;
