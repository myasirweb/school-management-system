import { createSlice } from "@reduxjs/toolkit";
import LEAVES_DUMMY_DATA from "../utils/leaveData";


const initialState = {
  leaves: LEAVES_DUMMY_DATA,
  activeTab: "mine",          // "mine" | "approvals" | "my"
  viewMode: "grid",           // "grid" | "list"
  searchQuery: "",
  activeLeaveId: null,
  isCreateDrawerOpen: false,
  isDetailDrawerOpen: false,
};

const leavesSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    setLeaves(state, action) {
      state.leaves = action.payload;
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
    setActiveLeave(state, action) {
      state.activeLeaveId = action.payload;
    },
    toggleCreateDrawer(state, action) {
      state.isCreateDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isCreateDrawerOpen;
    },
    toggleDetailDrawer(state, action) {
      state.isDetailDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isDetailDrawerOpen;
    },
    addLeave(state, action) {
      const newLeave = {
        ...action.payload,
        id: state.leaves.length + 1,
        leaveId: `LEV-${String(100120 + state.leaves.length + 1).slice(-6)}`,
        status: "pending",
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      state.leaves.unshift(newLeave);
    },
  },
});

export const {
  setLeaves,
  setActiveTab,
  setViewMode,
  setSearchQuery,
  setActiveLeave,
  toggleCreateDrawer,
  toggleDetailDrawer,
  addLeave,
} = leavesSlice.actions;

export default leavesSlice.reducer;
