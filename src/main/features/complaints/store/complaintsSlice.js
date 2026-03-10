import { createSlice } from "@reduxjs/toolkit";
import COMPLAINTS_DUMMY_DATA from "../utils/complaintsDummyData";

const initialState = {
  complaints: COMPLAINTS_DUMMY_DATA,
  activeTab: "created",
  viewMode: "grid",
  searchQuery: "",
  activeComplaintId: null,
  isCreateDrawerOpen: false,
  isDetailDrawerOpen: false,
};

const complaintsSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {
    setComplaints(state, action) {
      state.complaints = action.payload;
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
    setActiveComplaint(state, action) {
      state.activeComplaintId = action.payload;
    },
    toggleCreateDrawer(state, action) {
      state.isCreateDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isCreateDrawerOpen;
    },
    toggleDetailDrawer(state, action) {
      state.isDetailDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isDetailDrawerOpen;
    },
    addComplaint(state, action) {
      const newComplaint = {
        ...action.payload,
        id: state.complaints.length + 1,
        complaintId: `CMP-${String(100000 + state.complaints.length + 1).slice(-6)}`,
        status: "Pending",
        approvers: [],
        hasAttachment: false,
        attachmentType: null,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      state.complaints.unshift(newComplaint);
    },
  },
});

export const {
  setComplaints,
  setActiveTab,
  setViewMode,
  setSearchQuery,
  setActiveComplaint,
  toggleCreateDrawer,
  toggleDetailDrawer,
  addComplaint,
} = complaintsSlice.actions;

export default complaintsSlice.reducer;
