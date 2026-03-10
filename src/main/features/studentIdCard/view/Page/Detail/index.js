import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FileTextOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import IdCard from "./IdCard";
import BasicInfo from "./BasicInfo";
import ParentsDetail from "./ParentsDetail";
import Courses from "./Courses";
import Timetable from "./Timetable";
import Attendance from "./Attendance";
import Leaves from "./Leaves";
import Fees from "./Fees";
import ExamResult from "./ExamResult";

const TABS = [
  { key: "idcard",     label: "ID Card",     icon: <IdcardOutlined /> },
  { key: "basic",      label: "Basic Info",   icon: <UserOutlined /> },
  { key: "parents",    label: "Parents",      icon: <TeamOutlined /> },
  { key: "courses",    label: "Courses",      icon: <BookOutlined /> },
  { key: "timetable",  label: "Timetable",    icon: <CalendarOutlined /> },
  { key: "attendance", label: "Attendance",   icon: <CheckCircleOutlined /> },
  { key: "leaves",     label: "Leaves",       icon: <ClockCircleOutlined /> },
  { key: "fees",       label: "Fees",         icon: <DollarOutlined /> },
  { key: "exams",      label: "Exam Result",  icon: <FileTextOutlined /> },
];

const SECTION_MAP = {
  idcard:     IdCard,
  basic:      BasicInfo,
  parents:    ParentsDetail,
  courses:    Courses,
  timetable:  Timetable,
  attendance: Attendance,
  leaves:     Leaves,
  fees:       Fees,
  exams:      ExamResult,
};

const Detail = ({ student, activeTab, onTabChange }) => {
  const ActiveSection = SECTION_MAP[activeTab] || IdCard;

  return (
    <div className="flex flex-col flex-1 bg-[#f6f6f9] h-full overflow-hidden">
      {/* Tab bar — gradient */}
      <div
        className="shrink-0 px-4 flex items-center gap-1 overflow-x-auto no-scrollbar"
        style={{
          background: "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))",
          minHeight: 44,
        }}
      >
        {TABS.map(({ key, label, icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onTabChange(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? "bg-white text-[rgb(82,107,177)] font-semibold"
                  : "text-white hover:bg-white/20"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {!student ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <IdcardOutlined style={{ fontSize: 52, color: "#d1d5db" }} />
            <p
              className="text-gray-400 text-sm"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Select a student to view details
            </p>
          </div>
        ) : (
          <ActiveSection student={student} />
        )}
      </div>
    </div>
  );
};

export default Detail;
