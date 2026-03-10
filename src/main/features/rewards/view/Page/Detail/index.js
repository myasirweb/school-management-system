import { Avatar, Button, Divider, Tooltip } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import RewardStatusTag from "../UI/RewardStatusTag";

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
  "Excellence Award":  { bg: "#eff6ff", color: "#2563eb" },
  "Best Performance":  { bg: "#f0fdf4", color: "#16a34a" },
  "Star Student":      { bg: "#fdf4ff", color: "#9333ea" },
  "Leadership Award":  { bg: "#fff7ed", color: "#ea580c" },
  "Innovation Award":  { bg: "#f0fdfa", color: "#0d9488" },
  "Attendance Award":  { bg: "#fefce8", color: "#ca8a04" },
};

const RESPONSE_COLOR = {
  approved: "#16a34a",
  declined: "#dc2626",
  pending:  "#ca8a04",
};

/* ── shared cell styles (same as RewardCard grid bottom section) ── */
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

const RewardDetail = ({ reward }) => {
  if (!reward) return null;
  const categoryStyle = CATEGORY_COLORS[reward.category] || { bg: "#f3f4f6", color: "#6b7280" };

  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "Montserrat, sans-serif" }}>

      {/* ── Applicant header ── */}
      <div className="flex items-center gap-4">
        <Avatar
          size={52}
          style={{
            backgroundColor: getAvatarColor(reward.recipientName),
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {getInitials(reward.recipientName)}
        </Avatar>
        <div>
          <div className="font-semibold text-gray-800 text-base">{reward.recipientName}</div>
          <div className="text-xs text-gray-400">{reward.recipientRole}</div>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className="text-xs font-normal text-gray-500 bg-gray-50 border border-gray-200 rounded px-2 py-0.5"
              style={{ letterSpacing: "0.04em" }}
            >
              {reward.rewardId}
            </span>
            <span
              className="text-xs font-normal rounded px-2 py-0.5"
              style={{ backgroundColor: categoryStyle.bg, color: categoryStyle.color }}
            >
              {reward.category}
            </span>
            <RewardStatusTag status={reward.status} />
          </div>
        </div>
      </div>

      <Divider style={{ margin: "0" }} />

      {/* ── Info gray card — matches RewardCard grid bottom section ── */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">

        {/* Row 1 — 6 equal columns */}
        <div className="grid grid-cols-6 divide-x divide-gray-200 py-3">

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
              {reward.category}
            </span>
          </div>

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>Reward Name</span>
            <span
              style={{
                ...cellValue,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {reward.name}
            </span>
          </div>

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>Reason</span>
            <span
              style={{
                ...cellValue,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {reward.reason}
            </span>
          </div>

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>Member</span>
            <div className="flex items-center gap-1 justify-center">
              <Avatar
                size={16}
                style={{
                  backgroundColor: getAvatarColor(reward.member?.name || ""),
                  fontSize: 7,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {getInitials(reward.member?.name || "")}
              </Avatar>
              <span
                style={{
                  ...cellValue,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {reward.member?.name?.split(" ")[0] || "—"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>Approvers</span>
            <Avatar.Group maxCount={2} size={18} style={{ marginTop: 1 }}>
              {reward.approvers.map((a) => (
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

          <div className="flex flex-col items-center gap-0.5 px-1">
            <span style={cellLabel}>Status</span>
            <div style={{ marginTop: 1 }}>
              <RewardStatusTag status={reward.status} />
            </div>
          </div>
        </div>

        {/* Row 2 — Create Date | Update Date */}
        <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-100 py-2">
          <div className="flex flex-col items-center gap-0.5 px-2">
            <span style={cellLabel}>Create Date</span>
            <span style={cellValue}>{reward.createdAt}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 px-2">
            <span style={cellLabel}>Update Date</span>
            <span style={cellValue}>{reward.updatedAt}</span>
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
          {reward.description}
        </p>
      </div>

      {/* ── Attachment ── */}
      {reward.hasAttachment && (
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <PaperClipOutlined className="text-gray-400" />
          <span className="text-sm text-gray-600">
            Attachment.{reward.attachmentType}
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
          {reward.approvers.map((approver) => (
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

export default RewardDetail;
