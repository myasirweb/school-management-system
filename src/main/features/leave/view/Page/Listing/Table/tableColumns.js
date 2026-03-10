import { EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Tooltip } from "antd";
import LeaveStatusTag from "../../../UI/leaveStatusTag";
export const tableColumn = (   onView) => {

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
    const getAvatarColor = (name = "") => {
  const colors = [
    "rgb(100,196,178)",
    "rgb(69,198,238)",
    "rgb(82,107,177)",
    "rgb(232,19,123)",
    "rgb(247,212,71)",
  ];
  return colors[name.charCodeAt(0) % colors.length];
};
const TYPE_COLORS = {
  "Sick Leave":       { bg: "#fef2f2", color: "#dc2626" },
  "Annual Leave":     { bg: "#eff6ff", color: "#2563eb" },
  "Casual Leave":     { bg: "#f0fdf4", color: "#16a34a" },
  "Medical Leave":    { bg: "#fdf4ff", color: "#9333ea" },
  "Maternity Leave":  { bg: "#fff7ed", color: "#ea580c" },
  "Exam Leave":       { bg: "#f0fdfa", color: "#0d9488" },
  "Family Emergency": { bg: "#fefce8", color: "#ca8a04" },
};

    return[

         {
    title: "Applicant",
    key: "applicant",
    width: 200,
    render: (_, r) => (
      <div className="flex items-center gap-3">
        <Avatar
          size={32}
          style={{
            backgroundColor: getAvatarColor(r.applicantName),
            fontWeight: 700,
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          {getInitials(r.applicantName)}
        </Avatar>
        <div>
          <div
            className="text-sm font-semibold text-gray-800"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {r.applicantName}
          </div>
          <div className="text-xs text-gray-400">{r.applicantRole}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Reference No",
    dataIndex: "leaveId",
    key: "leaveId",
    width: 130,
    render: (v) => (
      <span
        className="text-xs font-semibold text-gray-500"
        style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}
      >
        {v}
      </span>
    ),
  },
  {
    title: "Category",
    dataIndex: "leaveType",
    key: "leaveType",
    width: 150,
    render: (v) => {
      const s = TYPE_COLORS[v] || { bg: "#f3f4f6", color: "#6b7280" };
      return (
        <span
          className="text-xs font-semibold rounded px-2 py-0.5"
          style={{
            backgroundColor: s.bg,
            color: s.color,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {v}
        </span>
      );
    },
  },
  {
    title: "Leave For",
    dataIndex: "leaveFor",
    key: "leaveFor",
    width: 100,
    render: (v) => (
      <span
        className="text-xs font-semibold text-gray-700 capitalize"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {v}
      </span>
    ),
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    width: 110,
    render: (v) => (
      <span className="text-xs text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
        {v}
      </span>
    ),
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    width: 110,
    render: (v) => (
      <span className="text-xs text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
        {v}
      </span>
    ),
  },
  {
    title: "Days",
    dataIndex: "days",
    key: "days",
    width: 70,
    align: "center",
    render: (v) => (
      <span className="text-xs font-bold text-gray-700" style={{ fontFamily: "Montserrat, sans-serif" }}>
        {v}
      </span>
    ),
  },
  {
    title: "Approvers",
    key: "approvers",
    width: 110,
    render: (_, r) => (
      <Avatar.Group maxCount={3} size={24}>
        {r.approvers.map((a) => (
          <Tooltip key={a.id} title={`${a.name} (${a.response})`}>
            <Avatar
              size={24}
              style={{
                backgroundColor: getAvatarColor(a.name),
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              {getInitials(a.name)}
            </Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 110,
    render: (v) => <LeaveStatusTag status={v} />,
  },
  {
    title: "Action",
    key: "action",
    width: 80,
    align: "center",
    render: (_, r) => (
      <Button
        type="link"
        icon={<EyeOutlined />}
        onClick={() => onView(r.id)}
        style={{ color: "rgb(82,107,177)", padding: 0, fontFamily: "Montserrat, sans-serif" }}
      >
        View
      </Button>
    ),
  },
];

}