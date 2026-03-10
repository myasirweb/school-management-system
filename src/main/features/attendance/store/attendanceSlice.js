import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  teachers: [],
  todayAttendance: null,
  activeTab: "overview",
  filters: {
    class: "all",
    status: "all",
    search: "",
  },
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    setTodayAttendance: (state, action) => {
      state.todayAttendance = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    markAttendance: (state, action) => {
      const { date, records } = action.payload;
      state.students = state.students.map((student) => {
        const record = records.find((r) => r.studentId === student.id);
        if (!record) return student;
        const existingIdx = student.dailyRecords.findIndex((r) => r.date === date);
        const newRecord = {
          date,
          status: record.status,
          note:
            record.status === "absent"
              ? "Marked absent by admin"
              : record.status === "late"
              ? "Marked late by admin"
              : "",
        };
        if (existingIdx >= 0) {
          const updatedRecords = [...student.dailyRecords];
          updatedRecords[existingIdx] = newRecord;
          return { ...student, dailyRecords: updatedRecords };
        }
        return { ...student, dailyRecords: [...student.dailyRecords, newRecord] };
      });
    },
  },
});

export const {
  setStudents,
  setTeachers,
  setTodayAttendance,
  setActiveTab,
  setFilters,
  markAttendance,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
