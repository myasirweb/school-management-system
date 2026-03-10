import FilterBar from "../../../../sharedComponents/filterbar/filterBar";
import { SegmentTypeEnum } from "../../../../sharedComponents/Segment/utils/enum";

const TABS = [
  { key: "myProjects", label: "My Projects", badge: null },
  { key: "active",     label: "Active",      badge: 2    },
  { key: "onHold",     label: "On Hold",     badge: null },
  { key: "completed",  label: "Completed",   badge: null },
];

const ProjectsFilterBar = ({
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

export default ProjectsFilterBar;
