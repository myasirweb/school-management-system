import React, { useState } from "react";
import {
  Cell,
  Pie,
  ResponsiveContainer,
  PieChart,
  Tooltip as ReTooltip,
} from "recharts";
import { Select, Tooltip, Tabs, Typography, Button, Card } from "antd";

const { Title, Text } = Typography;

const attendanceData = [
  { name: "Present", value: 90.1, color: "#45C6EE" },
  { name: "Absent", value: 9.9, color: "#FED33C" },
];

const AttendanceChart = () => {
  const [activeTab, setActiveTab] = useState("Students");

  return (
    <Card
      bordered
      className="rounded-md shadow-sm"
      title={
        <span className="text-lg font-semibold text-black-olive">
      Attendance
    </span>
      }
    >
      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarGutter={40}
        className="[&_.ant-tabs-tab]:text-gray-500 
                   [&_.ant-tabs-tab:hover]:text-waikawa-grey 
                   [&_.ant-tabs-ink-bar]:bg-waikawa-grey 
                   [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-waikawa-grey"
        tabBarExtraContent={
          <Select
            defaultValue="Today"
            size="small"
            className="min-w-[90px] 
                       [&_.ant-select-selector]:border-none 
                       [&_.ant-select-selector]:bg-transparent 
                       [&_.ant-select-selector]:shadow-none 
                       [&_.ant-select-selection-item]:font-medium 
                       [&_.ant-select-arrow]:text-gray-400"
            options={[
              { value: "Today", label: "Today" },
              { value: "Weekly", label: "Weekly" },
              { value: "Monthly", label: "Monthly" },
            ]}
          />
        }
        items={[
          { label: "Students", key: "Students" },
          { label: "Teachers", key: "Teachers" },
          { label: "Staff", key: "Staff" },
        ]}
      />

      {/* Chart + Metrics */}
      <div className="flex flex-col lg:flex-row gap-7 mt-4">
        
        {/* Chart */}
        <div className="relative w-full h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="85%"
                dataKey="value"
                paddingAngle={3}
              >
                {attendanceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <ReTooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-3xl font-bold text-medium-turquoise">
              {attendanceData[0].value}%
            </p>
            <p className="text-[12px] tracking-wide uppercase text-gray-500">
              Attendance
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="w-full">
          <Title
            level={5}
            className="mb-3 font-semibold text-gray-600 !mb-3"
          >
            Key Metrics ({activeTab})
          </Title>

          {attendanceData.map((entry, i) => (
            <Tooltip key={i} title={`${entry.name}: ${entry.value}%`}>
              <div
                className="flex justify-between items-center p-3 mb-3 
                           rounded-md bg-white border border-gray-200 
                           hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: entry.color }}
                  ></span>
                  <Text>{entry.name}</Text>
                </div>
                <Text strong>{entry.value}%</Text>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-5">
        <Button className="bg-waikawa-grey text-white border-none px-5 py-2 rounded-md hover:bg-waikawa-grey/90">
          View All
        </Button>
      </div>
    </Card>
  );
};

export default AttendanceChart;
