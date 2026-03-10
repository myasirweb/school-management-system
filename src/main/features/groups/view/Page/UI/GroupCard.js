import { Avatar, Tooltip } from "antd";
import {
  LockOutlined,
  StarOutlined,
  StarFilled,
  ReloadOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleStar } from "../../../store/groupsSlice";
import GroupStatusTag from "./GroupStatusTag";

const SCHOOL_BLUE  = "rgb(82,107,177)";
const SCHOOL_PINK  = "rgb(232,19,123)";
const SCHOOL_SKY   = "rgb(69,198,238)";

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
  if (!dateStr) return "—";
  const diffDays = Math.floor((Date.now() - new Date(dateStr + "T00:00:00")) / 86400000);
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

const GroupCard = ({ group }) => {
  const dispatch = useDispatch();

  const handleStarClick = (e) => {
    e.stopPropagation();
    dispatch(toggleStar(group.id));
  };

  return (
    <div
      className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer
                 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
      style={{ fontFamily: "Montserrat, sans-serif", backgroundColor: "#fff" }}
    >
      {/* ══ COVER IMAGE SECTION ════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ height: 110 }}>
        {group.coverImage ? (
          <img
            src={group.coverImage}
            alt={group.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : null}
        {/* Fallback gradient */}
        {!group.coverImage && (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${SCHOOL_PINK}, ${SCHOOL_SKY})`,
            }}
          />
        )}

        {/* Code pill — top left */}
        <div
          className="absolute top-2 left-2"
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 8,
            padding: "2px 8px",
          }}
        >
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: "#1f2937",
              letterSpacing: "0.04em",
            }}
          >
            {group.code}
          </span>
        </div>

        {/* Lock icon — top right (Private only) */}
        {group.type === "Private" && (
          <div
            className="absolute top-2 right-2"
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "50%",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LockOutlined style={{ fontSize: 11, color: "#374151" }} />
          </div>
        )}
      </div>

      {/* ══ CARD BODY ══════════════════════════════════════════ */}
      <div className="px-4 pt-3 pb-3 flex flex-col flex-1">

        {/* Row 1 — group name */}
        <div
          className="text-sm font-bold text-gray-900 truncate"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {group.name}
        </div>

        {/* Row 2 — category */}
        <div
          className="text-xs font-medium text-gray-400 mt-0.5"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {group.category}
        </div>

        {/* Row 3 — admin + status tag | member count + star */}
        <div className="flex items-center justify-between mt-2">
          {/* Left: admin avatar + status tag */}
          <div className="flex items-center gap-2">
            <Tooltip title={group.adminUser?.name}>
              <Avatar
                size={24}
                style={{
                  backgroundColor: getAvatarColor(group.adminUser?.name || ""),
                  fontWeight: 700,
                  fontSize: 9,
                  flexShrink: 0,
                }}
              >
                {getInitials(group.adminUser?.name || "")}
              </Avatar>
            </Tooltip>
            <GroupStatusTag status={group.category} />
          </div>

          {/* Right: member count + star */}
          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: "#9ca3af",
              }}
            >
              <TeamOutlined style={{ fontSize: 12 }} />
              {group.memberCount}
            </span>
            <span onClick={handleStarClick}>
              {group.isStarred ? (
                <StarFilled style={{ fontSize: 14, color: "#facc15", cursor: "pointer" }} />
              ) : (
                <StarOutlined
                  style={{ fontSize: 14, color: "#9ca3af", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#facc15")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                />
              )}
            </span>
          </div>
        </div>

        {/* Row 4 — members avatar group */}
        {(group.members || []).length > 0 && (
          <div className="mt-2">
            <Avatar.Group maxCount={4} size={20}>
              {group.members.map((m, i) => (
                <Tooltip key={i} title={m.name}>
                  <Avatar
                    size={20}
                    style={{
                      backgroundColor: getAvatarColor(m.name),
                      fontSize: 7,
                      fontWeight: 700,
                    }}
                  >
                    {getInitials(m.name)}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        )}

        {/* Row 5 — footer: created / updated */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
          {/* Left: created date */}
          <div className="flex items-center gap-1">
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 11,
                color: "#9ca3af",
              }}
            >
              Created:
            </span>
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: "#6b7280",
              }}
            >
              {formatDate(group.createdAt)}
            </span>
          </div>

          {/* Right: updated time ago */}
          <div className="flex items-center gap-1">
            <ReloadOutlined style={{ fontSize: 10, color: "#d1d5db" }} />
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 11,
                color: "#9ca3af",
              }}
            >
              {getTimeAgo(group.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
