import { Route, Routes } from "react-router-dom";
import ProjectsPage from "./Page";

const ProjectsIndex = () => {
  return (
    <Routes>
      <Route index element={<ProjectsPage />} />
    </Routes>
  );
};

export default ProjectsIndex;
