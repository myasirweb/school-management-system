import FilterBar from "../../../../sharedComponents/filterbar/filterBar";
import { SegmentTypeEnum } from "../../../../sharedComponents/Segment/utils/enum";

const TABS = [
  { key: "myBoards",  label: "My Boards",  badge: null },
  { key: "active",    label: "Active",     badge: null },
  { key: "archived",  label: "Archived",   badge: null },
  { key: "completed", label: "Completed",  badge: null },
];

const WorkBoardFilterBar = ({
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

export default WorkBoardFilterBar;
