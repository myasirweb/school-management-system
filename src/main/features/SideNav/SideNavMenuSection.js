import SideNavMenuItem from "./SideNavMenuItem";
import SideNavSubMenu  from "./SideNavSubMenu";

const SideNavMenuSection = ({ section, isCollapsed }) => {
  return (
    <div className="mb-1">
      {/* Section label — hidden when collapsed; show a thin divider instead */}
      {!isCollapsed ? (
        <div
          className="px-4 pt-4 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest select-none"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {section.label}
        </div>
      ) : (
        <div className="mx-3 mt-3 mb-1 h-px bg-gray-100" />
      )}

      {section.items.map((item) =>
        item.children
          ? <SideNavSubMenu  key={item.key} item={item} isCollapsed={isCollapsed} />
          : <SideNavMenuItem key={item.key} item={item} isCollapsed={isCollapsed} />
      )}
    </div>
  );
};

export default SideNavMenuSection;
