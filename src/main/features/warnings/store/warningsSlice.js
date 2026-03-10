import { createSlice } from "@reduxjs/toolkit";
import WARNINGS_DUMMY_DATA from "../utils/warningsDummyData";

const initialState = {
  warnings: WARNINGS_DUMMY_DATA,
  activeTab: "created",
  viewMode: "grid",
  searchQuery: "",
  activeWarningId: null,
  isCreateDrawerOpen: false,
  isDetailDrawerOpen: false,
};

const warningsSlice = createSlice({
  name: "warnings",
  initialState,
  reducers: {
    setWarnings(state, action) {
      state.warnings = action.payload;
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
    setActiveWarning(state, action) {
      state.activeWarningId = action.payload;
    },
    toggleCreateDrawer(state, action) {
      state.isCreateDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isCreateDrawerOpen;
    },
    toggleDetailDrawer(state, action) {
      state.isDetailDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isDetailDrawerOpen;
    },
    addWarning(state, action) {
      const newWarning = {
        ...action.payload,
        id: state.warnings.length + 1,
        warningId: `WRN-${String(100000 + state.warnings.length + 1).slice(-6)}`,
        status: "Pending",
        approvers: [],
        hasAttachment: false,
        attachmentType: null,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      state.warnings.unshift(newWarning);
    },
  },
});

export const {
  setWarnings,
  setActiveTab,
  setViewMode,
  setSearchQuery,
  setActiveWarning,
  toggleCreateDrawer,
  toggleDetailDrawer,
  addWarning,
} = warningsSlice.actions;

export default warningsSlice.reducer;
