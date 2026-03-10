import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emails:           [],
  activeEmailId:    null,
  activeFolder:     "inbox",
  selectedEmailIds: [],
  loading:          false,
};

const mailBoxSlice = createSlice({
  name: "mailBox",
  initialState,
  reducers: {
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
    setActiveEmail: (state, action) => {
      state.activeEmailId = action.payload;
      /* Auto-mark as read when opened */
      const email = state.emails.find((e) => e.id === action.payload);
      if (email) email.isRead = true;
    },
    setActiveFolder: (state, action) => {
      state.activeFolder     = action.payload;
      state.activeEmailId    = null;
      state.selectedEmailIds = [];
    },
    toggleStar: (state, action) => {
      const email = state.emails.find((e) => e.id === action.payload);
      if (email) email.isStarred = !email.isStarred;
    },
    toggleRead: (state, action) => {
      const email = state.emails.find((e) => e.id === action.payload);
      if (email) email.isRead = !email.isRead;
    },
    toggleImportant: (state, action) => {
      const email = state.emails.find((e) => e.id === action.payload);
      if (email) email.isImportant = !email.isImportant;
    },
    moveToTrash: (state, action) => {
      /* action.payload: array of email ids */
      action.payload.forEach((id) => {
        const email = state.emails.find((e) => e.id === id);
        if (email) email.folder = "trash";
      });
      state.selectedEmailIds = [];
      state.activeEmailId    = null;
    },
    sendEmail: (state, action) => {
      state.emails.unshift(action.payload);
    },
    saveDraft: (state, action) => {
      state.emails.unshift(action.payload);
    },
    selectEmail: (state, action) => {
      const { id, checked } = action.payload;
      if (checked) {
        if (!state.selectedEmailIds.includes(id)) state.selectedEmailIds.push(id);
      } else {
        state.selectedEmailIds = state.selectedEmailIds.filter((eid) => eid !== id);
      }
    },
    selectAllEmails: (state, action) => {
      /* action.payload: array of all currently visible email ids */
      const allIds     = action.payload;
      const allChecked = allIds.every((id) => state.selectedEmailIds.includes(id));
      if (allChecked) {
        state.selectedEmailIds = state.selectedEmailIds.filter((id) => !allIds.includes(id));
      } else {
        allIds.forEach((id) => {
          if (!state.selectedEmailIds.includes(id)) state.selectedEmailIds.push(id);
        });
      }
    },
  },
});

export const {
  setEmails,
  setActiveEmail,
  setActiveFolder,
  toggleStar,
  toggleRead,
  toggleImportant,
  moveToTrash,
  sendEmail,
  saveDraft,
  selectEmail,
  selectAllEmails,
} = mailBoxSlice.actions;

export default mailBoxSlice.reducer;
