import { Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Sidebar = ({
  students,
  activeStudentId,
  searchQuery,
  onSelectStudent,
  onSearch,
}) => {
  return (
    <div
      className="flex flex-col border-r border-gray-100 bg-white h-full overflow-hidden"
      style={{ width: 300, flexShrink: 0 }}
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
          Students
        </span>
      </div>

      {/* Search input */}
      <div className="mx-3 my-3 shrink-0">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="rounded-lg text-sm"
          style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}
        />
      </div>

      {/* Scrollable student list */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-1">
        {students.length === 0 ? (
          <div
            className="flex items-center justify-center h-32 text-sm text-gray-400"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            No students found.
          </div>
        ) : (
          students.map((student) => {
            const isActive = student.id === activeStudentId;
            return (
              <div
                key={student.id}
                onClick={() => onSelectStudent(student.id)}
                className={`flex items-center gap-3 px-3 py-3 border-b border-gray-50 cursor-pointer transition-all duration-150 border-l-4 ${
                  isActive
                    ? "bg-blue-50 border-l-[rgb(82,107,177)]"
                    : "hover:bg-blue-50 border-l-transparent"
                }`}
              >
                <img
                  src={student.profilePhoto}
                  alt={student.fullName}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-semibold text-gray-800 truncate"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {student.fullName}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {student.className}
                  </div>
                </div>
                <Tag
                  style={{
                    backgroundColor:
                      student.status === "Active"
                        ? "rgb(34,197,94)"
                        : "rgb(156,163,175)",
                    color: "#fff",
                    border: "none",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: 999,
                  }}
                >
                  {student.status}
                </Tag>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;
