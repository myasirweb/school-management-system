import React, { useMemo } from "react";
import { TableContainer } from "../../../../sharedComponents/MainFlexContainer";
import { useDispatch, useSelector } from "react-redux";
import GroupHeader from "./header";
import {
  setActiveTab,
  setSearchQuery,
  setViewMode,
  toggleCreateDrawer,
} from "../../store/groupsSlice";
import GroupsFilterBar from "./filterbar";
import SideDrawer from "../../../../sharedComponents/SharedDrawer";
import GroupsListing from "./Listing";
import CreateGroup from "./composer/CreateGroup";

const GroupsPage = () => {
  const dispatch = useDispatch();
  const {
    groups,
    activeTab,
    viewMode,
    searchQuery,
    isCreateDrawerOpen,
  } = useSelector((s) => s.groups);

  const filtered = useMemo(() => {
    return groups.filter((g) => {
      let matchTab = true;
      if (activeTab === "public") {
        matchTab = g.type === "Public";
      } else if (activeTab === "private") {
        matchTab = g.type === "Private";
      } else if (activeTab === "classGroups") {
        matchTab = g.category === "Class Group";
      }

      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.groupId.toLowerCase().includes(q) ||
        g.code.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        (g.adminUser?.name || "").toLowerCase().includes(q);

      return matchTab && matchSearch;
    });
  }, [groups, activeTab, searchQuery]);

  return (
    <TableContainer>
      {/* Header */}
      <GroupHeader onCreateGroup={() => dispatch(toggleCreateDrawer(true))} />

      <GroupsFilterBar
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
        <GroupsListing viewMode={viewMode} groups={filtered} />
      </div>

      {/* Create Group drawer */}
      <SideDrawer
        visible={isCreateDrawerOpen}
        onClose={() => dispatch(toggleCreateDrawer(false))}
        title="Create Group"
        width={520}
      >
        <CreateGroup />
      </SideDrawer>
    </TableContainer>
  );
};

export default GroupsPage;
