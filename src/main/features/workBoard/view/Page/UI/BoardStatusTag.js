import { Tag } from "antd";

const STATUS_CONFIG = {
  Active:    { color: "#fff", bg: "rgb(100,196,178)", border: "rgb(100,196,178)", label: "Active"    },
  Archived:  { color: "#fff", bg: "#8c8c8c",          border: "#8c8c8c",          label: "Archived"  },
  "On Hold": { color: "#fff", bg: "rgb(247,212,71)",  border: "rgb(247,212,71)",  label: "On Hold"   },
  Completed: { color: "#fff", bg: "#52c41a",          border: "#52c41a",          label: "Completed" },
};

const BoardStatusTag = ({ status, style = {} }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Active"];
  return (
    <Tag
      style={{
        color: cfg.color,
        backgroundColor: cfg.bg,
        borderColor: cfg.border,
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 500,
        fontSize: 11,
        borderRadius: 20,
        padding: "1px 10px",
        margin: 0,
        ...style,
      }}
    >
      {cfg.label}
    </Tag>
  );
};

export default BoardStatusTag;
