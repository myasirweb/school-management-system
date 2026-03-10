import { Avatar, Tag, Button } from "antd";
import SharedTable from "../../../../../../sharedComponents/SharedTable";

const STATUS_CONFIG = {
  present: { color: "rgb(100,196,178)", label: "Present" },
  absent:  { color: "rgb(232,19,123)",  label: "Absent" },
  late:    { color: "rgb(247,212,71)",  label: "Late" },
  leave:   { color: "rgb(69,198,238)",  label: "Leave" },
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
  });
};

const getPctClass = (pct) => {
  if (pct >= 90) return "text-green-600";
  if (pct >= 75) return "text-yellow-600";
  return "text-red-500";
};

const columns = [
  {
    title: "User",
    key: "user",
    render: (_, r) => (
      <div className="flex items-center gap-3">
        <Avatar src={r.avatar} size={32} />
        <div>
          <div
            className="text-sm font-medium text-gray-800"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {r.studentName}
          </div>
          <div className="text-xs text-gray-400">{r.studentId}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => a.date.localeCompare(b.date),
    render: (v) => (
      <span
        className="text-sm text-gray-600"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {formatDate(v)}
      </span>
    ),
  },
  {
    title: "Check-In",
    dataIndex: "checkInTime",
    key: "checkInTime",
    render: (v) => (
      <span
        className="text-sm text-gray-700"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {v}
      </span>
    ),
  },
  {
    title: "Check-Out",
    dataIndex: "checkOutTime",
    key: "checkOutTime",
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
    title: "Class",
    dataIndex: "className",
    key: "className",
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
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v) => {
      const { color, label } = STATUS_CONFIG[v] || STATUS_CONFIG.present;
      return (
        <Tag
          style={{
            backgroundColor: color,
            color: "#fff",
            border: "none",
            fontFamily: "Montserrat, sans-serif",
            fontSize: 10,
            fontWeight: 600,
            padding: "1px 8px",
            borderRadius: 999,
          }}
        >
          {label}
        </Tag>
      );
    },
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
    render: (_, r) => (
      <Button
        type="link"
        size="small"
        onClick={r._onView}
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

const StudentTable = ({ records, onViewDetail, loading }) => {
  const dataSource = records.map((r) => ({ ...r, _onView: () => onViewDetail(r.id) }));
  return (
    <SharedTable
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="id"
      scroll={{ x: 900 }}
    />
  );
};

export default StudentTable;
