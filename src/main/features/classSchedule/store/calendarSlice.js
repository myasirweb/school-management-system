import { createSlice } from "@reduxjs/toolkit";

const todayStr = new Date().toISOString().split("T")[0];

const initialState = {
  /* ── Calendar tab ── */
  events:          [],
  activeView:      "week",    // "month" | "week" | "day"
  activeDate:      todayStr,  // YYYY-MM-DD
  activeRole:      "admin",   // "admin" | "teacher" | "student"
  sidebarEventTab: "upcoming",// "today" | "upcoming" | "interviews"

  /* ── Schedule tab ── */
  schedules:         [],
  activeScheduleId:  null,
  activeScheduleTab: "my",       // "my" | "team"
  scheduleFilter:    "upcoming", // "past" | "today" | "upcoming"

  /* ── Top-level tab ── */
  activeCalendarTab: "calendar", // "calendar" | "schedule"
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    /* Calendar */
    setEvents:          (s, a) => { s.events          = a.payload; },
    addEvent:           (s, a) => { s.events.unshift(a.payload); },
    setActiveView:      (s, a) => { s.activeView      = a.payload; },
    setActiveDate:      (s, a) => { s.activeDate      = a.payload; },
    setActiveRole:      (s, a) => { s.activeRole      = a.payload; },
    setSidebarEventTab: (s, a) => { s.sidebarEventTab = a.payload; },

    /* Schedule */
    setSchedules:         (s, a) => { s.schedules         = a.payload; },
    addSchedule:          (s, a) => { s.schedules.unshift(a.payload); },
    setActiveScheduleId:  (s, a) => { s.activeScheduleId  = a.payload; },
    setActiveScheduleTab: (s, a) => { s.activeScheduleTab = a.payload; },
    setScheduleFilter:    (s, a) => { s.scheduleFilter    = a.payload; },

    /* Top-level */
    setActiveCalendarTab: (s, a) => { s.activeCalendarTab = a.payload; },
  },
});

export const {
  setEvents, addEvent, setActiveView, setActiveDate, setActiveRole, setSidebarEventTab,
  setSchedules, addSchedule, setActiveScheduleId, setActiveScheduleTab, setScheduleFilter,
  setActiveCalendarTab,
} = calendarSlice.actions;

export default calendarSlice.reducer;
