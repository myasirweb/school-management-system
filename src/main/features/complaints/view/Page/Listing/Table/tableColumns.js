import { EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Tooltip } from "antd";
import ComplaintStatusTag from "../../UI/ComplaintStatusTag";

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

export const tableColumns = (onView) => [
  {
    title: "Recipient",
    key: "recipient",
    width: 200,
    render: (_, r) => (
      <div className="flex items-center gap-3">
        <Avatar
          size={32}
          style={{
            backgroundColor: getAvatarColor(r.recipientName),
            fontWeight: 700,
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          {getInitials(r.recipientName)}
        </Avatar>
        <div>
          <div
            className="text-sm font-semibold text-gray-800"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {r.recipientName}
          </div>
          <div className="text-xs text-gray-400" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {r.recipientRole}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Complaint ID",
    dataIndex: "complaintId",
    key: "complaintId",
    width: 130,
    render: (v) => (
      <span
        className="text-xs font-semibold text-gray-500"
        style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}
      >
        {v}
      </span>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 180,
    render: (v) => {
      const s = CATEGORY_COLORS[v] || { bg: "#f3f4f6", color: "#6b7280" };
      return (
        <span
          className="text-xs font-semibold rounded px-2 py-0.5"
          style={{
            backgroundColor: s.bg,
            color: s.color,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {v}
        </span>
      );
    },
  },
  {
    title: "Complain Of",
    key: "complainOf",
    width: 160,
    render: (_, r) => (
      <div className="flex items-center gap-2">
        <Avatar
          size={24}
          style={{
            backgroundColor: getAvatarColor(r.complainOf?.name || ""),
            fontSize: 9,
            fontWeight: 700,
          }}
        >
          {getInitials(r.complainOf?.name || "")}
        </Avatar>
        <span
          className="text-xs text-gray-700"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {r.complainOf?.name || "—"}
        </span>
      </div>
    ),
  },
  {
    title: "Approvers",
    key: "approvers",
    width: 110,
    render: (_, r) => (
      <Avatar.Group maxCount={3} size={24}>
        {(r.approvers || []).map((a) => (
          <Tooltip key={a.id || a.name} title={`${a.name} (${a.role})`}>
            <Avatar
              size={24}
              style={{
                backgroundColor: getAvatarColor(a.name),
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              {getInitials(a.name)}
            </Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (v) => <ComplaintStatusTag status={v} />,
  },
  {
    title: "Create Date",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 120,
    render: (v) => (
      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#6b7280" }}>
        {v}
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    width: 80,
    align: "center",
    render: (_, r) => (
      <Button
        type="link"
        icon={<EyeOutlined />}
        onClick={() => onView(r.id)}
        style={{ color: "rgb(82,107,177)", padding: 0, fontFamily: "Montserrat, sans-serif" }}
      >
        View
      </Button>
    ),
  },
];
