import React, { useMemo } from "react";
import { TableContainer } from "../../../../sharedComponents/MainFlexContainer";
import { useDispatch, useSelector } from "react-redux";
import WarningHeader from "./header";
import {
  setActiveWarning,
  setActiveTab,
  setSearchQuery,
  setViewMode,
  toggleCreateDrawer,
  toggleDetailDrawer,
} from "../../store/warningsSlice";
import WarningsFilterBar from "./filterbar";
import SideDrawer from "../../../../sharedComponents/SharedDrawer";
import WarningsListing from "./Listing";
import WarningDetail from "./Detail";
import CreateWarning from "./Composer/CreateWarning";

const WarningsPage = () => {
  const dispatch = useDispatch();
  const {
    warnings,
    activeTab,
    viewMode,
    searchQuery,
    activeWarningId,
    isCreateDrawerOpen,
    isDetailDrawerOpen,
  } = useSelector((s) => s.warnings);

  const filtered = useMemo(() => {
    return warnings.filter((w) => {
      let matchTab = true;
      if (activeTab === "approvals") {
        matchTab = w.status === "Pending" || w.status === "In Process";
      } else if (activeTab === "my") {
        matchTab = w.status === "Approved" || w.status === "Declined";
      }

      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        w.recipientName.toLowerCase().includes(q) ||
        w.warningId.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        (w.warningTo?.name || "").toLowerCase().includes(q);

      return matchTab && matchSearch;
    });
  }, [warnings, activeTab, searchQuery]);

  const selectedWarning = warnings.find((w) => w.id === activeWarningId) || null;

  const handleCardClick = (id) => {
    dispatch(setActiveWarning(id));
    dispatch(toggleDetailDrawer(true));
  };

  return (
    <TableContainer>
      {/* Header */}
      <WarningHeader onCreateWarning={() => dispatch(toggleCreateDrawer(true))} />

      <WarningsFilterBar
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setActiveTab(tab))}
        searchValue={searchQuery}
        onSearchChange={(v) => dispatch(setSearchQuery(v))}
        viewMode={viewMode}
        onViewModeChange={(v) => dispatch(setViewMode(v))}
      />

      {/* body */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 0,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        <WarningsListing
          viewMode={viewMode}
          warnings={filtered}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Detail drawer */}
      <SideDrawer
        visible={isDetailDrawerOpen}
        onClose={() => dispatch(toggleDetailDrawer(false))}
        title="Warning Details"
        width={520}
      >
        <WarningDetail warning={selectedWarning} />
      </SideDrawer>

      {/* Create Warning drawer */}
      <SideDrawer
        visible={isCreateDrawerOpen}
        onClose={() => dispatch(toggleCreateDrawer(false))}
        title="Create Warning"
        width={480}
      >
        <CreateWarning />
      </SideDrawer>
    </TableContainer>
  );
};

export default WarningsPage;
