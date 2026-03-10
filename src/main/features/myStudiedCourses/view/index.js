import React from "react";
import { Routes, Route } from "react-router-dom";
import CourseListPage from "./Page";
import CourseDetailPage from "./Page/Detail/courseDetailPage";

const MyStudiedCoursesIndex = () => {
  return (
    <Routes>
      <Route index element={<CourseListPage />} />
      <Route path=":courseId" element={<CourseDetailPage />} />
    </Routes>
  );
};

export default MyStudiedCoursesIndex;
