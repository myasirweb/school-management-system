import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  activeStudentId: null,
  activeTab: "idcard",
  searchQuery: "",
};

const studentIdCardSlice = createSlice({
  name: "studentIdCard",
  initialState,
  reducers: {
    setStudents: (state, action) => { state.students = action.payload; },
    setActiveStudent: (state, action) => { state.activeStudentId = action.payload; },
    setActiveTab: (state, action) => { state.activeTab = action.payload; },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
  },
});

export const { setStudents, setActiveStudent, setActiveTab, setSearchQuery } =
  studentIdCardSlice.actions;
export default studentIdCardSlice.reducer;
