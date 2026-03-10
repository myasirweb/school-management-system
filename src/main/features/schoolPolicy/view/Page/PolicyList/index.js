import { Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const CATEGORIES = ["All", "HR", "Academic", "Admin", "Finance", "Safety"];

const PolicyList = ({
  policies,
  activePolicyId,
  activeCategory,
  searchQuery,
  onSelectPolicy,
  onCategoryChange,
  onSearch,
}) => {
  return (
    <div
      className="flex flex-col border-r border-gray-100 bg-white h-full overflow-hidden"
      style={{ width: 340, flexShrink: 0 }}
    >
      {/* Panel header — gradient */}
      <div
        className="px-4 py-3 shrink-0"
        style={{
          background: "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))",
        }}
      >
        <span
          className="text-sm font-bold text-white"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Policies
        </span>
      </div>

      {/* Search input */}
      <div className="mx-3 my-3 shrink-0">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search policies..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="rounded-lg text-sm"
          style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}
        />
      </div>

      {/* Category filter pills — horizontally scrollable, no wrap */}
      <div className="flex flex-nowrap gap-2 px-3 py-2 overflow-x-auto no-scrollbar shrink-0">
        {CATEGORIES.map((cat) => {
          const key = cat.toLowerCase();
          const isActive = activeCategory === key;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(key)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                isActive
                  ? "bg-[rgb(82,107,177)] text-white border-transparent"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[rgb(82,107,177)] hover:text-[rgb(82,107,177)]"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Scrollable policy list */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-1">
        {policies.length === 0 ? (
          <div
            className="flex items-center justify-center h-32 text-sm text-gray-400"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            No policies found.
          </div>
        ) : (
          policies.map((policy) => {
            const isActive = policy.id === activePolicyId;
            return (
              <div
                key={policy.id}
                onClick={() => onSelectPolicy(policy.id)}
                className={`flex items-center gap-3 px-4 py-3 border-b border-gray-50 cursor-pointer transition-all duration-150 border-l-4 ${
                  isActive
                    ? "bg-blue-50 border-l-[rgb(82,107,177)]"
                    : "hover:bg-blue-50 border-l-transparent"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-semibold text-gray-800 truncate"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {policy.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    Effective: {policy.effectiveDate}
                  </div>
                </div>
                <Tag
                  style={{
                    backgroundColor: policy.tagColor,
                    color: "#fff",
                    border: "none",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "1px 8px",
                    borderRadius: 999,
                    lineHeight: "18px",
                  }}
                >
                  {policy.tag}
                </Tag>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PolicyList;
