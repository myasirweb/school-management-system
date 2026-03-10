import { Avatar, Button } from "antd";
import SharedTable from "../../../../../../sharedComponents/SharedTable";

const getPctClass = (pct) => {
  if (pct >= 90) return "text-green-600";
  if (pct >= 75) return "text-yellow-600";
  return "text-red-500";
};

const columns = [
  {
    title: "Teacher",
    key: "teacher",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <Avatar src={record.avatar} size={32} />
        <div>
          <div
            className="text-sm font-medium text-gray-800"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {record.name}
          </div>
          <div className="text-xs text-gray-400">{record.teacherId}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
    render: (v) => (
      <span
        className="text-sm text-gray-600"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {v}
      </span>
    ),
  },
  {
    title: "Present",
    dataIndex: "presentDays",
    key: "presentDays",
    align: "center",
    render: (v) => (
      <span
        className="text-sm font-semibold"
        style={{ color: "rgb(100,196,178)", fontFamily: "Montserrat, sans-serif" }}
      >
        {v}
      </span>
    ),
  },
  {
    title: "Absent",
    dataIndex: "absentDays",
    key: "absentDays",
    align: "center",
    render: (v) => (
      <span
        className="text-sm font-semibold"
        style={{ color: "rgb(232,19,123)", fontFamily: "Montserrat, sans-serif" }}
      >
        {v}
      </span>
    ),
  },
  {
    title: "Late",
    dataIndex: "lateDays",
    key: "lateDays",
    align: "center",
    render: (v) => (
      <span
        className="text-sm font-semibold"
        style={{ color: "rgb(247,212,71)", fontFamily: "Montserrat, sans-serif" }}
      >
        {v}
      </span>
    ),
  },
  {
    title: "Attendance %",
    dataIndex: "attendancePercentage",
    key: "attendancePercentage",
    sorter: (a, b) => a.attendancePercentage - b.attendancePercentage,
    render: (pct) => (
      <span
        className={`text-sm font-semibold ${getPctClass(pct)}`}
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {pct}%
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (_, record) => (
      <Button
        type="link"
        size="small"
        onClick={() => record._onView()}
        style={{
          color: "rgb(82,107,177)",
          fontFamily: "Montserrat, sans-serif",
          fontSize: 12,
          padding: 0,
        }}
      >
        View
      </Button>
    ),
  },
];

const TeacherTable = ({ teachers, onViewDetail, loading }) => {
  const dataSource = teachers.map((t) => ({ ...t, _onView: () => onViewDetail(t.id) }));
  return (
    <SharedTable
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="id"
    />
  );
};

export default TeacherTable;
