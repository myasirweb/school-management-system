import { createSlice } from "@reduxjs/toolkit";
import GROUPS_DUMMY_DATA from "../utils/groupsDummyData";

const initialState = {
  groups: GROUPS_DUMMY_DATA,
  activeTab: "myGroups",
  viewMode: "grid",
  searchQuery: "",
  isCreateDrawerOpen: false,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups(state, action) {
      state.groups = action.payload;
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
    toggleCreateDrawer(state, action) {
      state.isCreateDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isCreateDrawerOpen;
    },
    addGroup(state, action) {
      const newGroup = {
        ...action.payload,
        id: state.groups.length + 1,
        groupId: `GRP-${String(100000 + state.groups.length + 1).slice(-6)}`,
        isStarred: false,
        memberCount: (action.payload.members || []).length,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      state.groups.unshift(newGroup);
    },
    toggleStar(state, action) {
      const group = state.groups.find((g) => g.id === action.payload);
      if (group) {
        group.isStarred = !group.isStarred;
      }
    },
  },
});

export const {
  setGroups,
  setActiveTab,
  setViewMode,
  setSearchQuery,
  toggleCreateDrawer,
  addGroup,
  toggleStar,
} = groupsSlice.actions;

export default groupsSlice.reducer;
