import React, { useState } from 'react'
import FilterBar from '../../../../sharedComponents/filterbar/filterBar'
const TeacherFilterBar = ({ state, onChange }) => {
  const { search, segmentType } = state;

  return (
    <FilterBar
      searchValue={search}
      onSearchChange={(value) =>
        onChange({ ...state, search: value })
      }
      currentView={segmentType}
      onViewChange={(view) =>
        onChange({ ...state, segmentType: view })
      }
    />
  );
};

export default TeacherFilterBar
