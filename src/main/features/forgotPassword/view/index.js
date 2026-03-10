import React from "react";
import { Routes, Route } from "react-router-dom";
import ForgotPasswordPage from "./Page";

const ForgotPasswordIndex = () => {
  return (
    <Routes>
      <Route index element={<ForgotPasswordPage />} />
    </Routes>
  );
};

export default ForgotPasswordIndex;
