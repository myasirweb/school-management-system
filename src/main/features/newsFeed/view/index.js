import React from "react";
import { Routes, Route } from "react-router-dom";
import NewsFeedPage from "./Page";

const NewsFeedIndex = () => {
  return (
    <Routes>
      <Route index element={<NewsFeedPage />} />
    </Routes>
  );
};

export default NewsFeedIndex;
