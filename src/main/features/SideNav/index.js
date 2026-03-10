import { useState, useEffect } from "react";
import SideNavHeader   from "./SideNavHeader";
import SideNavUserCard from "./SideNavUserCard";
import SideNavMenu     from "./SideNavMenu";

export const COLLAPSED_WIDTH = 64;
export const EXPANDED_WIDTH  = 250;

const SideNav = ({ onWidthChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try { return localStorage.getItem("sidenav_collapsed") === "true"; }
    catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("sidenav_collapsed", String(isCollapsed)); } catch {}
    onWidthChange?.(isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH);
  }, [isCollapsed, onWidthChange]);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const width          = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return (
    <div
      className="fixed left-0 top-0 h-screen z-40 bg-white border-r border-gray-100 shadow-md flex flex-col transition-all duration-300 overflow-hidden"
      style={{ width }}
    >
      <SideNavHeader   isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
      <SideNavUserCard isCollapsed={isCollapsed} />
      <SideNavMenu     isCollapsed={isCollapsed} />
    </div>
  );
};

export default SideNav;
