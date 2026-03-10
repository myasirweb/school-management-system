import { createSlice } from "@reduxjs/toolkit";
import TASKS_DUMMY_DATA from "../utils/tasksDummyData";

const initialState = {
  tasks: TASKS_DUMMY_DATA,
  activeTab: "myTasks",
  viewMode: "grid",
  searchQuery: "",
  activeTaskId: null,
  isCreateDrawerOpen: false,
  isDetailDrawerOpen: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setActiveTask(state, action) {
      state.activeTaskId = action.payload;
    },
    toggleCreateDrawer(state, action) {
      state.isCreateDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isCreateDrawerOpen;
    },
    toggleDetailDrawer(state, action) {
      state.isDetailDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isDetailDrawerOpen;
    },
    addTask(state, action) {
      const newTask = {
        ...action.payload,
        id: state.tasks.length + 1,
        taskId: `TSK-${String(100000 + state.tasks.length + 1).slice(-6)}`,
        status: "Pending",
        completionPercentage: 0,
        rating: 0,
        subTasks: 0,
        hasAttachment: false,
        attachmentType: null,
        createDate: new Date().toISOString().split("T")[0],
        updateDate: new Date().toISOString().split("T")[0],
      };
      state.tasks.unshift(newTask);
    },
  },
});

export const {
  setTasks,
  setActiveTab,
  setViewMode,
  setSearchQuery,
  setActiveTask,
  toggleCreateDrawer,
  toggleDetailDrawer,
  addTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
