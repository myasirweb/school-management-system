import { Route, Routes } from "react-router-dom";
import TasksPage from "./Page";

const TasksIndex = () => {
  return (
    <Routes>
      <Route index element={<TasksPage />} />
    </Routes>
  );
};

export default TasksIndex;
