import React from 'react'
import LeavesGrid from './Grid';
import LeavesTable from './Table';

const LeavesListing = ({ viewMode, leaves, onCardClick }) => {
 if (viewMode === "list") {
    return <LeavesTable leaves={leaves} onView={onCardClick} />;
  }
  return <LeavesGrid leaves={leaves} onCardClick={onCardClick} />;
};

export default LeavesListing
