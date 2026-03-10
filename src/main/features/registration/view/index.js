import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./Page";

const RegistrationIndex = () => {
  return (
    <Routes>
      <Route index element={<RegistrationPage />} />
    </Routes>
  );
};

export default RegistrationIndex;
