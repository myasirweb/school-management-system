import { createSlice } from "@reduxjs/toolkit";
import PROJECTS_DUMMY_DATA from "../utils/projectsDummyData";

const initialState = {
  projects: PROJECTS_DUMMY_DATA,
  activeTab: "myProjects",
  viewMode: "grid",
  searchQuery: "",
  isCreateDrawerOpen: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
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
    addProject(state, action) {
      const newProject = {
        ...action.payload,
        id: state.projects.length + 1,
        projectId: `PRJ-${String(100000 + state.projects.length + 1).slice(-6)}`,
        isStarred: false,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      state.projects.unshift(newProject);
    },
    toggleStar(state, action) {
      const project = state.projects.find((p) => p.id === action.payload);
      if (project) {
        project.isStarred = !project.isStarred;
      }
    },
  },
});

export const {
  setProjects,
  setActiveTab,
  setViewMode,
  setSearchQuery,
  toggleCreateDrawer,
  addProject,
  toggleStar,
} = projectsSlice.actions;

export default projectsSlice.reducer;
