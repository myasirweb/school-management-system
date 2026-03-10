import React from "react";
import { Card, Row, Col, Statistic, Divider } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const performanceData = [
  { name: "Top Performers", value: 45, color: "#45C6EE" },
  { name: "Average", value: 11, color: "#FED33C" },
  { name: "Below Average", value: 2, color: "#ff4d4f" },
];

const LegendItem = ({ name, value, color }) => (
  <div className="flex justify-between items-center p-3 rounded border border-gray-200 bg-white hover:bg-gray-50 transition">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
      <span className="text-sm font-medium text-gray-600">{name}</span>
    </div>
    <span className="text-lg font-bold text-gray-800">{value}</span>
  </div>
);

const StudentPerformance = () => {
  const totalValue = performanceData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card
      bordered={false}
      className="shadow-sm border border-gray-200 rounded"
      title={
        <h3 className="text-lg font-semibold text-[#202c4b] m-0">
          Student Performance Overview
        </h3>
      }
    >
      <Row gutter={[24, 24]} align="middle">
        {/* Chart Section */}
        <Col xs={24} md={12}>
          <div className="relative h-[220px] max-w-[240px] mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="90%"
                  paddingAngle={3}
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.color}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Percentage */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Statistic
                value={58}
                suffix="%"
                valueStyle={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#202c4b",
                }}
              />
            </div>
          </div>
        </Col>

        {/* Summary & Legend */}
        <Col xs={24} md={12}>
          <Statistic
            title={<span className="text-gray-500 font-medium">Total Students Tracked</span>}
            value={totalValue}
            valueStyle={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#202c4b",
            }}
            className="mb-2"
          />

          <Divider className="my-3" />

          <div className="flex flex-col gap-3">
            {performanceData.map((item, i) => (
              <LegendItem
                key={i}
                name={item.name}
                value={item.value}
                color={item.color}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default StudentPerformance;
