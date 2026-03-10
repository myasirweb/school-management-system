import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Button,
  Checkbox,
  Divider,
  Input,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  InboxOutlined,
  SendOutlined,
  FileTextOutlined,
  StarOutlined,
  StarFilled,
  ExclamationCircleOutlined,
  DeleteOutlined,
  MailOutlined,
  PaperClipOutlined,
  SearchOutlined,
  DownloadOutlined,
  RollbackOutlined,
  ShareAltOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  setEmails,
  setActiveEmail,
  setActiveFolder,
  toggleStar,
  toggleRead,
  toggleImportant,
  moveToTrash,
  selectEmail,
  selectAllEmails,
} from "../../store/mailBoxSlice";
import {
  seedMailBox,
  getEmailsFromStorage,
  saveEmailsToStorage,
} from "../../utils/mailBoxDummyData";
import ComposeWindow from "./composer";

/* ── Helpers ── */
const AVATAR_GRADIENTS = [
  ["rgb(82, 107, 177)", "rgb(69, 198, 238)"],
  ["rgb(100, 196, 178)", "rgb(82, 107, 177)"],
  ["rgb(232, 19, 123)", "rgb(147, 51, 234)"],
  ["#8b5cf6", "#6366f1"],
  ["#22c55e", "rgb(69, 198, 238)"],
  ["#f97316", "rgb(232, 19, 123)"],
  ["rgb(82, 107, 177)", "rgb(100, 196, 178)"],
  ["#6366f1", "#8b5cf6"],
];

const getAvatarGradient = (name) => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
  return AVATAR_GRADIENTS[Math.abs(h) % AVATAR_GRADIENTS.length];
};

const getInitials = (name) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

const formatTimestamp = (ts) => {
  const date    = new Date(ts);
  const nowMs   = Date.now();
  const diffMs  = nowMs - date.getTime();
  const diffDay = Math.floor(diffMs / 86_400_000);
  if (diffDay === 0) return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7)  return date.toLocaleDateString("en-US", { weekday: "short" });
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const getFilteredEmails = (emails, folder) => {
  if (folder === "starred")   return emails.filter((e) => e.isStarred && e.folder !== "trash");
  if (folder === "important") return emails.filter((e) => e.isImportant && e.folder !== "trash");
  return emails.filter((e) => e.folder === folder);
};

/* ── Folder definitions ── */
const FOLDERS = [
  { key: "inbox",     label: "Inbox",     Icon: InboxOutlined             },
  { key: "sent",      label: "Sent",      Icon: SendOutlined              },
  { key: "drafts",    label: "Drafts",    Icon: FileTextOutlined          },
  { key: "starred",   label: "Starred",   Icon: StarOutlined              },
  { key: "important", label: "Important", Icon: ExclamationCircleOutlined },
  { key: "trash",     label: "Trash",     Icon: DeleteOutlined            },
];

/* ════════════════════════════════════════════════
   LEFT PANEL
════════════════════════════════════════════════ */
const LeftPanel = ({ emails, activeFolder, onCompose, onFolderChange }) => {
  const unreadInbox = emails.filter((e) => e.folder === "inbox" && !e.isRead).length;
  const draftsCount = emails.filter((e) => e.folder === "drafts").length;

  return (
    <div className="w-[240px] shrink-0 flex flex-col bg-white border-r border-gray-100 shadow-sm">

      {/* Compose button — gradient */}
      <div className="px-4 pt-5 pb-3">
        <button
          type="button"
          onClick={onCompose}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:shadow-md hover:opacity-95"
          style={{ background: "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))" }}
        >
          <EditOutlined style={{ fontSize: 15 }} />
          Compose
        </button>
      </div>

      {/* Folder nav */}
      <nav className="flex-1 px-2 overflow-y-auto no-scrollbar">
        {FOLDERS.map(({ key, label, Icon }) => {
          const isActive = activeFolder === key;
          const badge    = key === "inbox" ? unreadInbox : key === "drafts" ? draftsCount : 0;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onFolderChange(key)}
              className={`group w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 text-sm font-medium transition-all duration-200 border-l-4 ${
                isActive
                  ? "bg-blue-50 text-[var(--color-blue)]"
                  : "text-gray-600 hover:bg-gray-50 border-transparent"
              }`}
              style={isActive ? { borderLeftColor: "var(--color-blue)" } : {}}
            >
              <Icon style={{ fontSize: 15 }} />
              <span className="flex-1 text-left">{label}</span>
              {badge > 0 && (
                <Badge
                  count={badge}
                  size="small"
                  style={{ backgroundColor: "var(--color-pink)" }}
                />
              )}
              <RightOutlined
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
                style={{ fontSize: 10, color: "var(--color-blue)" }}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
};

/* ════════════════════════════════════════════════
   CENTER PANEL — email list
════════════════════════════════════════════════ */
const CenterPanel = ({
  emails,
  activeEmailId,
  selectedEmailIds,
  searchQuery,
  onSearchChange,
  onSelectEmail,
  onSelectAll,
  onOpenEmail,
  onDeleteSelected,
  onMarkRead,
  onToggleStar,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);

  const allIds      = emails.map((e) => e.id);
  const selCount    = allIds.filter((id) => selectedEmailIds.includes(id)).length;
  const allChecked  = selCount > 0 && selCount === allIds.length;
  const someChecked = selCount > 0 && selCount < allIds.length;

  const filtered = emails.filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.subject.toLowerCase().includes(q) ||
      e.from.name.toLowerCase().includes(q) ||
      e.body.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-w-0 border-r border-gray-100">

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-100 shadow-sm shrink-0">
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onChange={() => onSelectAll(allIds)}
          className="mr-1"
        />
        {selCount > 0 && (
          <div className="flex items-center gap-1">
            <Tooltip title="Move to trash">
              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined style={{ color: "#6b7280" }} />}
                onClick={() => onDeleteSelected(selectedEmailIds.filter((id) => allIds.includes(id)))}
                className="hover:bg-gray-100"
              />
            </Tooltip>
            <Tooltip title="Mark as read">
              <Button
                type="text"
                size="small"
                icon={<MailOutlined style={{ color: "#6b7280" }} />}
                onClick={() =>
                  selectedEmailIds
                    .filter((id) => allIds.includes(id))
                    .forEach((id) => onMarkRead(id))
                }
                className="hover:bg-gray-100"
              />
            </Tooltip>
            <Tooltip title="Mark as important">
              <Button
                type="text"
                size="small"
                icon={<ExclamationCircleOutlined style={{ color: "#6b7280" }} />}
                className="hover:bg-gray-100"
              />
            </Tooltip>
          </div>
        )}
        <div className="flex-1" />
        <Input
          prefix={<SearchOutlined className="text-gray-400" style={{ fontSize: 13 }} />}
          placeholder="Search emails…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="rounded-full text-sm"
          style={{
            backgroundColor: "#fff",
            borderColor:     "#e5e7eb",
            width:           searchFocused ? 272 : 192,
            transition:      "width 300ms ease",
          }}
          size="small"
        />
      </div>

      {/* Email list */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
            <MailOutlined style={{ fontSize: 32 }} />
            <p className="text-sm">No emails here</p>
          </div>
        ) : (
          filtered.map((email) => {
            const isSelected       = selectedEmailIds.includes(email.id);
            const isActive         = email.id === activeEmailId;
            const hasBorderAccent  = isSelected || isActive;
            const [g1, g2]         = getAvatarGradient(email.from.name);

            const bgClass = isSelected
              ? "bg-blue-100"
              : isActive
              ? "bg-blue-50"
              : email.isRead
              ? "bg-gray-50 hover:bg-blue-50"
              : "bg-white hover:bg-blue-50";

            return (
              <div
                key={email.id}
                className={`flex items-center gap-2 px-3 py-3 border-b border-gray-100 border-l-4 cursor-pointer transition-colors duration-100 ${bgClass}`}
                style={{ borderLeftColor: hasBorderAccent ? "var(--color-blue)" : "transparent" }}
                onClick={() => onOpenEmail(email.id)}
              >
                {/* Unread dot */}
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: email.isRead ? "transparent" : "var(--color-blue)" }}
                />

                {/* Checkbox */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEmail(email.id, !isSelected);
                  }}
                >
                  <Checkbox checked={isSelected} />
                </div>

                {/* Gradient avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white font-bold"
                  style={{ background: `linear-gradient(135deg, ${g1}, ${g2})`, fontSize: 12 }}
                >
                  {getInitials(email.from.name)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-sm truncate ${email.isRead ? "text-gray-600 font-normal" : "text-gray-900 font-semibold"}`}
                    >
                      {email.from.name}
                    </span>
                    {email.hasAttachment && (
                      <PaperClipOutlined className="text-gray-400 shrink-0" style={{ fontSize: 11 }} />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span
                      className={`text-xs truncate ${email.isRead ? "text-gray-400 font-normal" : "text-gray-700 font-semibold"}`}
                    >
                      {email.subject}
                    </span>
                    <span className="text-xs text-gray-300 shrink-0">—</span>
                    <span className="text-xs text-gray-400 truncate">
                      {email.body.replace(/\n/g, " ").slice(0, 60)}…
                    </span>
                  </div>
                </div>

                {/* Timestamp + star */}
                <div
                  className="flex flex-col items-end gap-1 shrink-0 ml-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="bg-gray-100 rounded-full px-2 py-0.5 text-[10px] text-gray-500 whitespace-nowrap">
                    {formatTimestamp(email.timestamp)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleStar(email.id)}
                    className="transition-colors"
                  >
                    {email.isStarred ? (
                      <StarFilled style={{ fontSize: 13, color: "var(--color-yellow)" }} />
                    ) : (
                      <StarOutlined style={{ fontSize: 13, color: "#d1d5db" }} className="hover:text-yellow-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════
   RIGHT PANEL — email detail
════════════════════════════════════════════════ */
const RightPanel = ({ email, onToggleStar, onToggleImportant, onMoveToTrash }) => {
  const [replyText, setReplyText] = useState("");

  if (!email) {
    return (
      <div className="w-[480px] shrink-0 bg-white flex flex-col items-center justify-center border-l border-gray-100">
        <MailOutlined style={{ fontSize: 48, color: "#d1d5db" }} />
        <p className="text-sm text-gray-400 mt-3 font-medium">Select an email to read</p>
      </div>
    );
  }

  const [g1, g2] = getAvatarGradient(email.from.name);
  const toList   = email.to.map((t) => t.name || t.email).join(", ");
  const ccList   = email.cc.map((c) => c.name || c.email).join(", ");

  return (
    <div className="w-[480px] shrink-0 bg-white flex flex-col border-l border-gray-100 overflow-hidden">

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-5">

        {/* Subject */}
        <h2 className="text-2xl font-bold text-gray-900 leading-snug border-b border-gray-100 pb-3 mb-4">
          {email.subject}
        </h2>

        {/* Sender card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3 mb-4 flex items-start gap-3">
          {/* Gradient avatar */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white font-bold"
            style={{ background: `linear-gradient(135deg, ${g1}, ${g2})`, fontSize: 14 }}
          >
            {getInitials(email.from.name)}
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold text-gray-900">{email.from.name}</span>
            <div className="text-xs text-gray-400 mt-0.5">{email.from.email}</div>
          </div>

          {/* Timestamp + pill action group */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-xs text-gray-400">{formatTimestamp(email.timestamp)}</span>
            <div className="border border-gray-200 rounded-lg overflow-hidden flex items-center">
              <Tooltip title="Reply">
                <Button
                  type="text" size="small"
                  icon={<RollbackOutlined style={{ fontSize: 13, color: "#6b7280" }} />}
                  className="rounded-none hover:bg-gray-50"
                  style={{ borderRight: "1px solid #e5e7eb" }}
                />
              </Tooltip>
              <Tooltip title="Forward">
                <Button
                  type="text" size="small"
                  icon={<ShareAltOutlined style={{ fontSize: 13, color: "#6b7280" }} />}
                  className="rounded-none hover:bg-gray-50"
                  style={{ borderRight: "1px solid #e5e7eb" }}
                />
              </Tooltip>
              <Tooltip title={email.isStarred ? "Unstar" : "Star"}>
                <Button
                  type="text" size="small"
                  icon={
                    email.isStarred
                      ? <StarFilled style={{ fontSize: 13, color: "var(--color-yellow)" }} />
                      : <StarOutlined style={{ fontSize: 13, color: "#6b7280" }} />
                  }
                  onClick={() => onToggleStar(email.id)}
                  className="rounded-none hover:bg-gray-50"
                  style={{ borderRight: "1px solid #e5e7eb" }}
                />
              </Tooltip>
              <Tooltip title="Move to trash">
                <Button
                  type="text" size="small"
                  icon={<DeleteOutlined style={{ fontSize: 13, color: "#6b7280" }} />}
                  onClick={() => onMoveToTrash([email.id])}
                  className="rounded-none hover:bg-red-50"
                />
              </Tooltip>
            </div>
          </div>
        </div>

        {/* To / CC */}
        <div className="text-xs text-gray-400 space-y-0.5 mb-3">
          <div><span className="font-semibold text-gray-500">To: </span>{toList || "—"}</div>
          {ccList && <div><span className="font-semibold text-gray-500">CC: </span>{ccList}</div>}
        </div>

        <Divider className="my-4" />

        {/* Body */}
        <p className="text-sm leading-8 text-gray-700 whitespace-pre-wrap">
          {email.body}
        </p>

        {/* Attachment */}
        {email.hasAttachment && email.attachmentName && (
          <div className="mt-5 flex items-center gap-3 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-xl px-4 py-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(82,107,177,0.12)" }}
            >
              <PaperClipOutlined style={{ fontSize: 17, color: "var(--color-blue)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800 truncate">{email.attachmentName}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">Click to download</div>
            </div>
            <Tooltip title="Download">
              <Button
                type="text" shape="circle"
                icon={<DownloadOutlined style={{ color: "var(--color-blue)", fontSize: 16 }} />}
                className="hover:bg-blue-50 shrink-0"
              />
            </Tooltip>
          </div>
        )}

      </div>

      {/* Reply area */}
      <div className="shrink-0 border-t border-gray-100 bg-white px-5 py-4">
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-3">
          <Input.TextArea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply to this email…"
            rows={3}
            variant="borderless"
            style={{ resize: "none" }}
            className="text-sm"
          />
          <div className="flex justify-end mt-2">
            <Button
              type="primary"
              icon={<SendOutlined />}
              disabled={!replyText.trim()}
              className="rounded-lg font-semibold"
              style={{
                backgroundColor: replyText.trim() ? "var(--color-blue)" : undefined,
                borderColor:     replyText.trim() ? "var(--color-blue)" : undefined,
                color:           "#ffffff",
              }}
            >
              Send Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
const MailBoxPage = () => {
  const dispatch         = useDispatch();
  const emails           = useSelector((state) => state.mailBox.emails);
  const activeEmailId    = useSelector((state) => state.mailBox.activeEmailId);
  const activeFolder     = useSelector((state) => state.mailBox.activeFolder);
  const selectedEmailIds = useSelector((state) => state.mailBox.selectedEmailIds);

  const [searchQuery,    setSearchQuery]    = useState("");
  const [composeWindows, setComposeWindows] = useState([]);

  const filteredEmails = getFilteredEmails(emails, activeFolder);
  const activeEmail    = emails.find((e) => e.id === activeEmailId) ?? null;

  /* Compose window management */
  const openCompose    = () => setComposeWindows((prev) => [...prev, { id: `CW${Date.now()}`, minimized: false, maximized: false }]);
  const closeWindow    = (id) => setComposeWindows((prev) => prev.filter((w) => w.id !== id));
  const toggleMinimize = (id) => setComposeWindows((prev) => prev.map((w) => w.id === id ? { ...w, minimized: !w.minimized, maximized: false } : w));
  const toggleMaximize = (id) => setComposeWindows((prev) => prev.map((w) => w.id === id ? { ...w, maximized: !w.maximized, minimized: false } : w));

  /* ── Load from localStorage on mount ── */
  useEffect(() => {
    seedMailBox();
    dispatch(setEmails(getEmailsFromStorage()));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Persist emails whenever they change ── */
  useEffect(() => {
    if (emails.length > 0) saveEmailsToStorage(emails);
  }, [emails]);

  /* ── Handlers ── */
  const handleFolderChange = (folder)      => dispatch(setActiveFolder(folder));
  const handleOpenEmail    = (id)          => dispatch(setActiveEmail(id));
  const handleToggleStar   = (id)          => dispatch(toggleStar(id));
  const handleToggleRead   = (id)          => dispatch(toggleRead(id));
  const handleMoveToTrash  = (ids)         => dispatch(moveToTrash(ids));
  const handleSelectEmail  = (id, checked) => dispatch(selectEmail({ id, checked }));
  const handleSelectAll    = (ids)         => dispatch(selectAllEmails(ids));

  return (
    <>
      <div
        className="-mx-3 -mb-3 flex overflow-hidden"
        style={{ height: "calc(100% + 12px)" }}
      >
        <LeftPanel
          emails={emails}
          activeFolder={activeFolder}
          onCompose={openCompose}
          onFolderChange={handleFolderChange}
        />

        <CenterPanel
          emails={filteredEmails}
          activeEmailId={activeEmailId}
          selectedEmailIds={selectedEmailIds}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectEmail={handleSelectEmail}
          onSelectAll={handleSelectAll}
          onOpenEmail={handleOpenEmail}
          onDeleteSelected={handleMoveToTrash}
          onMarkRead={handleToggleRead}
          onToggleStar={handleToggleStar}
        />

        <RightPanel
          key={activeEmail?.id ?? "empty"}
          email={activeEmail}
          onToggleStar={handleToggleStar}
          onToggleImportant={(id) => dispatch(toggleImportant(id))}
          onMoveToTrash={handleMoveToTrash}
        />
      </div>

      {composeWindows.map((win, idx) => (
        <ComposeWindow
          key={win.id}
          windowData={win}
          index={idx}
          onMinimize={() => toggleMinimize(win.id)}
          onMaximize={() => toggleMaximize(win.id)}
          onClose={() => closeWindow(win.id)}
        />
      ))}
    </>
  );
};

export default MailBoxPage;
