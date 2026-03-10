import React, { useMemo } from "react";
import { TableContainer } from "../../../../sharedComponents/MainFlexContainer";
import { useDispatch, useSelector } from "react-redux";
import ProjectHeader from "./header";
import {
  setActiveTab,
  setSearchQuery,
  setViewMode,
  toggleCreateDrawer,
} from "../../store/projectsSlice";
import ProjectsFilterBar from "./filterbar";
import SideDrawer from "../../../../sharedComponents/SharedDrawer";
import ProjectsListing from "./Listing";
import CreateProject from "./composer/CreateProject";

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const {
    projects,
    activeTab,
    viewMode,
    searchQuery,
    isCreateDrawerOpen,
  } = useSelector((s) => s.projects);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      let matchTab = true;
      if (activeTab === "active") {
        matchTab = p.status === "Active";
      } else if (activeTab === "onHold") {
        matchTab = p.status === "On Hold";
      } else if (activeTab === "completed") {
        matchTab = p.status === "Completed";
      }

      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.projectId.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        (p.adminUser?.name || "").toLowerCase().includes(q);

      return matchTab && matchSearch;
    });
  }, [projects, activeTab, searchQuery]);

  return (
    <TableContainer>
      {/* Header */}
      <ProjectHeader onCreateProject={() => dispatch(toggleCreateDrawer(true))} />

      <ProjectsFilterBar
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
        <ProjectsListing viewMode={viewMode} projects={filtered} />
      </div>

      {/* Create Project drawer */}
      <SideDrawer
        visible={isCreateDrawerOpen}
        onClose={() => dispatch(toggleCreateDrawer(false))}
        title="Create Project"
        width={560}
      >
        <CreateProject />
      </SideDrawer>
    </TableContainer>
  );
};

export default ProjectsPage;
