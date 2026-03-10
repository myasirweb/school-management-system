import { Avatar, Badge, Tooltip } from "antd";
import { MessageOutlined, SearchOutlined } from "@ant-design/icons";

/* ── Current logged-in user ── */
const CURRENT_USER_AVATAR = "https://i.pravatar.cc/150?img=3";

/* ── Online users ── */
const ONLINE_USERS = [
  { id: "u1", initials: "AH", bg: "#807f7f", name: "Adam Harris" },
  { id: "u2", initials: "LV", bg: "#807f7f", name: "Laura Vance" },
  { id: "u3", initials: "AZ", bg: "#807f7f", name: "Alex Zheng" },
  { id: "u4", initials: "T",  bg: "#807f7f", name: "Tanya" },
  { id: "u5", initials: "HA", bg: "#807f7f", name: "Henry Adams" },
  { id: "u6", initials: "SS", bg: "#807f7f", name: "Sofia Sanz" },
  { id: "u7", initials: "FR", bg: "#807f7f", name: "Felix Ruiz" },
  { id: "u8", initials: "MR", bg: "#807f7f", name: "Maya Reeves" },
  { id: "u9", initials: "SA", bg: "#807f7f", name: "Sam Ahmed" },
];

/* ── Groups ── */
const GROUPS = [
  { id: "g1", initial: "M", bg: "#807f7f", badge: 3,   name: "Math Dept" },
  { id: "g2", initial: "S", bg: "#807f7f", badge: null, name: "Science Group" },
  { id: "g3", initial: "T", bg: "#807f7f", badge: 7,   name: "Teachers' Hub" },
  { id: "g4", initial: "A", bg: "#807f7f", badge: null, name: "Admin Team" },
  { id: "g5", initial: "P", bg: "#807f7f", badge: 1,   name: "Parents Forum" },
];

/* ── MessengerBar ── */
const MessengerBar = () => (
  <div className="h-screen w-[60px] bg-white flex flex-col items-center py-3 shrink-0 border-l border-gray-200 shadow-sm">

    {/* ── Main messenger action button ── */}
    <Tooltip title="Messenger" placement="left">
      <button
        type="button"
        className="w-10 h-10 rounded-xl transition-colors flex items-center justify-center mb-4 shrink-0"
        style={{ backgroundColor: "var(--color-blue)" }}
      >
        <MessageOutlined style={{ fontSize: 24, color: "#fff" }} />
      </button>
    </Tooltip>

    {/* ── Current user avatar ── */}
    <Tooltip title="You" placement="left">
      <div className="mb-4 shrink-0">
        <Badge dot color="green" offset={[-2, 34]}>
          <Avatar
            src={CURRENT_USER_AVATAR}
            size={38}
            className="cursor-pointer ring-2 ring-pink-400"
          />
        </Badge>
      </div>
    </Tooltip>

    {/* ── Thin separator ── */}
    <div className="w-8 h-px bg-gray-200 mb-3 shrink-0" />

    {/* ── Online users list (scrollable) ── */}
    <div className="flex-1 overflow-y-auto no-scrollbar w-full flex flex-col items-center gap-3 px-1">
      {ONLINE_USERS.map((user) => (
        <Tooltip key={user.id} title={user.name} placement="left">
          <Badge dot color="green" offset={[-2, 34]}>
            <Avatar
              size={38}
              style={{
                backgroundColor: user.bg,
                color: "#fff",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {user.initials}
            </Avatar>
          </Badge>
        </Tooltip>
      ))}
    </div>

    {/* ── Divider + Groups label ── */}
    <div className="w-full flex flex-col items-center my-3 shrink-0">
      <div className="w-8 h-px bg-gray-200 mb-2" />
      <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">
        Groups
      </span>
    </div>

    {/* ── Groups list ── */}
    <div className="flex flex-col items-center gap-3 mb-3 shrink-0">
      {GROUPS.map((group) => (
        <Tooltip key={group.id} title={group.name} placement="left">
          <Badge count={group.badge} size="small" offset={[-2, 2]}>
            <Avatar
              size={38}
              style={{
                backgroundColor: group.bg,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              {group.initial}
            </Avatar>
          </Badge>
        </Tooltip>
      ))}
    </div>

    {/* ── Bottom search button ── */}
    <div className="shrink-0 mt-auto">
      <div className="w-8 h-px bg-gray-200 mx-auto mb-3" />
      <Tooltip title="Search" placement="left">
        <button
          type="button"
          className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
        >
          <SearchOutlined style={{ fontSize: 16, color: "#6b7280" }} />
        </button>
      </Tooltip>
    </div>
  </div>
);

export default MessengerBar;
