import FilterBar from "../../../../sharedComponents/filterbar/filterBar";
import { SegmentTypeEnum } from "../../../../sharedComponents/Segment/utils/enum";

const TABS = [
  { key: "myGroups",    label: "My Groups",    badge: null },
  { key: "public",      label: "Public",       badge: null },
  { key: "private",     label: "Private",      badge: null },
  { key: "classGroups", label: "Class Groups", badge: null },
];

const GroupsFilterBar = ({
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

export default GroupsFilterBar;
