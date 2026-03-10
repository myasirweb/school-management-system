import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Page";

const LoginIndex = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
    </Routes>
  );
};

export default LoginIndex;
