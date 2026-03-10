import React from "react";
import { Card, Button } from "antd";
import { Settings, ChevronRight } from "lucide-react";

const QuickActions = () => {
  const actions = [
    { label: "View Attendance", bg: "#FEF9C3", color: "#CA8A04" }, // yellow-50 + yellow-700
    { label: "New Events", bg: "#ECFDF5", color: "#047857" },       // green-50 + green-700
    { label: "Membership Plans", bg: "#FEE2E2", color: "#B91C1C" },// red-50 + red-700
    { label: "Finance & Accounts", bg: "#ECFEFF", color: "#0E7490" },// cyan-50 + cyan-700
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {actions.map((item, i) => (
        <Card
          key={i}
          hoverable
          bordered={false}
          style={{
            background: item.bg,
            borderRadius: 16,
            padding: 0,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
          bodyStyle={{ padding: 16 }}
        >
          <Button
            type="text"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: item.color,
            }}
          >
            {/* LEFT SIDE */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  padding: 8,
                  borderRadius: 12,
                  background: "white",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                <Settings size={18} color={item.color} />
              </div>

              <span style={{ fontSize: 13, fontWeight: 600 }}>
                {item.label}
              </span>
            </div>

            {/* RIGHT ARROW */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              <ChevronRight size={16} color={item.color} />
            </div>
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default QuickActions;
