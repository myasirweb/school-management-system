import { Avatar, Tag, Tooltip } from "antd";
import {
  BellOutlined,
  CalendarOutlined,
  FilePdfOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import LeaveStatusTag from "./leaveStatusTag";

/* ── helpers ─────────────────────────────────────────────── */

const SCHOOL_BLUE = "rgb(82,107,177)";

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const getAvatarColor = (name = "") => {
  const palette = [
    "rgb(100,196,178)",
    "rgb(69,198,238)",
    "rgb(82,107,177)",
    "rgb(232,19,123)",
    "rgb(247,212,71)",
  ];
  return palette[name.charCodeAt(0) % palette.length];
};

const getTimeAgo = (dateStr) => {
  const diffDays = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 60) return "1 month ago";
  return `${Math.floor(diffDays / 30)} months ago`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(",", "");
};

/* ── shared cell styles ──────────────────────────────────── */

const cellLabel = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: 11,
  fontWeight: 400,
  color: "#6b7280",
  textAlign: "center",
  display: "block",
};

const cellValue = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: 13,
  fontWeight: 600,
  color: SCHOOL_BLUE,
  textAlign: "center",
  display: "block",
};

/* ── attachment visual ───────────────────────────────────── */
const AttachmentBox = ({ type }) => {
  const isPdf = type === "pdf";
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl"
      style={{
        backgroundColor: isPdf ? "#ef4444" : "#3b82f6",
        padding: "12px 10px",
        minWidth: 44,
      }}
    >
      {isPdf ? (
        <FilePdfOutlined style={{ color: "#fff", fontSize: 16 }} />
      ) : (
        <FileImageOutlined style={{ color: "#fff", fontSize: 16 }} />
      )}
      <span
        style={{
          color: "#fff",
          fontSize: 9,
          fontWeight: 600,
          fontFamily: "Montserrat, sans-serif",
          marginTop: 3,
          letterSpacing: "0.04em",
        }}
      >
        {type?.toUpperCase() || "FILE"}
      </span>
    </div>
  );
};

/* ── LeaveCard ───────────────────────────────────────────── */
const LeaveCard = ({ leave, onClick }) => (
  <div
    onClick={() => onClick && onClick(leave.id)}
    className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer
               hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    style={{ fontFamily: "Montserrat, sans-serif", backgroundColor: "#fff" }}
  >
    {/* ══ WHITE TOP SECTION ══════════════════════════════════ */}
    <div className="px-5 pt-4 pb-3 flex-1 flex flex-col">

      {/* Row 1 — avatar + name/role/time + right icons */}
      <div className="flex items-start justify-between gap-3">

        {/* Left: avatar with green dot + name block */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <Avatar
              size={44}
              style={{
                backgroundColor: getAvatarColor(leave.applicantName),
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              {getInitials(leave.applicantName)}
            </Avatar>
            <span
              className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full"
              style={{ border: "2px solid #fff" }}
            />
          </div>

          <div className="min-w-0">
            <div
              className="text-sm font-semibold text-gray-800 truncate"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {leave.applicantName}
            </div>
            <div
              className="text-xs text-gray-400 truncate"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {leave.applicantRole}&nbsp;•&nbsp;{getTimeAgo(leave.createdAt)}
            </div>
          </div>
        </div>

        {/* Right: bell + leaveId tag + status tag */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <BellOutlined style={{ fontSize: 14, color: "#d1d5db" }} />
          <Tag
            style={{
              border: "1px solid #e5e7eb",
              color: "#6b7280",
              backgroundColor: "#fff",
              fontFamily: "Montserrat, sans-serif",
              fontSize: 10,
              fontWeight: 400,
              borderRadius: 6,
              padding: "0 6px",
              margin: 0,
              letterSpacing: "0.04em",
            }}
          >
            {leave.leaveId}
          </Tag>
          <LeaveStatusTag status={leave.status} />
        </div>
      </div>

      {/* Row 2 — description + attachment/calendar icon */}
      <div className="flex items-start gap-3 mt-2 flex-1">
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: "#4b5563",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            margin: 0,
            flex: 1,
            minHeight: 40,
          }}
        >
          {leave.description}
        </p>

        {/* Attachment box or calendar placeholder */}
        {leave.hasAttachment ? (
          <AttachmentBox type={leave.attachmentType} />
        ) : (
          <CalendarOutlined
            style={{ fontSize: 36, color: SCHOOL_BLUE, flexShrink: 0, opacity: 0.18 }}
          />
        )}
      </div>
    </div>

    {/* ══ GRAY BOTTOM SECTION ════════════════════════════════ */}
    <div className="bg-gray-50 border-t border-gray-100">

      {/* Info row 1 — 6 equal columns */}
      <div className="grid grid-cols-6 divide-x divide-gray-200 py-3">

        {/* Start Date */}
        <div className="flex flex-col items-center gap-0.5 px-1">
          <span style={cellLabel}>Start Date</span>
          <span style={cellValue}>{formatDate(leave.startDate)}</span>
        </div>

        {/* End Date */}
        <div className="flex flex-col items-center gap-0.5 px-1">
          <span style={cellLabel}>End Date</span>
          <span style={cellValue}>{formatDate(leave.endDate)}</span>
        </div>

        {/* Days */}
        <div className="flex flex-col items-center gap-0.5 px-1">
          <span style={cellLabel}>Days</span>
          <span style={cellValue}>{leave.days}</span>
        </div>

        {/* Leave Type */}
        <div className="flex flex-col items-center gap-0.5 px-1">
          <span style={cellLabel}>Leave Type</span>
          <span
            style={{
              ...cellValue,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }}
          >
            {leave.leaveType}
          </span>
        </div>

        {/* Leave For — Avatar + leaveFor label */}
        <div className="flex flex-col items-center gap-0.5 px-1">
          <span style={cellLabel}>Leave For</span>
          <div className="flex items-center gap-1 justify-center">
            <Avatar
              size={16}
              style={{
                backgroundColor: getAvatarColor(leave.applicantName),
                fontSize: 7,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {getInitials(leave.applicantName)}
            </Avatar>
            <span
              style={{
                ...cellValue,
                textTransform: "capitalize",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {leave.leaveFor}
            </span>
          </div>
        </div>

        {/* Approvers */}
        <div className="flex flex-col items-center gap-0.5 px-1">
          <span style={cellLabel}>Approvers</span>
          <Avatar.Group maxCount={2} size="small" style={{ marginTop: 1 }}>
            {leave.approvers.map((a) => (
              <Tooltip key={a.id} title={`${a.name} (${a.role})`}>
                <Avatar
                  size={18}
                  style={{
                    backgroundColor: getAvatarColor(a.name),
                    fontSize: 7,
                    fontWeight: 700,
                  }}
                >
                  {getInitials(a.name)}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
      </div>

      {/* Info row 2 — 2 cols: Create Date | Update Date */}
      <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-100 py-2">
        <div className="flex flex-col items-center gap-0.5 px-2">
          <span style={cellLabel}>Create Date</span>
          <span style={cellValue}>{formatDate(leave.createdAt)}</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 px-2">
          <span style={cellLabel}>Update Date</span>
          <span style={cellValue}>{formatDate(leave.updatedAt)}</span>
        </div>
      </div>
    </div>
  </div>
);

export default LeaveCard;
