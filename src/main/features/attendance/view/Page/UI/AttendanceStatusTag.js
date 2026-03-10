import { Tag } from "antd";

const STATUS_CONFIG = {
  present: { label: "Present", bg: "rgb(100,196,178)" },
  absent:  { label: "Absent",  bg: "rgb(232,19,123)" },
  late:    { label: "Late",    bg: "rgb(247,212,71)" },
  leave:   { label: "Leave",   bg: "rgb(69,198,238)" },
};

const AttendanceStatusTag = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.present;
  return (
    <Tag
      style={{
        backgroundColor: config.bg,
        color: "#fff",
        border: "none",
        fontFamily: "Montserrat, sans-serif",
        fontSize: 10,
        fontWeight: 700,
        padding: "1px 8px",
        borderRadius: 999,
      }}
    >
      {config.label}
    </Tag>
  );
};

export default AttendanceStatusTag;
