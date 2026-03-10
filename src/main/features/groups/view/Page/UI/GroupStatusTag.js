import { Tag } from "antd";

const STATUS_CONFIG = {
  "Public":      { color: "#fff", bg: "rgb(100,196,178)", border: "rgb(100,196,178)", label: "Public"      },
  "Private":     { color: "#fff", bg: "rgb(232,19,123)",  border: "rgb(232,19,123)",  label: "Private"     },
  "Class Group": { color: "#fff", bg: "rgb(82,107,177)",  border: "rgb(82,107,177)",  label: "Class Group" },
  "Study Group": { color: "#fff", bg: "rgb(69,198,238)",  border: "rgb(69,198,238)",  label: "Study Group" },
  "Sports":      { color: "#fff", bg: "rgb(247,212,71)",  border: "rgb(247,212,71)",  label: "Sports"      },
  "Club":        { color: "#fff", bg: "#9333ea",          border: "#9333ea",          label: "Club"        },
};

const GroupStatusTag = ({ status, style = {} }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Public"];
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

export default GroupStatusTag;
