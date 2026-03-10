import { createSlice } from "@reduxjs/toolkit";
import FORMS_DUMMY_DATA from "../utils/formsDummyData";

const initialState = {
  forms: FORMS_DUMMY_DATA,
  activeTab: "forms",
  viewMode: "grid",
  searchQuery: "",
  activeFormId: null,
  isDetailDrawerOpen: false,
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setForms(state, action) {
      state.forms = action.payload;
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
    setActiveForm(state, action) {
      state.activeFormId = action.payload;
    },
    toggleDetailDrawer(state, action) {
      state.isDetailDrawerOpen =
        action.payload !== undefined ? action.payload : !state.isDetailDrawerOpen;
    },
    addForm(state, action) {
      const newForm = {
        ...action.payload,
        id: state.forms.length + 1,
        formId: `FRM-${String(100000 + state.forms.length + 1).slice(-6)}`,
        status: "In Process",
        isApproved: false,
        createDate: new Date().toISOString().split("T")[0],
        updateDate: new Date().toISOString().split("T")[0],
        timeAgo: "today",
      };
      state.forms.unshift(newForm);
    },
  },
});

export const {
  setForms,
  setActiveTab,
  setViewMode,
  setSearchQuery,
  setActiveForm,
  toggleDetailDrawer,
  addForm,
} = formsSlice.actions;

export default formsSlice.reducer;
