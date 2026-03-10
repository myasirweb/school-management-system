import { createSlice } from "@reduxjs/toolkit";
import PAGES_DUMMY_DATA from "../utils/pagesDummyData";

const initialState = {
  pages: PAGES_DUMMY_DATA,
  searchQuery: "",
  sortBy: "updateDate",
  sortOrder: "desc",
  isCreateDrawerOpen: false,
  selectedPageIds: [],
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setPages(state, action) {
      state.pages = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    toggleCreateDrawer(state, action) {
      state.isCreateDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isCreateDrawerOpen;
    },
    addPage(state, action) {
      const newPage = {
        ...action.payload,
        id: state.pages.length + 1,
        pageId: `PGE-${String(100000 + state.pages.length + 1).slice(-6)}`,
        status: "Not Published",
        createDate: new Date().toISOString().split("T")[0],
        updateDate: new Date().toISOString().split("T")[0],
      };
      state.pages.unshift(newPage);
    },
    togglePageSelection(state, action) {
      const id = action.payload;
      const idx = state.selectedPageIds.indexOf(id);
      if (idx >= 0) {
        state.selectedPageIds.splice(idx, 1);
      } else {
        state.selectedPageIds.push(id);
      }
    },
    selectAllPages(state, action) {
      state.selectedPageIds = action.payload;
    },
  },
});

export const {
  setPages,
  setSearchQuery,
  setSortBy,
  setSortOrder,
  toggleCreateDrawer,
  addPage,
  togglePageSelection,
  selectAllPages,
} = pagesSlice.actions;

export default pagesSlice.reducer;
