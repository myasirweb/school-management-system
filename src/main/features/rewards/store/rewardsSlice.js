import { createSlice } from "@reduxjs/toolkit";
import REWARDS_DUMMY_DATA from "../utils/rewardsDummyData";

const initialState = {
  rewards: REWARDS_DUMMY_DATA,
  activeTab: "created",
  viewMode: "grid",
  searchQuery: "",
  activeRewardId: null,
  isCreateDrawerOpen: false,
  isDetailDrawerOpen: false,
};

const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    setRewards(state, action) {
      state.rewards = action.payload;
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
    setActiveReward(state, action) {
      state.activeRewardId = action.payload;
    },
    toggleCreateDrawer(state, action) {
      state.isCreateDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isCreateDrawerOpen;
    },
    toggleDetailDrawer(state, action) {
      state.isDetailDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isDetailDrawerOpen;
    },
    addReward(state, action) {
      const newReward = {
        ...action.payload,
        id: state.rewards.length + 1,
        rewardId: `RWD-${String(100000 + state.rewards.length + 1).slice(-6)}`,
        status: "Pending",
        approvers: [],
        hasAttachment: false,
        attachmentType: null,
        member: { name: "Dr. Sana Malik", avatar: "https://i.pravatar.cc/150?img=10" },
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      state.rewards.unshift(newReward);
    },
  },
});

export const {
  setRewards,
  setActiveTab,
  setViewMode,
  setSearchQuery,
  setActiveReward,
  toggleCreateDrawer,
  toggleDetailDrawer,
  addReward,
} = rewardsSlice.actions;

export default rewardsSlice.reducer;
