import React from "react";
import { Routes, Route } from "react-router-dom";
import SchedulePage from "./Page";
import EventDetailPage from "./Page/Detail/eventDetailPage";

const ClassScheduleIndex = () => {
  return (
    <Routes>
      <Route index element={<SchedulePage />} />
      <Route path=":eventId" element={<EventDetailPage />} />
    </Routes>
  );
};

export default ClassScheduleIndex;
