import { Avatar, Tag, Tooltip } from "antd";
import { StarOutlined, StarFilled, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleStar } from "../../../../store/groupsSlice";
import GroupStatusTag from "../../UI/GroupStatusTag";
import SharedTable from "../../../../../../sharedComponents/SharedTable";

const SCHOOL_BLUE = "rgb(82,107,177)";
const SCHOOL_PINK  = "rgb(232,19,123)";

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

const GroupsTable = ({ groups, loading = false }) => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Group",
      key: "group",
      width: 260,
      render: (_, r) => (
        <div className="flex items-center gap-3">
          <img
            src={r.coverImage}
            alt={r.name}
            style={{ width: 48, height: 32, borderRadius: 6, objectFit: "cover", flexShrink: 0 }}
            onError={(e) => {
              e.target.style.background = SCHOOL_BLUE;
              e.target.src = "";
            }}
          />
          <div className="min-w-0">
            <div
              className="text-sm font-semibold text-gray-800 truncate"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {r.name}
            </div>
            <div
              className="text-xs text-gray-400"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {r.code}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 130,
      render: (v) => <GroupStatusTag status={v} />,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (v) => (
        <Tag
          icon={v === "Private" ? <LockOutlined /> : <GlobalOutlined />}
          style={{
            backgroundColor: v === "Private" ? "#fef2f2" : "#f0fdf4",
            color:           v === "Private" ? SCHOOL_PINK : "#16a34a",
            borderColor:     v === "Private" ? "#fecaca" : "#bbf7d0",
            fontFamily: "Montserrat, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            borderRadius: 6,
            padding: "0 8px",
          }}
        >
          {v}
        </Tag>
      ),
    },
    {
      title: "Admin",
      key: "admin",
      width: 160,
      render: (_, r) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={24}
            style={{
              backgroundColor: getAvatarColor(r.adminUser?.name || ""),
              fontSize: 9,
              fontWeight: 700,
            }}
          >
            {getInitials(r.adminUser?.name || "")}
          </Avatar>
          <span
            className="text-sm text-gray-700"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {r.adminUser?.name || "—"}
          </span>
        </div>
      ),
    },
    {
      title: "Members",
      key: "members",
      width: 120,
      render: (_, r) => (
        <div className="flex items-center gap-2">
          <Avatar.Group maxCount={3} size="small">
            {(r.members || []).map((m, i) => (
              <Tooltip key={i} title={m.name}>
                <Avatar
                  size={22}
                  style={{
                    backgroundColor: getAvatarColor(m.name),
                    fontSize: 8,
                    fontWeight: 700,
                  }}
                >
                  {getInitials(m.name)}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
      ),
    },
    {
      title: "Count",
      dataIndex: "memberCount",
      key: "memberCount",
      width: 70,
      align: "center",
      render: (v) => (
        <span
          className="text-sm font-semibold text-gray-700"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {v}
        </span>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (v) => (
        <span
          className="text-sm text-gray-400"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {formatDate(v)}
        </span>
      ),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 110,
      render: (v) => (
        <span
          className="text-sm text-gray-400"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {getTimeAgo(v)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 70,
      align: "center",
      render: (_, r) => (
        <span
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleStar(r.id));
          }}
        >
          {r.isStarred ? (
            <StarFilled style={{ fontSize: 14, color: "#facc15", cursor: "pointer" }} />
          ) : (
            <StarOutlined style={{ fontSize: 14, color: "#9ca3af", cursor: "pointer" }} />
          )}
        </span>
      ),
    },
  ];

  return (
    <SharedTable
      columns={columns}
      dataSource={groups}
      loading={loading}
      rowKey="id"
      scroll={{ x: 1100 }}
      pagination={{ pageSize: 10 }}
      onRow={() => ({ style: { cursor: "pointer" } })}
    />
  );
};

export default GroupsTable;
