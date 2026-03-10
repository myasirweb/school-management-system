import { Link, useLocation } from "react-router-dom";
import { Badge, Tooltip } from "antd";
import { getIconComponent } from "./sideNavUtils";

const SCHOOL_BLUE = "rgb(82,107,177)";
const SCHOOL_PINK = "rgb(232,19,123)";

const SideNavMenuItem = ({ item, isCollapsed, depth = 0 }) => {
  const location  = useLocation();
  const IconComp  = getIconComponent(item.icon);
  const isActive  = !!item.route && location.pathname.startsWith(item.route);
  const isTopLevel = depth === 0;
  const itemH     = isTopLevel ? 40 : 36;
  const iconSize  = isTopLevel ? 18 : 15;

  /* ── COLLAPSED: icon only + Tooltip ── */
  if (isCollapsed) {
    const iconEl = (
      <div
        className={`flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 mx-1 ${
          isActive ? "bg-blue-50" : "hover:bg-gray-50"
        }`}
        style={{ height: itemH }}
      >
        {IconComp && (
          <IconComp style={{ fontSize: iconSize, color: isActive ? SCHOOL_BLUE : "#6b7280" }} />
        )}
      </div>
    );

    return (
      <Tooltip title={item.label} placement="right">
        {item.route ? <Link to={item.route} className="block">{iconEl}</Link> : iconEl}
      </Tooltip>
    );
  }

  /* ── EXPANDED ── */
  /* Top-level items use border-l-4 (transparent when inactive, colored when active).
     The border always occupies 4px so text alignment stays constant. */
  const containerCls = isTopLevel
    ? `flex items-center mx-2 px-3 rounded-lg cursor-pointer transition-all duration-200 border-l-4
       ${isActive
         ? "border-[rgb(82,107,177)] bg-blue-50"
         : "border-transparent hover:bg-gray-50"
       }`
    : `flex items-center mx-1 px-2.5 rounded-lg cursor-pointer transition-all duration-200
       ${isActive ? "bg-blue-50" : "hover:bg-gray-50"}`;

  const content = (
    <div className={containerCls} style={{ height: itemH }}>
      {IconComp && (
        <IconComp
          style={{ fontSize: iconSize, color: isActive ? SCHOOL_BLUE : "#6b7280", flexShrink: 0 }}
        />
      )}
      <span
        className={`${isTopLevel ? "ml-3" : "ml-2.5"} flex-1 truncate`}
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize:   isTopLevel ? 13 : 12.5,
          fontWeight: 500,
          color:      isActive ? SCHOOL_BLUE : "#374151",
        }}
      >
        {item.label}
      </span>
      {item.badge != null && isTopLevel && (
        <Badge
          count={item.badge}
          size="small"
          style={{ backgroundColor: SCHOOL_PINK, fontSize: 10 }}
        />
      )}
    </div>
  );

  return item.route ? <Link to={item.route} className="block">{content}</Link> : content;
};

export default SideNavMenuItem;
