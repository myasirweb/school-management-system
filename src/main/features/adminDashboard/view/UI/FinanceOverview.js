import React from "react";
import { Card, Tag, Select, Button, Avatar, Typography } from "antd";
import { Check, X } from "lucide-react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

const { Option } = Select;
const { Title, Text } = Typography;

const feesData = [
  { name: "Q1", collected: 4000, total: 6000 },
  { name: "Q2", collected: 3000, total: 5500 },
  { name: "Q3", collected: 2000, total: 4000 },
  { name: "Q4", collected: 2780, total: 3908 },
  { name: "Q1", collected: 1890, total: 4800 },
  { name: "Q2", collected: 2390, total: 3800 },
  { name: "Q3", collected: 3490, total: 4300 },
];

const FinanceOverview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      
      {/* ================= FEES COLLECTION (ANTD CARD) ================ */}
      <Card
        bordered={false}
        className="rounded shadow-md lg:col-span-2"
        bodyStyle={{ padding: "24px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Title level={4} className="m-0 text-waikawa-grey">
            Fees Collection
          </Title>

          <Select
            size="small"
            defaultValue="8"
            className="!rounded-lg !border-smoke !bg-smoke"
          >
            <Option value="8">Last 8 Quarters</Option>
          </Select>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-6 text-xs text-gray-500 mb-4">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-medium-turquoise rounded-full mr-2"></span>
            Collected Fee
          </span>

          <span className="flex items-center">
            <span className="w-2 h-2 bg-primary-ref-tag rounded-full mr-2"></span>
            Total Fee
          </span>
        </div>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={feesData} barGap={4} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f4" />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
              />

              <RechartsTooltip cursor={{ fill: "transparent" }} />

              {/* Total */}
              <Bar dataKey="total" fill="#ededed" radius={[6, 6, 0, 0]} />

              {/* Collected */}
              <Bar dataKey="collected" fill="#45C6EE" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ================= LEAVE REQUESTS (ANTD CARD) ================ */}
      <Card
        bordered={false}
        className="rounded shadow-md"
        bodyStyle={{ padding: "24px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Title level={4} className="m-0 text-waikawa-grey">
            Leave Requests
          </Title>

          <Tag color="blue-hosta" className="!rounded-md !px-3">
            Today
          </Tag>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card
              key={i}
              className="rounded shadow-sm border border-smoke"
              bodyStyle={{ padding: "16px" }}
            >
              {/* Top Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                    size={44}
                    className="bg-smoke"
                  />

                  <div>
                    <Text className="text-sm font-semibold text-waikawa-grey flex items-center gap-2">
                      James
                      <Tag
                        color="vivid-cerise"
                        className="!px-2 !py-0 text-[10px] !rounded"
                      >
                        Emergency
                      </Tag>
                    </Text>

                    <p className="text-xs text-gray-500">Physics Teacher</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    shape="circle"
                    className="!bg-green-100 !border-none !text-green-600 hover:!bg-green-200"
                    icon={<Check size={14} />}
                  />

                  <Button
                    shape="circle"
                    className="!bg-red-100 !border-none !text-red-600 hover:!bg-red-200"
                    icon={<X size={14} />}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between text-[11px] text-gray-400 border-t border-smoke pt-2">
                <span>Leave: 12 - 13 May</span>
                <span>Applied: 12 May</span>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FinanceOverview;
