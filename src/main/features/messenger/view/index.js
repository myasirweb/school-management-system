import React from "react";
import { Routes, Route } from "react-router-dom";
import MessengerPage from "./Page";

const MessengerIndex = () => {
  return (
    <Routes>
      <Route index element={<MessengerPage />} />
    </Routes>
  );
};

export default MessengerIndex;
