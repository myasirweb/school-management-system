import React from "react";
import { Routes, Route } from "react-router-dom";
import MailBoxPage from "./Page";

const MailBoxIndex = () => {
  return (
    <Routes>
      <Route index element={<MailBoxPage />} />
    </Routes>
  );
};

export default MailBoxIndex;
