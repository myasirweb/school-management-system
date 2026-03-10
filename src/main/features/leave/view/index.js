import React from "react";
import { Route, Routes } from "react-router-dom";
import LeavePage from "./Page";

const LeaveIndex = () => {
  return (
    <Routes>
      <Route index element={<LeavePage />} />
    </Routes>
  );
};

export default LeaveIndex;
