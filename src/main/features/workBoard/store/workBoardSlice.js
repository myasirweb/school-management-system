import { createSlice } from "@reduxjs/toolkit";
import WORKBOARD_DUMMY_DATA from "../utils/workBoardDummyData";

const initialState = {
  boards: WORKBOARD_DUMMY_DATA,
  activeTab: "myBoards",
  viewMode: "grid",
  searchQuery: "",
  isCreateDrawerOpen: false,
};

const workBoardSlice = createSlice({
  name: "workBoard",
  initialState,
  reducers: {
    setBoards(state, action) {
      state.boards = action.payload;
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
    addBoard(state, action) {
      const newBoard = {
        ...action.payload,
        id: state.boards.length + 1,
        boardId: `BRD-${String(100000 + state.boards.length + 1).slice(-6)}`,
        isStarred: false,
        taskCount: 0,
        completedTasks: 0,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      state.boards.unshift(newBoard);
    },
    toggleStar(state, action) {
      const board = state.boards.find((b) => b.id === action.payload);
      if (board) {
        board.isStarred = !board.isStarred;
      }
    },
  },
});

export const {
  setBoards,
  setActiveTab,
  setViewMode,
  setSearchQuery,
  toggleCreateDrawer,
  addBoard,
  toggleStar,
} = workBoardSlice.actions;

export default workBoardSlice.reducer;
