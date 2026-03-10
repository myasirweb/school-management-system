import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentPage from "./Page";
import StudentDetailPage from "./Page/Detail/studentDetailPage";

const StudentIndex = () => {
  return (
    <Routes>
      <Route index element={<StudentPage />} />
      <Route path=":studentId" element={<StudentDetailPage />} />
    </Routes>
  );
};


export default StudentIndex;
