import { Avatar, Button, Divider, Progress, Rate, Tag, Tooltip } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  EyeOutlined,
  ApartmentOutlined,
  SwapRightOutlined,
  PaperClipOutlined,
  TeamOutlined,
  BookOutlined,
  ReadOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import TaskStatusTag from "../UI/TaskStatusTag";

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

const TYPE_CONFIG = {
  General:   { bg: "bg-blue-50",   text: "text-blue-600",   icon: <CalendarOutlined /> },
  Project:   { bg: "bg-green-50",  text: "text-green-600",  icon: <FolderOutlined />   },
  Group:     { bg: "bg-purple-50", text: "text-purple-600", icon: <TeamOutlined />     },
  Homework:  { bg: "bg-orange-50", text: "text-orange-600", icon: <BookOutlined />     },
  Classwork: { bg: "bg-teal-50",   text: "text-teal-600",   icon: <ReadOutlined />     },
};

const DEFAULT_STATUS_CONFIG = {
  Default: { bg: "#eef1fd", color: SCHOOL_BLUE, border: "#c7d0f8" },
  Urgent:  { bg: "#fef2f2", color: "#dc2626",   border: "#fecaca" },
  Normal:  { bg: "#f0fdf4", color: "#16a34a",   border: "#bbf7d0" },
};

const PRIORITY_CONFIG = {
  Low:    { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  Medium: { color: "#ca8a04", bg: "#fefce8", border: "#fde68a" },
  High:   { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
};

/* ── shared label/value styles ──────────────────────────── */
const InfoItem = ({ icon, label, children }) => (
  <div className="flex flex-col gap-0.5">
    <span
      className="flex items-center gap-1"
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: 11,
        fontWeight: 400,
        color: "#9ca3af",
      }}
    >
      {icon} {label}
    </span>
    <div
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: 13,
        fontWeight: 600,
        color: "#1f2937",
      }}
    >
      {children}
    </div>
  </div>
);

const TaskDetail = ({ task }) => {
  if (!task) return null;

  const typeConf = TYPE_CONFIG[task.type] || TYPE_CONFIG.General;
  const dsConf = DEFAULT_STATUS_CONFIG[task.defaultStatus] || DEFAULT_STATUS_CONFIG.Default;
  const prConf = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.Medium;

  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "Montserrat, sans-serif" }}>

      {/* ── Creator header ── */}
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <Avatar
            size={52}
            style={{
              backgroundColor: getAvatarColor(task.creatorName),
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {getInitials(task.creatorName)}
          </Avatar>
          <span
            className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full"
            style={{ border: "2px solid #fff" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-800 text-base">{task.creatorName}</div>
          <div className="text-xs text-gray-400">
            {task.creatorRole}&nbsp;•&nbsp;{getTimeAgo(task.createDate)}
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span
              className="text-xs font-normal text-gray-500 bg-gray-50 border border-gray-200 rounded px-2 py-0.5"
              style={{ letterSpacing: "0.04em" }}
            >
              {task.taskId}
            </span>
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
          </div>
        </div>
      </div>

      <Divider style={{ margin: "0" }} />

      {/* ── Subject + type + description ── */}
      <div>
        <div
          className="text-lg font-bold text-gray-900"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {task.subject}
        </div>
        <div className="mt-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${typeConf.bg} ${typeConf.text}`}
          >
            {typeConf.icon}
            {task.type}
          </span>
        </div>
        <p
          className="text-sm text-gray-600 mt-3 leading-relaxed"
          style={{ margin: "12px 0 0 0" }}
        >
          {task.description}
        </p>
      </div>

      {/* ── Rating + Progress ── */}
      <div>
        <Rate
          disabled
          value={task.rating}
          style={{ fontSize: 14, color: "#facc15" }}
        />
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1">
            <Progress
              percent={task.completionPercentage}
              strokeColor={SCHOOL_BLUE}
              showInfo={false}
              size="small"
            />
          </div>
          <span style={{ fontSize: 12, color: "#9ca3af", flexShrink: 0 }}>
            {task.completionPercentage}%
          </span>
        </div>
      </div>

      <Divider style={{ margin: "0" }} />

      {/* ── Info gray card ── */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">

          <InfoItem icon={<CalendarOutlined style={{ fontSize: 11 }} />} label="Date Range">
            <span style={{ fontSize: 12 }}>
              {formatDate(task.taskDate?.start)} – {formatDate(task.taskDate?.end)}
            </span>
          </InfoItem>

          <InfoItem icon={<UserOutlined style={{ fontSize: 11 }} />} label="Priority">
            <Tag
              style={{
                backgroundColor: prConf.bg,
                color: prConf.color,
                borderColor: prConf.border,
                fontFamily: "Montserrat, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 6,
                padding: "0 8px",
                margin: 0,
              }}
            >
              {task.priority}
            </Tag>
          </InfoItem>

          <InfoItem icon={<UserOutlined style={{ fontSize: 11 }} />} label="Assign To">
            {task.assignTo?.length > 0 ? (
              <Avatar.Group maxCount={4} size={22}>
                {task.assignTo.map((a, i) => (
                  <Tooltip key={i} title={a.name}>
                    <Avatar
                      size={22}
                      style={{
                        backgroundColor: getAvatarColor(a.name),
                        fontSize: 8,
                        fontWeight: 700,
                      }}
                    >
                      {getInitials(a.name)}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            ) : (
              <span style={{ fontSize: 12, color: "#9ca3af" }}>—</span>
            )}
          </InfoItem>

          <InfoItem icon={<EyeOutlined style={{ fontSize: 11 }} />} label="Observers">
            {task.observers?.length > 0 ? (
              <Avatar.Group maxCount={4} size={22}>
                {task.observers.map((o, i) => (
                  <Tooltip key={i} title={o.name}>
                    <Avatar
                      size={22}
                      style={{
                        backgroundColor: getAvatarColor(o.name),
                        fontSize: 8,
                        fontWeight: 700,
                      }}
                    >
                      {getInitials(o.name)}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            ) : (
              <span style={{ fontSize: 12, color: "#9ca3af" }}>—</span>
            )}
          </InfoItem>

          <InfoItem icon={<CalendarOutlined style={{ fontSize: 11 }} />} label="Create Date">
            <span style={{ fontSize: 12 }}>{formatDate(task.createDate)}</span>
          </InfoItem>

          <InfoItem icon={<CalendarOutlined style={{ fontSize: 11 }} />} label="Update Date">
            <span style={{ fontSize: 12 }}>{formatDate(task.updateDate)}</span>
          </InfoItem>

          <InfoItem icon={<ApartmentOutlined style={{ fontSize: 11 }} />} label="Sub-Tasks">
            <span style={{ fontSize: 12 }}>{task.subTasks}</span>
          </InfoItem>

          {task.predecessor && (
            <InfoItem icon={<SwapRightOutlined style={{ fontSize: 11 }} />} label="Predecessor">
              <span style={{ fontSize: 12 }}>{task.predecessor}</span>
            </InfoItem>
          )}
        </div>
      </div>

      {/* ── Attachment ── */}
      {task.hasAttachment && (
        <>
          <Divider style={{ margin: "0" }} />
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <PaperClipOutlined className="text-gray-400" />
            <span className="text-sm text-gray-600">
              Attachment.{task.attachmentType}
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
        </>
      )}
    </div>
  );
};

export default TaskDetail;
