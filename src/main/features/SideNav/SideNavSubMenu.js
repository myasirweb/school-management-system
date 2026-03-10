import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Popover } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { getIconComponent, isAncestorActive } from "./sideNavUtils";
import SideNavMenuItem from "./SideNavMenuItem";

const SCHOOL_BLUE = "rgb(82,107,177)";

const SideNavSubMenu = ({ item, isCollapsed }) => {
  const location        = useLocation();
  const hasActiveChild  = isAncestorActive(item, location.pathname);
  const [isOpen, setIsOpen] = useState(hasActiveChild);

  /* Auto-open when navigating to a child route */
  useEffect(() => {
    if (hasActiveChild) setIsOpen(true);
  }, [hasActiveChild]); // eslint-disable-line react-hooks/exhaustive-deps

  const IconComp = getIconComponent(item.icon);

  /* ── COLLAPSED: icon + hover popover with children ── */
  if (isCollapsed) {
    const popoverContent = (
      <div className="py-1 min-w-[180px]">
        <div
          className="text-[10px] font-semibold text-gray-400 px-3 pb-1.5 pt-1.5 uppercase tracking-widest"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {item.label}
        </div>
        {item.children.map((child) => {
          const ChildIcon   = getIconComponent(child.icon);
          const isChildActive = child.route && location.pathname.startsWith(child.route);
          return (
            <Link key={child.key} to={child.route} className="block">
              <div
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mx-1 my-0.5 cursor-pointer transition-colors ${
                  isChildActive ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                {ChildIcon && (
                  <ChildIcon style={{ fontSize: 14, color: isChildActive ? SCHOOL_BLUE : "#6b7280", flexShrink: 0 }} />
                )}
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: isChildActive ? SCHOOL_BLUE : "#374151",
                  }}
                >
                  {child.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    );

    return (
      <Popover
        content={popoverContent}
        placement="rightTop"
        trigger="hover"
        overlayInnerStyle={{ padding: 4, minWidth: 180 }}
      >
        <div
          className={`flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 mx-1 ${
            hasActiveChild ? "bg-blue-50" : "hover:bg-gray-50"
          }`}
          style={{ height: 40 }}
        >
          {IconComp && (
            <IconComp style={{ fontSize: 18, color: hasActiveChild ? SCHOOL_BLUE : "#6b7280" }} />
          )}
        </div>
      </Popover>
    );
  }

  /* ── EXPANDED ── */
  return (
    <div>
      {/* Parent row — acts as toggle */}
      <div
        className={`flex items-center mx-2 px-3 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${
          hasActiveChild
            ? "border-[rgb(82,107,177)] bg-blue-50"
            : "border-transparent hover:bg-gray-50"
        }`}
        style={{ height: 40 }}
        onClick={() => setIsOpen((p) => !p)}
      >
        {IconComp && (
          <IconComp
            style={{ fontSize: 18, color: hasActiveChild ? SCHOOL_BLUE : "#6b7280", flexShrink: 0 }}
          />
        )}
        <span
          className="ml-3 flex-1 truncate"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize:   13,
            fontWeight: 500,
            color:      hasActiveChild ? SCHOOL_BLUE : "#374151",
          }}
        >
          {item.label}
        </span>
        <RightOutlined
          style={{
            fontSize: 10,
            color:    "#9ca3af",
            flexShrink: 0,
            transition: "transform 200ms ease",
            transform:  isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </div>

      {/* Children */}
      {isOpen && (
        <div className="ml-6 pl-2 border-l border-gray-200 mt-0.5 mb-0.5">
          {item.children.map((child) => (
            <SideNavMenuItem key={child.key} item={child} isCollapsed={false} depth={1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideNavSubMenu;
