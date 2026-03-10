import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Badge,
  Input,
  Button,
  Switch,
  Tooltip,
  Divider,
} from "antd";
import {
  SearchOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
  SmileOutlined,
  PaperClipOutlined,
  AudioOutlined,
  SendOutlined,
  CheckOutlined,
  BellOutlined,
  UserOutlined,
  PhoneFilled,
  VideoCameraFilled,
  SettingOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  setContacts,
  setConversations,
  setActiveContact,
  sendMessage,
} from "../../store/messengerSlice";
import {
  CURRENT_USER,
  seedMessenger,
  getContactsFromStorage,
  getConversationsFromStorage,
  saveContactsToStorage,
  saveConversationsToStorage,
} from "../../utils/messengerDummyData";

/* ── Helpers ── */
const ROLE_COLOR = {
  Teacher: "rgb(100, 196, 178)",
  Student: "rgb(69, 198, 238)",
  Admin:   "rgb(232, 19, 123)",
};

const timeToMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const nowTime = () => {
  const d = new Date();
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
};

/* ── Message status tick ── */
const StatusTick = ({ status }) => {
  if (status === "sent")
    return <CheckOutlined style={{ fontSize: 10, color: "#d1d5db" }} />;
  if (status === "delivered")
    return <span style={{ fontSize: 10, color: "#d1d5db", letterSpacing: -2 }}>✓✓</span>;
  if (status === "read")
    return <span style={{ fontSize: 10, color: "var(--color-blue)", letterSpacing: -2 }}>✓✓</span>;
  return null;
};

/* ════════════════════════════════════════════════
   LEFT PANEL
════════════════════════════════════════════════ */
const LeftPanel = ({
  contacts,
  activeContactId,
  onSelectContact,
  searchQuery,
  onSearchChange,
}) => {
  const [activeTab, setActiveTab] = useState("chats");
  const TABS = ["Chats", "Groups", "Calls"];

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[280px] shrink-0 flex flex-col border-r border-gray-200 bg-white">
      {/* Panel header */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-base font-bold text-gray-800 mb-3">Messages</h2>
        {/* Search */}
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search conversations…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          variant="filled"
          className="rounded-full text-sm"
          style={{ backgroundColor: "#f3f4f6", borderColor: "transparent" }}
        />
      </div>

      {/* Tabs */}
      <div className="flex px-4 py-2 gap-1">
        {TABS.map((tab) => {
          const key = tab.toLowerCase();
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${
                isActive
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
              style={isActive ? { backgroundColor: "var(--color-blue)" } : {}}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab !== "chats" ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            Coming soon
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            No conversations found
          </div>
        ) : (
          filtered.map((contact) => {
            const isActive = contact.id === activeContactId;
            return (
              <div
                key={contact.id}
                onClick={() => onSelectContact(contact.id)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 ${
                  isActive
                    ? "bg-blue-50 border-r-2"
                    : "hover:bg-gray-50"
                }`}
                style={isActive ? { borderRightColor: "var(--color-blue)" } : {}}
              >
                {/* Avatar with online dot */}
                <div className="relative shrink-0">
                  <Avatar src={contact.avatar} size={44} />
                  {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>

                {/* Name + last message */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800 truncate leading-tight">
                      {contact.name}
                    </span>
                    <span className="text-[10px] text-gray-400 shrink-0 ml-1">
                      {contact.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-gray-400 truncate flex-1">
                      {contact.lastMessage}
                    </span>
                    {contact.unreadCount > 0 && (
                      <Badge
                        count={contact.unreadCount}
                        size="small"
                        style={{ backgroundColor: "var(--color-pink)", marginLeft: 4 }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Current user footer */}
      <div className="border-t border-gray-100 p-3 flex items-center gap-3">
        <div className="relative shrink-0">
          <Avatar src={CURRENT_USER.avatar} size={36} />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-800 truncate leading-tight">
            {CURRENT_USER.name}
          </div>
          <div className="text-[11px] text-green-500 font-medium">Online</div>
        </div>
        <SettingOutlined className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" style={{ fontSize: 16 }} />
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════
   CENTER PANEL
════════════════════════════════════════════════ */
const CenterPanel = ({ contact, messages, onSendMessage, onToggleInfo }) => {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  /* Auto-scroll to bottom when messages change */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    onSendMessage(text);
    setInputText("");
  };

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-3">💬</div>
          <p className="text-sm font-medium">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-w-0">

      {/* ── Chat header ── */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 bg-white shrink-0">
        <div className="relative">
          <Avatar src={contact.avatar} size={40} />
          {contact.isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-gray-900 truncate">{contact.name}</div>
          <div className="text-[11px] font-medium" style={{ color: contact.isOnline ? "#22c55e" : "#9ca3af" }}>
            {contact.isOnline ? "Online" : "Offline"}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Tooltip title="Video call">
            <Button
              type="text"
              shape="circle"
              icon={<VideoCameraOutlined style={{ color: "var(--color-blue)", fontSize: 17 }} />}
              className="hover:bg-blue-50"
            />
          </Tooltip>
          <Tooltip title="Phone call">
            <Button
              type="text"
              shape="circle"
              icon={<PhoneOutlined style={{ color: "var(--color-blue)", fontSize: 16 }} />}
              className="hover:bg-blue-50"
            />
          </Tooltip>
          <Tooltip title="Contact info">
            <Button
              type="text"
              shape="circle"
              onClick={onToggleInfo}
              icon={<InfoCircleOutlined style={{ fontSize: 17, color: "var(--color-blue)" }} />}
              className="hover:bg-blue-50"
            />
          </Tooltip>
        </div>
      </div>

      {/* ── Messages area ── */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-1 no-scrollbar">
        {messages.map((msg, index) => {
          const isOwn = msg.senderId === CURRENT_USER.id;

          /* Time separator */
          const showSep =
            index === 0 ||
            timeToMinutes(msg.time) - timeToMinutes(messages[index - 1].time) >= 30;

          return (
            <div key={msg.id}>
              {showSep && (
                <div className="flex items-center justify-center my-3">
                  <span className="text-[11px] text-gray-400 bg-gray-100 rounded-full px-3 py-0.5">
                    {msg.time}
                  </span>
                </div>
              )}

              <div className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
                {/* Other person avatar */}
                {!isOwn && (
                  <Avatar src={contact.avatar} size={28} className="shrink-0 mb-1" />
                )}

                <div className={`flex flex-col max-w-[68%] ${isOwn ? "items-end" : "items-start"}`}>
                  {/* Bubble */}
                  <div
                    className={`px-4 py-2 shadow-sm text-sm leading-relaxed ${
                      isOwn
                        ? "text-white rounded-2xl rounded-tr-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none"
                    }`}
                    style={isOwn ? { backgroundColor: "var(--color-blue)" } : {}}
                  >
                    {msg.text}
                  </div>

                  {/* Reaction below bubble */}
                  {msg.reaction && (
                    <span className="text-base mt-0.5">{msg.reaction}</span>
                  )}

                  {/* Time + status */}
                  <div className="flex items-center gap-1 mt-0.5 px-1">
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                    {isOwn && <StatusTick status={msg.status} />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Message input bar ── */}
      <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3 flex items-center gap-2">
        <Tooltip title="Emoji">
          <Button
            type="text"
            shape="circle"
            icon={<SmileOutlined style={{ color: "#9ca3af", fontSize: 20 }} />}
            className="hover:bg-gray-100 shrink-0"
          />
        </Tooltip>

        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message…"
          variant="filled"
          className="flex-1 rounded-full text-sm"
          style={{ backgroundColor: "#f3f4f6", borderColor: "transparent" }}
        />

        <Tooltip title="Attach file">
          <Button
            type="text"
            shape="circle"
            icon={<PaperClipOutlined style={{ color: "#9ca3af", fontSize: 18 }} />}
            className="hover:bg-gray-100 shrink-0"
          />
        </Tooltip>

        {inputText.trim() ? (
          <Button
            type="primary"
            shape="circle"
            icon={<SendOutlined style={{ fontSize: 15 }} />}
            onClick={handleSend}
            style={{ backgroundColor: "var(--color-blue)", borderColor: "var(--color-blue)", color: "#fff" }}
            className="shrink-0"
          />
        ) : (
          <Tooltip title="Voice message">
            <Button
              type="text"
              shape="circle"
              icon={<AudioOutlined style={{ color: "#9ca3af", fontSize: 18 }} />}
              className="hover:bg-gray-100 shrink-0"
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════
   RIGHT PANEL
════════════════════════════════════════════════ */
const RightPanel = ({ contact }) => {
  const [notifications, setNotifications] = useState(true);

  if (!contact) {
    return (
      <div className="w-[280px] shrink-0 border-l border-gray-200 bg-white flex items-center justify-center">
        <p className="text-sm text-gray-400">No contact selected</p>
      </div>
    );
  }

  return (
    <div className="w-[280px] shrink-0 border-l border-gray-200 bg-white overflow-y-auto no-scrollbar">
      {/* Profile header */}
      <div className="flex flex-col items-center pt-6 pb-4 px-4 border-b border-gray-100">
        <div className="relative mb-3">
          <Avatar src={contact.avatar} size={80} />
          {contact.isOnline && (
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
          )}
        </div>
        <h3 className="text-sm font-bold text-gray-900 text-center leading-tight">
          {contact.name}
        </h3>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full mt-1"
          style={{
            backgroundColor: `${ROLE_COLOR[contact.role]}20`,
            color: ROLE_COLOR[contact.role],
          }}
        >
          {contact.role}
        </span>
        <p
          className="text-[11px] font-medium mt-1"
          style={{ color: contact.isOnline ? "#22c55e" : "#9ca3af" }}
        >
          {contact.isOnline ? "● Online" : "○ Offline"}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 px-4 py-4 border-b border-gray-100">
        <Tooltip title="Video call">
          <button
            type="button"
            className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl bg-gray-100 hover:bg-blue-50 transition-colors"
          >
            <VideoCameraFilled style={{ fontSize: 18, color: "var(--color-blue)" }} />
            <span className="text-[10px] text-gray-500 font-medium">Video</span>
          </button>
        </Tooltip>
        <Tooltip title="Phone call">
          <button
            type="button"
            className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl bg-gray-100 hover:bg-blue-50 transition-colors"
          >
            <PhoneFilled style={{ fontSize: 18, color: "var(--color-blue)" }} />
            <span className="text-[10px] text-gray-500 font-medium">Call</span>
          </button>
        </Tooltip>
      </div>

      {/* Info rows */}
      <div className="px-4 py-3 space-y-4 border-b border-gray-100">
        {/* Notification toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellOutlined className="text-gray-400" style={{ fontSize: 15 }} />
            <span className="text-sm text-gray-700 font-medium">Notifications</span>
          </div>
          <Switch
            size="small"
            checked={notifications}
            onChange={setNotifications}
            style={{ backgroundColor: notifications ? "var(--color-blue)" : undefined }}
          />
        </div>

        {/* Bio */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UserOutlined className="text-gray-400" style={{ fontSize: 14 }} />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Bio</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed pl-5">{contact.bio}</p>
        </div>

        {/* Phone */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PhoneOutlined className="text-gray-400" style={{ fontSize: 14 }} />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</span>
          </div>
          <p className="text-xs text-gray-700 font-medium pl-5">{contact.phoneNumber}</p>
        </div>

        {/* Username */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-400 text-sm">@</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Username</span>
          </div>
          <p className="text-xs text-gray-700 font-medium pl-5">{contact.username}</p>
        </div>
      </div>

      {/* Most used emojis */}
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Most Used Emojis
        </p>
        <div className="flex gap-2">
          {contact.mostUsedEmojis.map((emoji, i) => (
            <span key={i} className="text-2xl">{emoji}</span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 py-4 flex flex-col gap-2">
        <Button block className="rounded-lg font-medium text-sm h-9">
          Edit Contact
        </Button>
        <Button
          block
          className="rounded-lg font-medium text-sm h-9 text-red-500 border-red-200 hover:border-red-400 hover:text-red-600"
          icon={<StopOutlined />}
        >
          Block
        </Button>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
const MessengerPage = () => {
  const dispatch    = useDispatch();
  const contacts    = useSelector((state) => state.messenger.contacts);
  const activeId    = useSelector((state) => state.messenger.activeContactId);
  const conversations = useSelector((state) => state.messenger.conversations);

  const [searchQuery, setSearchQuery]       = useState("");
  const [showContactInfo, setShowContactInfo] = useState(true);

  const activeContact  = contacts.find((c) => c.id === activeId) ?? null;
  const activeMessages = activeId ? (conversations[activeId] ?? []) : [];

  /* ── Load from localStorage on mount ── */
  useEffect(() => {
    seedMessenger();
    const storedContacts = getContactsFromStorage();
    const storedConvs    = getConversationsFromStorage();
    dispatch(setContacts(storedContacts));
    dispatch(setConversations(storedConvs));
    /* Auto-select first contact */
    if (storedContacts.length > 0) {
      dispatch(setActiveContact(storedContacts[0].id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Persist contacts whenever they change ── */
  useEffect(() => {
    if (contacts.length > 0) saveContactsToStorage(contacts);
  }, [contacts]);

  /* ── Persist conversations whenever they change ── */
  useEffect(() => {
    if (Object.keys(conversations).length > 0) saveConversationsToStorage(conversations);
  }, [conversations]);

  const handleSelectContact = (contactId) => {
    dispatch(setActiveContact(contactId));
  };

  const handleSendMessage = (text) => {
    if (!activeId) return;
    const message = {
      id:       `MSG${Date.now()}`,
      senderId: CURRENT_USER.id,
      text,
      time:     nowTime(),
      status:   "sent",
      reaction: null,
    };
    dispatch(sendMessage({ contactId: activeId, message }));
  };

  return (
    /* Fill the main element's available height, cancel out px-3 pb-3 padding */
    <div
      className="-mx-3 -mb-3 flex overflow-hidden"
      style={{ height: "calc(100% + 12px)" }}
    >
      <LeftPanel
        contacts={contacts}
        activeContactId={activeId}
        onSelectContact={handleSelectContact}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <CenterPanel
        contact={activeContact}
        messages={activeMessages}
        onSendMessage={handleSendMessage}
        onToggleInfo={() => setShowContactInfo((v) => !v)}
      />

      {showContactInfo && <RightPanel contact={activeContact} />}
    </div>
  );
};

export default MessengerPage;
