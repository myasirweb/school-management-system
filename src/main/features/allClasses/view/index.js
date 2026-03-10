import React from "react";
import { Routes, Route } from "react-router-dom";
import ClassListPage from "./Page";
import ClassDetailPage from "./Page/Detail/classDetailPage";

const AllClassesIndex = () => {
  return (
    <Routes>
      <Route index element={<ClassListPage />} />
      <Route path=":classId" element={<ClassDetailPage />} />
    </Routes>
  );
};

export default AllClassesIndex;
