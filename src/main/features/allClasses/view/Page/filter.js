import FilterBar from "../../../../sharedComponents/filterbar/filterBar";

const ClassFilterBar = ({ state, onChange }) => {
  return (
    <FilterBar
      searchValue={state.search}
      onSearchChange={(value) => onChange({ ...state, search: value })}
      currentView={state.segmentType}
      onViewChange={(view) => onChange({ ...state, segmentType: view })}
    />
  );
};

export default ClassFilterBar;
