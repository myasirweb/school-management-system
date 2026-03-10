import React, { useMemo } from "react";
import { TableContainer } from "../../../../sharedComponents/MainFlexContainer";
import { useDispatch, useSelector } from "react-redux";
import WorkBoardHeader from "./header";
import {
  setActiveTab,
  setSearchQuery,
  setViewMode,
  toggleCreateDrawer,
} from "../../store/workBoardSlice";
import WorkBoardFilterBar from "./filterbar";
import SideDrawer from "../../../../sharedComponents/SharedDrawer";
import BoardsListing from "./Listing";
import CreateBoard from "./composer/CreateBoard";

const WorkBoardPage = () => {
  const dispatch = useDispatch();
  const {
    boards,
    activeTab,
    viewMode,
    searchQuery,
    isCreateDrawerOpen,
  } = useSelector((s) => s.workBoard);

  const filtered = useMemo(() => {
    return boards.filter((b) => {
      let matchTab = true;
      if (activeTab === "active") {
        matchTab = b.status === "Active";
      } else if (activeTab === "archived") {
        matchTab = b.status === "Archived";
      } else if (activeTab === "completed") {
        matchTab = b.status === "Completed";
      }

      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.boardId.toLowerCase().includes(q) ||
        b.code.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        (b.adminUser?.name || "").toLowerCase().includes(q);

      return matchTab && matchSearch;
    });
  }, [boards, activeTab, searchQuery]);

  return (
    <TableContainer>
      {/* Header */}
      <WorkBoardHeader onCreateBoard={() => dispatch(toggleCreateDrawer(true))} />

      <WorkBoardFilterBar
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setActiveTab(tab))}
        searchValue={searchQuery}
        onSearchChange={(v) => dispatch(setSearchQuery(v))}
        viewMode={viewMode}
        onViewModeChange={(v) => dispatch(setViewMode(v))}
      />

      {/* Body */}
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
        <BoardsListing viewMode={viewMode} boards={filtered} />
      </div>

      {/* Create Board drawer */}
      <SideDrawer
        visible={isCreateDrawerOpen}
        onClose={() => dispatch(toggleCreateDrawer(false))}
        title="Create Board"
        width={520}
      >
        <CreateBoard />
      </SideDrawer>
    </TableContainer>
  );
};

export default WorkBoardPage;
