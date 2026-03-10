import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const SideDrawer = ({ visible, onClose, title, width = 480, children }) => (
  
  <Drawer
    open={visible}
    onClose={onClose}
    width={width}
    closable={false}
    title={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: 18,
            color: "rgb(82,107,177)",
          }}
        >
          {title}
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 6px",
            borderRadius: 6,
            color: "#9ca3af",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
        >
          <CloseOutlined style={{ fontSize: 14 }} />
        </button>
      </div>
    }
    styles={{
      body: { padding: "24px", fontFamily: "Montserrat, sans-serif" },
      header: { borderBottom: "1px solid #f0f0f0", padding: "14px 24px" },
    }}
    destroyOnClose
  >
    {children}
  </Drawer>
);

export default SideDrawer;
