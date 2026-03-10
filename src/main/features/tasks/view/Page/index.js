import React, { useMemo } from "react";
import { TableContainer } from "../../../../sharedComponents/MainFlexContainer";
import { useDispatch, useSelector } from "react-redux";
import TaskHeader from "./header";
import {
  setActiveTask,
  setActiveTab,
  setSearchQuery,
  setViewMode,
  toggleCreateDrawer,
  toggleDetailDrawer,
} from "../../store/tasksSlice";
import TasksFilterBar from "./filterbar";
import SideDrawer from "../../../../sharedComponents/SharedDrawer";
import TasksListing from "./Listing";
import TaskDetail from "./Detail";
import CreateTask from "./composer/CreateTask";

const TasksPage = () => {
  const dispatch = useDispatch();
  const {
    tasks,
    activeTab,
    viewMode,
    searchQuery,
    activeTaskId,
    isCreateDrawerOpen,
    isDetailDrawerOpen,
  } = useSelector((s) => s.tasks);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      let matchTab = true;
      if (activeTab === "assignedByMe") {
        matchTab = t.status === "Pending" || t.status === "In Progress";
      } else if (activeTab === "teamTasks") {
        matchTab = t.type === "Group" || t.type === "Project";
      }

      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        t.subject.toLowerCase().includes(q) ||
        t.taskId.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q) ||
        t.creatorName.toLowerCase().includes(q);

      return matchTab && matchSearch;
    });
  }, [tasks, activeTab, searchQuery]);

  const selectedTask = tasks.find((t) => t.id === activeTaskId) || null;

  const handleCardClick = (id) => {
    dispatch(setActiveTask(id));
    dispatch(toggleDetailDrawer(true));
  };

  return (
    <TableContainer>
      {/* Header */}
      <TaskHeader onCreateTask={() => dispatch(toggleCreateDrawer(true))} />

      <TasksFilterBar
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
        <TasksListing
          viewMode={viewMode}
          tasks={filtered}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Detail drawer */}
      <SideDrawer
        visible={isDetailDrawerOpen}
        onClose={() => dispatch(toggleDetailDrawer(false))}
        title="Task Details"
        width={580}
      >
        <TaskDetail task={selectedTask} />
      </SideDrawer>

      {/* Create Task drawer */}
      <SideDrawer
        visible={isCreateDrawerOpen}
        onClose={() => dispatch(toggleCreateDrawer(false))}
        title="Create Task"
        width={520}
      >
        <CreateTask />
      </SideDrawer>
    </TableContainer>
  );
};

export default TasksPage;
