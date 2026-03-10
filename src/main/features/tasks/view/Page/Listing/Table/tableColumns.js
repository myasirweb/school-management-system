import { Avatar, Progress, Rate, Tooltip } from "antd";
import { CalendarOutlined, TeamOutlined, BookOutlined, ReadOutlined, FolderOutlined } from "@ant-design/icons";
import TaskStatusTag from "../../UI/TaskStatusTag";

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

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(",", "");
};

const TYPE_CONFIG = {
  General:   { bg: "bg-blue-50",   text: "text-blue-600",   icon: <CalendarOutlined /> },
  Project:   { bg: "bg-green-50",  text: "text-green-600",  icon: <FolderOutlined />   },
  Group:     { bg: "bg-purple-50", text: "text-purple-600", icon: <TeamOutlined />     },
  Homework:  { bg: "bg-orange-50", text: "text-orange-600", icon: <BookOutlined />     },
  Classwork: { bg: "bg-teal-50",   text: "text-teal-600",   icon: <ReadOutlined />     },
};

const PRIORITY_COLOR = {
  Low:    { color: "#16a34a", bg: "#f0fdf4" },
  Medium: { color: "#ca8a04", bg: "#fefce8" },
  High:   { color: "#dc2626", bg: "#fef2f2" },
};

export const tableColumns = (onView) => [
  {
    title: "Creator",
    key: "creator",
    width: 200,
    render: (_, r) => (
      <div className="flex items-center gap-3">
        <Avatar
          size={32}
          style={{
            backgroundColor: getAvatarColor(r.creatorName),
            fontWeight: 700,
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          {getInitials(r.creatorName)}
        </Avatar>
        <div>
          <div
            className="text-sm font-semibold text-gray-800"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {r.creatorName}
          </div>
          <div className="text-xs text-gray-400" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {r.creatorRole}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
    width: 220,
    render: (v) => (
      <span
        className="text-sm font-medium text-gray-800"
        style={{
          fontFamily: "Montserrat, sans-serif",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          maxWidth: 200,
        }}
      >
        {v}
      </span>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    width: 120,
    render: (v) => {
      const conf = TYPE_CONFIG[v] || TYPE_CONFIG.General;
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${conf.bg} ${conf.text}`}
        >
          {conf.icon}
          {v}
        </span>
      );
    },
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    width: 90,
    render: (v) => {
      const conf = PRIORITY_COLOR[v] || PRIORITY_COLOR.Medium;
      return (
        <span
          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{ backgroundColor: conf.bg, color: conf.color }}
        >
          {v}
        </span>
      );
    },
  },
  {
    title: "Assign To",
    key: "assignTo",
    width: 110,
    render: (_, r) => (
      <Avatar.Group maxCount={3} size={24}>
        {(r.assignTo || []).map((a, i) => (
          <Tooltip key={i} title={a.name}>
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
    render: (v) => <TaskStatusTag status={v} />,
  },
  {
    title: "Date",
    key: "date",
    width: 160,
    render: (_, r) => (
      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#6b7280" }}>
        {formatDate(r.taskDate?.start)} – {formatDate(r.taskDate?.end)}
      </span>
    ),
  },
  {
    title: "Completion",
    dataIndex: "completionPercentage",
    key: "completion",
    width: 130,
    render: (v) => (
      <div className="flex items-center gap-2">
        <div style={{ width: 70 }}>
          <Progress percent={v} strokeColor={SCHOOL_BLUE} showInfo={false} size="small" />
        </div>
        <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 11, color: "#9ca3af" }}>
          {v}%
        </span>
      </div>
    ),
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    width: 120,
    render: (v) => (
      <Rate disabled value={v} style={{ fontSize: 12, color: "#facc15" }} />
    ),
  },
  {
    title: "Create Date",
    dataIndex: "createDate",
    key: "createDate",
    width: 120,
    render: (v) => (
      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#6b7280" }}>
        {formatDate(v)}
      </span>
    ),
  },
];
