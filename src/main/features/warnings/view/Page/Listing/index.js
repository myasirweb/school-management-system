import React from "react";
import WarningsGrid from "./Grid";
import WarningsTable from "./Table";

const WarningsListing = ({ viewMode, warnings, onCardClick }) => {
  if (viewMode === "list") {
    return <WarningsTable warnings={warnings} onView={onCardClick} />;
  }
  return <WarningsGrid warnings={warnings} onCardClick={onCardClick} />;
};

export default WarningsListing;
