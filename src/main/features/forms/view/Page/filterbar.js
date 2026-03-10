import FilterBar from "../../../../sharedComponents/filterbar/filterBar";
import { SegmentTypeEnum } from "../../../../sharedComponents/Segment/utils/enum";

const TABS = [
  { key: "forms",        label: "All Forms",       badge: null },
  { key: "createdByMe",  label: "Created By Me",   badge: null },
  { key: "forApproval",  label: "For Approval",    badge: null },
  { key: "forReview",    label: "For Review",       badge: null },
];

const FormsFilterBar = ({
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

export default FormsFilterBar;
