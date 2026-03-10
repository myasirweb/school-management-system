import FilterBar from "../../../../sharedComponents/filterbar/filterBar";

const StudentFilterBar = ({ state, onChange }) => {
  return (
    <FilterBar
      searchValue={state.search}
      onSearchChange={(value) =>
        onChange({ ...state, search: value })
      }
      currentView={state.segmentType}
      onViewChange={(view) =>
        onChange({ ...state, segmentType: view })
      }
    />
  );
};

export default StudentFilterBar;
