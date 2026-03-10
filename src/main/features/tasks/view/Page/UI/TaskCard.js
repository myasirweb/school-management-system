import { Avatar, Progress, Rate, Tag, Tooltip } from "antd";
import {
  BellOutlined,
  CalendarOutlined,
  ShareAltOutlined,
  UserOutlined,
  EyeOutlined,
  TeamOutlined,
  BookOutlined,
  ReadOutlined,
  FolderOutlined,
  ApartmentOutlined,
  SwapRightOutlined,
  MessageOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import TaskStatusTag from "./TaskStatusTag";

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

/* ── type config ─────────────────────────────────────────── */
const TYPE_CONFIG = {
  General:   { bg: "bg-blue-50",   text: "text-blue-600",   icon: <CalendarOutlined /> },
  Project:   { bg: "bg-green-50",  text: "text-green-600",  icon: <FolderOutlined />   },
  Group:     { bg: "bg-purple-50", text: "text-purple-600", icon: <TeamOutlined />     },
  Homework:  { bg: "bg-orange-50", text: "text-orange-600", icon: <BookOutlined />     },
  Classwork: { bg: "bg-teal-50",   text: "text-teal-600",   icon: <ReadOutlined />     },
};

/* ── defaultStatus config ────────────────────────────────── */
const DEFAULT_STATUS_CONFIG = {
  Default: { bg: "#eef1fd", color: SCHOOL_BLUE, border: "#c7d0f8" },
  Urgent:  { bg: "#fef2f2", color: "#dc2626",   border: "#fecaca" },
  Normal:  { bg: "#f0fdf4", color: "#16a34a",   border: "#bbf7d0" },
};

/* ── priority badge colors ───────────────────────────────── */
const PRIORITY_COLOR = {
  Low:    { color: "#16a34a", bg: "#f0fdf4" },
  Medium: { color: "#ca8a04", bg: "#fefce8" },
  High:   { color: "#dc2626", bg: "#fef2f2" },
};

/* ── bottom info row ─────────────────────────────────────── */
const InfoRow = ({ icon, label, children }) => (
  <div className="flex items-center gap-1.5 py-1">
    <span style={{ color: "#9ca3af", fontSize: 13, flexShrink: 0 }}>{icon}</span>
    <span
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: 11,
        fontWeight: 400,
        color: "#9ca3af",
        flexShrink: 0,
      }}
    >
      {label}:
    </span>
    <span
      className="flex items-center gap-1 flex-1 min-w-0"
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: 11,
        fontWeight: 600,
        color: "#374151",
      }}
    >
      {children}
    </span>
  </div>
);

/* ── TaskCard ─────────────────────────────────────────────── */
const TaskCard = ({ task, onClick }) => {
  const typeConf = TYPE_CONFIG[task.type] || TYPE_CONFIG.General;
  const dsConf = DEFAULT_STATUS_CONFIG[task.defaultStatus] || DEFAULT_STATUS_CONFIG.Default;
  const prConf = PRIORITY_COLOR[task.priority] || PRIORITY_COLOR.Medium;

  return (
    <div
      onClick={() => onClick && onClick(task.id)}
      className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
      style={{ fontFamily: "Montserrat, sans-serif", backgroundColor: "#fff" }}
    >
      {/* ══ WHITE TOP SECTION ══════════════════════════════════ */}
      <div className="px-5 pt-4 pb-3 flex-1 flex flex-col">

        {/* Row 1 — avatar + name + icons/tags */}
        <div className="flex items-start justify-between gap-2">
          {/* Left: avatar with green dot + name/role/time */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <Avatar
                size={44}
                style={{
                  backgroundColor: getAvatarColor(task.creatorName),
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {getInitials(task.creatorName)}
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
                {task.creatorName}
              </div>
              <div
                className="text-xs text-gray-400 truncate"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {task.creatorRole}&nbsp;•&nbsp;{getTimeAgo(task.createDate)}
              </div>
            </div>
          </div>

          {/* Right: bell + taskId + status + defaultStatus + share */}
          <div className="flex items-center gap-1 flex-shrink-0 flex-wrap justify-end">
            <BellOutlined style={{ fontSize: 13, color: "#d1d5db" }} />
            <Tag
              style={{
                border: "1px solid #e5e7eb",
                color: "#6b7280",
                backgroundColor: "#fff",
                fontFamily: "Montserrat, sans-serif",
                fontSize: 10,
                fontWeight: 400,
                borderRadius: 6,
                padding: "0 5px",
                margin: 0,
                letterSpacing: "0.03em",
              }}
            >
              {task.taskId}
            </Tag>
            <TaskStatusTag status={task.status} />
            <Tag
              style={{
                backgroundColor: dsConf.bg,
                color: dsConf.color,
                borderColor: dsConf.border,
                fontFamily: "Montserrat, sans-serif",
                fontSize: 10,
                fontWeight: 500,
                borderRadius: 6,
                padding: "0 6px",
                margin: 0,
              }}
            >
              {task.defaultStatus}
            </Tag>
            <ShareAltOutlined style={{ fontSize: 13, color: "#9ca3af" }} />
          </div>
        </div>

        {/* Row 2 — subject */}
        <div
          className="mt-2 text-sm font-semibold text-gray-800"
          style={{
            fontFamily: "Montserrat, sans-serif",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {task.subject}
        </div>

        {/* Row 3 — type pill */}
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${typeConf.bg} ${typeConf.text}`}
          >
            {typeConf.icon}
            {task.type}
          </span>
          {/* priority badge */}
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
            style={{ backgroundColor: prConf.bg, color: prConf.color }}
          >
            {task.priority}
          </span>
        </div>

        {/* Row 4 — stars */}
        <div className="mt-3">
          <Rate
            disabled
            value={task.rating}
            style={{ fontSize: 13, color: "#facc15" }}
          />
        </div>

        {/* Row 5 — progress + completion% + subtasks count */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1">
            <Progress
              percent={task.completionPercentage}
              strokeColor={SCHOOL_BLUE}
              showInfo={false}
              size="small"
            />
          </div>
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: 11,
              color: "#9ca3af",
              flexShrink: 0,
            }}
          >
            {task.completionPercentage}%
          </span>
          <span
            className="flex items-center gap-0.5 flex-shrink-0"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: 11,
              color: "#9ca3af",
            }}
          >
            <MessageOutlined style={{ fontSize: 11 }} />
            {task.subTasks}
          </span>
        </div>
      </div>

      {/* ══ GRAY BOTTOM SECTION ════════════════════════════════ */}
      <div className="bg-gray-50 border-t border-gray-100 px-5 py-3">
        <div className="grid grid-cols-2 gap-x-4">
          {/* Left column */}
          <div>
            <InfoRow icon={<CalendarOutlined />} label="Date">
              <span className="truncate">
                {formatDate(task.taskDate?.start)} – {formatDate(task.taskDate?.end)}
              </span>
            </InfoRow>

            <InfoRow icon={<UserOutlined />} label="Assign To">
              <Avatar.Group maxCount={2} size={18}>
                {(task.assignTo || []).map((a, i) => (
                  <Tooltip key={i} title={a.name}>
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
              {task.assignTo?.length === 0 && <span className="text-gray-400">—</span>}
            </InfoRow>

            <InfoRow icon={<EyeOutlined />} label="Observers">
              {task.observers?.length > 0 ? (
                <Avatar.Group maxCount={2} size={18}>
                  {task.observers.map((o, i) => (
                    <Tooltip key={i} title={o.name}>
                      <Avatar
                        size={18}
                        style={{
                          backgroundColor: getAvatarColor(o.name),
                          fontSize: 7,
                          fontWeight: 700,
                        }}
                      >
                        {getInitials(o.name)}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </InfoRow>
          </div>

          {/* Right column */}
          <div>
            <InfoRow icon={<CalendarOutlined />} label="Create">
              {formatDate(task.createDate)}
            </InfoRow>

            <InfoRow icon={<CalendarOutlined />} label="Update">
              {formatDate(task.updateDate)}
            </InfoRow>

            <InfoRow icon={<ApartmentOutlined />} label="Sub-Tasks">
              <span>{task.subTasks}</span>
              <PlusOutlined style={{ fontSize: 9, color: SCHOOL_BLUE, marginLeft: 2 }} />
            </InfoRow>

            {task.predecessor && (
              <InfoRow icon={<SwapRightOutlined />} label="Predecessor">
                <span className="truncate">{task.predecessor}</span>
              </InfoRow>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
