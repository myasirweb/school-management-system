import React from "react";
import { Routes, Route } from "react-router-dom";
import AssignCoursesPage from "./Page";
import AssignDetailPage from "./Page/Detail/assignDetailPage";

const AssignCoursesIndex = () => {
  return (
    <Routes>
      <Route index element={<AssignCoursesPage />} />
      <Route path=":assignId" element={<AssignDetailPage />} />
    </Routes>
  );
};

export default AssignCoursesIndex;
