import React from "react";
import { Routes, Route } from "react-router-dom";
import ComplaintsPage from "./Page";

const ComplaintsIndex = () => (
  <Routes>
    <Route index element={<ComplaintsPage />} />
  </Routes>
);

export default ComplaintsIndex;
