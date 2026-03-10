import React from "react";
import { Routes, Route } from "react-router-dom";
import WarningsPage from "./Page";

const WarningsIndex = () => (
  <Routes>
    <Route index element={<WarningsPage />} />
  </Routes>
);

export default WarningsIndex;
