import { Avatar, Button, Divider, Tooltip } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import LeaveStatusTag from "../../UI/leaveStatusTag";


const SCHOOL_BLUE = "rgb(82,107,177)";

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const getAvatarColor = (name = "") => {
  const colors = [
    "rgb(100,196,178)",
    "rgb(69,198,238)",
    "rgb(82,107,177)",
    "rgb(232,19,123)",
    "rgb(247,212,71)",
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

const TYPE_COLORS = {
  "Sick Leave":       { bg: "#fef2f2", color: "#dc2626" },
  "Annual Leave":     { bg: "#eff6ff", color: "#2563eb" },
  "Casual Leave":     { bg: "#f0fdf4", color: "#16a34a" },
  "Medical Leave":    { bg: "#fdf4ff", color: "#9333ea" },
  "Maternity Leave":  { bg: "#fff7ed", color: "#ea580c" },
  "Exam Leave":       { bg: "#f0fdfa", color: "#0d9488" },
  "Family Emergency": { bg: "#fefce8", color: "#ca8a04" },
};

const RESPONSE_COLOR = {
  approved: "#16a34a",
  declined:  "#dc2626",
  pending:   "#ca8a04",
};

/* ── shared cell styles (same as LeaveCard grid card) ── */
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

const LeaveDetail = ({ leave }) => {
  if (!leave) return null;
  const typeStyle = TYPE_COLORS[leave.leaveType] || { bg: "#f3f4f6", color: "#6b7280" };

  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "Montserrat, sans-serif" }}>

      {/* ── Applicant header ── */}
      <div className="flex items-center gap-4">
        <Avatar
          size={52}
          style={{
            backgroundColor: getAvatarColor(leave.applicantName),
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {getInitials(leave.applicantName)}
        </Avatar>
        <div>
          <div className="font-semibold text-gray-800 text-base">{leave.applicantName}</div>
          <div className="text-xs text-gray-400">{leave.applicantRole}</div>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className="text-xs font-normal text-gray-500 bg-gray-50 border border-gray-200 rounded px-2 py-0.5"
              style={{ letterSpacing: "0.04em" }}
            >
              {leave.leaveId}
            </span>
            <span
              className="text-xs font-normal rounded px-2 py-0.5"
              style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}
            >
              {leave.leaveType}
            </span>
            <LeaveStatusTag status={leave.status} />
          </div>
        </div>
      </div>

      <Divider style={{ margin: "0" }} />

      {/* ── Info gray card — matches LeaveCard grid bottom section ── */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">

        {/* Row 1 — 6 equal columns */}
        <div className="grid grid-cols-6 divide-x divide-gray-200 py-3">

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>Start Date</span>
            <span style={cellValue}>{leave.startDate}</span>
          </div>

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>End Date</span>
            <span style={cellValue}>{leave.endDate}</span>
          </div>

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>Days</span>
            <span style={cellValue}>{leave.days}</span>
          </div>

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

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>Leave For</span>
            <span style={{ ...cellValue, textTransform: "capitalize" }}>
              {leave.leaveFor}
            </span>
          </div>

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>Approvers</span>
            <Avatar.Group maxCount={2} size={18} style={{ marginTop: 1 }}>
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

        {/* Row 2 — Create Date | Update Date */}
        <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-100 py-2">
          <div className="flex flex-col items-center gap-0.5 px-2">
            <span style={cellLabel}>Create Date</span>
            <span style={cellValue}>{leave.createdAt}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 px-2">
            <span style={cellLabel}>Update Date</span>
            <span style={cellValue}>{leave.updatedAt}</span>
          </div>
        </div>
      </div>

      <Divider style={{ margin: "0" }} />

      {/* ── Description ── */}
      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Description
        </div>
        <p className="text-sm text-gray-600 leading-relaxed" style={{ margin: 0 }}>
          {leave.description}
        </p>
      </div>

      {/* ── Attachment ── */}
      {leave.hasAttachment && (
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <PaperClipOutlined className="text-gray-400" />
          <span className="text-sm text-gray-600">
            Attachment.{leave.attachmentType}
          </span>
          <Button
            type="link"
            size="small"
            style={{
              marginLeft: "auto",
              color: SCHOOL_BLUE,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Download
          </Button>
        </div>
      )}

      <Divider style={{ margin: "0" }} />

      {/* ── Approvers list ── */}
      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Approvers
        </div>
        <div className="flex flex-col gap-3">
          {leave.approvers.map((approver) => (
            <div
              key={approver.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50"
            >
              <Avatar
                size={36}
                style={{
                  backgroundColor: getAvatarColor(approver.name),
                  fontWeight: 700,
                  fontSize: 12,
                  flexShrink: 0,
                }}
              >
                {getInitials(approver.name)}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-gray-700">{approver.name}</div>
                    <div className="text-xs text-gray-400">{approver.role}</div>
                  </div>
                  <span
                    className="text-xs font-semibold capitalize"
                    style={{ color: RESPONSE_COLOR[approver.response] || "#6b7280" }}
                  >
                    {approver.response}
                  </span>
                </div>
                {approver.comment && (
                  <p className="text-xs text-gray-500 mt-1 italic" style={{ margin: 0 }}>
                    "{approver.comment}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveDetail;
