import { Tag } from "antd";

const STATUS_CONFIG = {
  Approved:     { color: "#16a34a",         bg: "#f0fdf4", border: "#bbf7d0", label: "Approved"    },
  Declined:     { color: "#dc2626",         bg: "#fef2f2", border: "#fecaca", label: "Declined"    },
  "In Process": { color: "rgb(82,107,177)", bg: "#eff6ff", border: "#c7d0f8", label: "In Process"  },
  Pending:      { color: "#ca8a04",         bg: "#fefce8", border: "#fde68a", label: "Pending"     },
};

const WarningStatusTag = ({ status, style = {} }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <Tag
      style={{
        color: cfg.color,
        backgroundColor: cfg.bg,
        borderColor: cfg.border,
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 600,
        fontSize: 11,
        borderRadius: 20,
        padding: "1px 10px",
        ...style,
      }}
    >
      {cfg.label}
    </Tag>
  );
};

export default WarningStatusTag;
