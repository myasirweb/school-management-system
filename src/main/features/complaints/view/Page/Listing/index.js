import React from "react";
import ComplaintsGrid from "./Grid";
import ComplaintsTable from "./Table";

const ComplaintsListing = ({ viewMode, complaints, onCardClick }) => {
  if (viewMode === "list") {
    return <ComplaintsTable complaints={complaints} onView={onCardClick} />;
  }
  return <ComplaintsGrid complaints={complaints} onCardClick={onCardClick} />;
};

export default ComplaintsListing;
