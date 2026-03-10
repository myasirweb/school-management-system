import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  activeContactId: null,
  conversations: {},
};

const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setActiveContact: (state, action) => {
      state.activeContactId = action.payload;
      /* Clear unread count when contact is opened */
      const contact = state.contacts.find((c) => c.id === action.payload);
      if (contact) contact.unreadCount = 0;
    },
    sendMessage: (state, action) => {
      const { contactId, message } = action.payload;
      if (!state.conversations[contactId]) {
        state.conversations[contactId] = [];
      }
      state.conversations[contactId].push(message);
      /* Update lastMessage preview on contact */
      const contact = state.contacts.find((c) => c.id === contactId);
      if (contact) {
        contact.lastMessage     = message.text;
        contact.lastMessageTime = message.time;
      }
    },
    addReaction: (state, action) => {
      const { contactId, messageId, reaction } = action.payload;
      const msgs = state.conversations[contactId];
      if (msgs) {
        const msg = msgs.find((m) => m.id === messageId);
        if (msg) msg.reaction = reaction;
      }
    },
  },
});

export const {
  setContacts,
  setConversations,
  setActiveContact,
  sendMessage,
  addReaction,
} = messengerSlice.actions;

export default messengerSlice.reducer;
