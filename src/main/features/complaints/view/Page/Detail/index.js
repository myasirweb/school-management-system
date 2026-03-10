import { Avatar, Button, Divider, Tooltip } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import ComplaintStatusTag from "../UI/ComplaintStatusTag";

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

const CATEGORY_COLORS = {
  "Harassment":        { bg: "#fef2f2", color: "#dc2626" },
  "Bullying":          { bg: "#fff7ed", color: "#ea580c" },
  "Academic Issue":    { bg: "#fefce8", color: "#ca8a04" },
  "Facilities Issue":  { bg: "#f0fdfa", color: "#0d9488" },
  "Staff Conduct":     { bg: "#eff6ff", color: "#2563eb" },
  "Safety Concern":    { bg: "#fdf4ff", color: "#9333ea" },
  "Discrimination":    { bg: "#fef2f2", color: "#be123c" },
};

const RESPONSE_COLOR = {
  Approved: "#16a34a",
  Declined: "#dc2626",
  Pending:  "#ca8a04",
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

const ComplaintDetail = ({ complaint }) => {
  if (!complaint) return null;
  const categoryStyle = CATEGORY_COLORS[complaint.category] || { bg: "#f3f4f6", color: "#6b7280" };

  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "Montserrat, sans-serif" }}>

      {/* ── Recipient header ── */}
      <div className="flex items-center gap-4">
        <Avatar
          size={52}
          style={{
            backgroundColor: getAvatarColor(complaint.recipientName),
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {getInitials(complaint.recipientName)}
        </Avatar>
        <div>
          <div className="font-semibold text-gray-800 text-base">{complaint.recipientName}</div>
          <div className="text-xs text-gray-400">{complaint.recipientRole}</div>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className="text-xs font-normal text-gray-500 bg-gray-50 border border-gray-200 rounded px-2 py-0.5"
              style={{ letterSpacing: "0.04em" }}
            >
              {complaint.complaintId}
            </span>
            <span
              className="text-xs font-normal rounded px-2 py-0.5"
              style={{ backgroundColor: categoryStyle.bg, color: categoryStyle.color }}
            >
              {complaint.category}
            </span>
            <ComplaintStatusTag status={complaint.status} />
          </div>
        </div>
      </div>

      <Divider style={{ margin: "0" }} />

      {/* ── Info gray card — matches ComplaintCard grid bottom section ── */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">

        {/* Row 1 — 2 equal columns */}
        <div className="grid grid-cols-2 divide-x divide-gray-200 py-3">

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>Category</span>
            <span
              style={{
                ...cellValue,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {complaint.category}
            </span>
          </div>

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>Complain Of</span>
            <div className="flex items-center gap-1 justify-center">
              <Avatar
                size={16}
                style={{
                  backgroundColor: getAvatarColor(complaint.complainOf?.name || ""),
                  fontSize: 7,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {getInitials(complaint.complainOf?.name || "")}
              </Avatar>
              <span
                style={{
                  ...cellValue,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {complaint.complainOf?.name || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Row 2 — Create Date | Update Date */}
        <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-100 py-2">
          <div className="flex flex-col items-center gap-0.5 px-2">
            <span style={cellLabel}>Create Date</span>
            <span style={cellValue}>{complaint.createdAt}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 px-2">
            <span style={cellLabel}>Update Date</span>
            <span style={cellValue}>{complaint.updatedAt}</span>
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
          {complaint.description}
        </p>
      </div>

      {/* ── Attachment ── */}
      {complaint.hasAttachment && (
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <PaperClipOutlined className="text-gray-400" />
          <span className="text-sm text-gray-600">
            Attachment.{complaint.attachmentType}
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
          {(complaint.approvers || []).map((approver) => (
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

export default ComplaintDetail;
