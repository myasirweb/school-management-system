import { Table } from "antd";
import AttendanceProgressBar from "../../UI/AttendanceProgressBar";

const columns = [
  {
    title: "Class",
    dataIndex: "className",
    key: "className",
    render: (v) => (
      <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "Montserrat, sans-serif" }}>
        {v}
      </span>
    ),
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    align: "center",
    render: (v) => <span className="text-sm text-gray-600">{v}</span>,
  },
  {
    title: "Present",
    dataIndex: "present",
    key: "present",
    align: "center",
    render: (v) => <span className="text-sm font-semibold" style={{ color: "rgb(100,196,178)" }}>{v}</span>,
  },
  {
    title: "Absent",
    dataIndex: "absent",
    key: "absent",
    align: "center",
    render: (v) => <span className="text-sm font-semibold" style={{ color: "rgb(232,19,123)" }}>{v}</span>,
  },
  {
    title: "Late",
    dataIndex: "late",
    key: "late",
    align: "center",
    render: (v) => <span className="text-sm font-semibold" style={{ color: "rgb(247,212,71)" }}>{v}</span>,
  },
  {
    title: "Attendance",
    dataIndex: "percentage",
    key: "percentage",
    render: (pct) => (
      <div style={{ minWidth: 100 }}>
        <AttendanceProgressBar percentage={pct} />
      </div>
    ),
  },
];

const TodayOverviewCard = ({ todayData, classWiseData }) => {
  if (!todayData) return null;

  const studentPct = Math.round((todayData.studentsPresent / todayData.totalStudents) * 100);
  const teacherPct = Math.round((todayData.teachersPresent / todayData.totalTeachers) * 100);

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 px-5 py-5"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
    >
      <div
        className="text-sm font-bold text-gray-700 mb-4"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Today's Overview
        <span className="ml-2 text-xs text-gray-400 font-normal">{todayData.date}</span>
      </div>

      {/* Progress rows */}
      <div className="flex flex-col gap-3 mb-5">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-500" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Students Present
            </span>
            <span className="text-xs font-bold text-gray-700" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {todayData.studentsPresent} / {todayData.totalStudents}
            </span>
          </div>
          <AttendanceProgressBar percentage={studentPct} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-500" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Teachers Present
            </span>
            <span className="text-xs font-bold text-gray-700" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {todayData.teachersPresent} / {todayData.totalTeachers}
            </span>
          </div>
          <AttendanceProgressBar percentage={teacherPct} />
        </div>
      </div>

      {/* Class-wise table */}
      <div
        className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Class-wise Breakdown
      </div>
      <Table
        columns={columns}
        dataSource={classWiseData || []}
        rowKey="className"
        pagination={false}
        size="small"
        className="attendance-table rounded-xl overflow-hidden"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        rowClassName="hover:bg-blue-50 transition-colors duration-150"
      />
    </div>
  );
};

export default TodayOverviewCard;
