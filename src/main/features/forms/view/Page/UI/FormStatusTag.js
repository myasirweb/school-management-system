import { Tag } from "antd";

const STATUS_CONFIG = {
  "In Process": { color: "#fff", bg: "rgb(82,107,177)",  border: "rgb(82,107,177)",  label: "In Process" },
  "Approved":   { color: "#fff", bg: "#52c41a",          border: "#52c41a",          label: "Approved"   },
  "Declined":   { color: "#fff", bg: "#ff4d4f",          border: "#ff4d4f",          label: "Declined"   },
  "For Review": { color: "#fff", bg: "rgb(247,212,71)",  border: "rgb(247,212,71)",  label: "For Review" },
};

const FormStatusTag = ({ status, style = {} }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["In Process"];
  return (
    <Tag
      style={{
        color: cfg.color,
        backgroundColor: cfg.bg,
        borderColor: cfg.border,
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 500,
        fontSize: 11,
        borderRadius: 6,
        padding: "1px 8px",
        margin: 0,
        ...style,
      }}
    >
      {cfg.label}
    </Tag>
  );
};

export default FormStatusTag;
