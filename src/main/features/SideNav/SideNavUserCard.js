import { Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";

const SideNavUserCard = ({ isCollapsed }) => {
  if (isCollapsed) {
    return (
      <div className="px-0 py-3 border-b border-gray-100 flex justify-center">
        <Avatar
          size={36}
          style={{
            background: "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: 13,
            flexShrink: 0,
          }}
        >
          AN
        </Avatar>
      </div>
    );
  }

  return (
    <div className="px-3 py-3 border-b border-gray-100">
      <div
        className="rounded-xl px-3 py-2 flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
        style={{ background: "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))" }}
      >
        <Avatar
          size={36}
          style={{
            backgroundColor: "rgba(255,255,255,0.25)",
            color: "#fff",
            fontWeight: 700,
            fontFamily: "Montserrat, sans-serif",
            fontSize: 13,
            flexShrink: 0,
          }}
        >
          AN
        </Avatar>
        <div className="flex-1 min-w-0">
          <div
            className="text-sm font-semibold text-white truncate leading-snug"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            MD.Yasir
          </div>
          <div className="text-xs text-white/80 leading-snug">Administrator</div>
        </div>
        <DownOutlined style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", flexShrink: 0 }} />
      </div>
    </div>
  );
};

export default SideNavUserCard;
