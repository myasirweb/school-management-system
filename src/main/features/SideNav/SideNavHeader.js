import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const SideNavHeader = ({ isCollapsed, toggleCollapse }) => {
  return (
    <div className="h-16 shrink-0 border-b border-gray-100 relative flex items-center px-3">
      {isCollapsed ? (
        /* Collapsed: logo mark centered */
        <div className="flex-1 flex justify-center">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm select-none"
            style={{ background: "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))" }}
          >
            G
          </div>
        </div>
      ) : (
        /* Expanded: logo + school name */
        <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-8">
          <div
            className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white font-bold text-sm select-none"
            style={{ background: "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))" }}
          >
            G
          </div>
          <span
            className="text-sm font-bold text-gray-800 truncate"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Global School
          </span>
        </div>
      )}

      {/* Toggle button — always in top-right */}
      <button
        onClick={toggleCollapse}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed
          ? <MenuUnfoldOutlined style={{ fontSize: 14 }} />
          : <MenuFoldOutlined  style={{ fontSize: 14 }} />
        }
      </button>
    </div>
  );
};

export default SideNavHeader;
