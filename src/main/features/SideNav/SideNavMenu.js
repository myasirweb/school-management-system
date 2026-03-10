import { menuConfig } from "./menuConfig";
import SideNavMenuSection from "./SideNavMenuSection";

const SideNavMenu = ({ isCollapsed }) => {
  return (
    <div
      className="flex-1 overflow-y-auto no-scrollbar py-2"
    >
      {menuConfig.map((section, idx) =>
        section.type === "section" ? (
          <SideNavMenuSection key={idx} section={section} isCollapsed={isCollapsed} />
        ) : null
      )}

      {/* Footer watermark */}
      {!isCollapsed && (
        <div className="px-4 pt-4 pb-3 text-center">
          <div
            className="text-[10px] text-gray-300 font-medium select-none"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            © 2026 Global School v1.0
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNavMenu;
