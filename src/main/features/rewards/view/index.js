import React from "react";
import { Routes, Route } from "react-router-dom";
import RewardsPage from "./Page";

const RewardsIndex = () => (
  <Routes>
    <Route index element={<RewardsPage />} />
  </Routes>
);

export default RewardsIndex;
