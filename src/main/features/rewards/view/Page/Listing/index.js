import React from "react";
import RewardsGrid from "./Grid";
import RewardsTable from "./Table";

const RewardsListing = ({ viewMode, rewards, onCardClick }) => {
  if (viewMode === "list") {
    return <RewardsTable rewards={rewards} onView={onCardClick} />;
  }
  return <RewardsGrid rewards={rewards} onCardClick={onCardClick} />;
};

export default RewardsListing;
