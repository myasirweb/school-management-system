import FilterBar from "../../../../sharedComponents/filterbar/filterBar";
import { SegmentTypeEnum } from "../../../../sharedComponents/Segment/utils/enum";

const TABS = [
  { key: "myTasks",      label: "My Tasks", },
  { key: "assignedByMe", label: "Assigned By Me",},
  { key: "teamTasks",    label: "Team Tasks",},
];

const TasksFilterBar = ({
  activeTab,
  onTabChange,
  searchValue,
  onSearchChange,
  viewMode,
  onViewModeChange,
}) => {
  const currentView = viewMode === "list" ? SegmentTypeEnum.List : SegmentTypeEnum.Grid;

  return (
    <FilterBar
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      currentView={currentView}
      onViewChange={(v) => onViewModeChange(v === SegmentTypeEnum.List ? "list" : "grid")}
      showFilter
      onFilterClick={() => {}}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
};

export default TasksFilterBar;
