import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  policies: [],
  activePolicyId: null,
  activeCategory: "all",
  searchQuery: "",
};

const schoolPolicySlice = createSlice({
  name: "schoolPolicy",
  initialState,
  reducers: {
    setPolicies: (state, action) => {
      state.policies = action.payload;
    },
    setActivePolicy: (state, action) => {
      state.activePolicyId = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addPolicy: (state, action) => {
      state.policies.unshift(action.payload);
    },
  },
});

export const {
  setPolicies,
  setActivePolicy,
  setActiveCategory,
  setSearchQuery,
  addPolicy,
} = schoolPolicySlice.actions;

export default schoolPolicySlice.reducer;
