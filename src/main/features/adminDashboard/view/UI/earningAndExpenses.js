import React from "react";
import { Card, Tag, Row, Col, Typography, Avatar } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Text, Title } = Typography;

// Chart Data
const chartData = {
  earnings: [
    { month: "Jan", value: 3000 },
    { month: "Feb", value: 4000 },
    { month: "Mar", value: 3500 },
    { month: "Apr", value: 5000 },
    { month: "May", value: 4500 },
    { month: "Jun", value: 6000 },
  ],
  expenses: [
    { month: "Jan", value: 4500 },
    { month: "Feb", value: 3800 },
    { month: "Mar", value: 4200 },
    { month: "Apr", value: 3500 },
    { month: "May", value: 5200 },
    { month: "Jun", value: 4800 },
  ],
};

const CustomTooltip = ({ active, payload, label, type }) => {
  if (active && payload && payload.length) {
    const isEarnings = type === "earnings";
    const title = isEarnings ? "Earnings" : "Expenses";

    return (
      <div className="p-2 text-xs rounded-lg shadow-md font-semibold bg-white border border-waikawa-grey">
        <p className="text-gray-600 mb-0">{label}</p>
        <p className={isEarnings ? "text-waikawa-grey" : "text-vivid-cerise"}>
          {title}:{" "}
          {payload[0].value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          })}
        </p>
      </div>
    );
  }
  return null;
};

const MockChartCard = ({ amount, label, type }) => {
  const isEarnings = type === "earnings";
  const data = isEarnings ? chartData.earnings : chartData.expenses;

  const strokeColor = isEarnings ? "#526BB1" : "#DA1D81";
  const bgColor = isEarnings ? "bg-waikawa-grey" : "bg-vivid-cerise";
  const gradientId = isEarnings ? "earnGrad" : "expGrad";

  return (
    <Card
      bordered={false}
      className="rounded shadow-lg hover:shadow-2xl transition duration-300 h-full"
      bodyStyle={{ padding: "16px" }}   // 👈 Reduced padding
    >
      <div className="flex flex-col h-full">

        <Typography.Text className="text-gray-500 text-sm mb-1">
          {label}
        </Typography.Text>

        <Typography.Title level={2} className="my-0 font-extrabold text-gray-900">
          {amount}
        </Typography.Title>

        <div className="relative mt-4"> {/* 👈 Reduced top margin */}
          <ResponsiveContainer width="100%" height={100}> {/* 👈 Smaller height */}
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#000" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#000" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="month" hide />
              <Tooltip content={<CustomTooltip type={type} />} />

              <Area
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                strokeWidth={3}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: strokeColor,
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>

          <Avatar
            icon={<UserOutlined />}
            className={`!absolute !bottom-2 !right-2 text-white shadow-md ${bgColor}`}
            size="large"
          />
        </div>
      </div>
    </Card>
  );
};



const NoticeItem = ({ icon: Icon, title, date, days, color }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 transition duration-150 hover:bg-gray-50 -mx-6 px-6 cursor-pointer">
    <div className="flex items-center">
      <div className={`p-3 rounded-full mr-4 bg-[${color}]/15`}>
        <Icon className="text-xl" style={{ color }} />
      </div>

      <div className="flex flex-col">
        <Text strong className="text-gray-800 text-base">
          {title}
        </Text>
        <Text className="text-xs text-gray-500">Added on : {date}</Text>
      </div>
    </div>

    <Tag className="rounded-md text-xs font-semibold py-1.5 px-3 bg-primary-ref-tag text-gray-600 border-none shadow-sm">
      {days}
    </Tag>
  </div>
);

const NoticeBoardMock = () => {
  const notices = [
    { icon: FileTextOutlined, title: "New Syllabus Instructions", date: "11 Mar 2024", days: "20 Days", color: "#45C6EE" },
    { icon: CalendarOutlined, title: "World Environment Day Program", date: "21 Apr 2024", days: "15 Days", color: "#64C4B2" },
    { icon: ExclamationCircleOutlined, title: "Exam Preparation Notification", date: "13 Mar 2024", days: "12 Days", color: "#DA1D81" },
    { icon: ClockCircleOutlined, title: "Online Classes Preparation", date: "24 May 2024", days: "02 Days", color: "#526BB1" },
    { icon: CalendarOutlined, title: "Exam Time Table Release", date: "24 May 2024", days: "06 Days", color: "#FED33C" },
  ];

  return (
    <Card
  title={<Title level={4} className="my-0 text-gray-800 font-bold">Notice Board</Title>}
  bordered={false}
  extra={<span className="font-semibold text-waikawa-grey cursor-pointer">View All</span>}
  className="shadow-xl border-none rounded h-full flex flex-col"
  bodyStyle={{ padding: "0 20px 20px 20px" }}  
  headStyle={{ borderBottom: "1px solid #f0f0f0", padding: "14px 20px" }} 
>

      <div className="space-y-1">
        {notices.map((nt, i) => (
          <NoticeItem key={i} {...nt} />
        ))}
      </div>
    </Card>
  );
};

const EarningAndExpenses = () => {
  const financialStats = [
    { label: "Total Fees Collected", val: "$25,000.02", tag: "↑ 1.2%", color: "green" },
    { label: "Fine Collected Till Date", val: "$4,56.64", tag: "↓ 1.2%", color: "red" },
    { label: "Student Not Paid", val: "$545", tag: "↑ 1.2%", color: "blue" },
    { label: "Total Outstanding", val: "$4,56.64", tag: "↓ 1.2%", color: "red" },
  ];

  const getTagClasses = (color) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-600 border-green-300";
      case "red":
        return "bg-red-100 text-red-600 border-red-300";
      case "blue":
        return "bg-blue-100 text-blue-600 border-blue-300";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  return (
    <div className="mt-5 mb-5">
      <Row gutter={[24, 24]} className="items-stretch">
        {/* Charts */}
        <Col xs={24} lg={8} className="flex flex-col space-y-6">
          <MockChartCard amount="$64,522,24" label="Total Earnings" type="earnings" />
          <MockChartCard amount="$60,522,24" label="Total Expenses" type="expenses" />
        </Col>

        {/* Notice board */}
        <Col xs={24} lg={8}>
          <NoticeBoardMock />
        </Col>

        {/* Stats */}
        <Col xs={24} lg={8} className="flex flex-col space-y-6">
          {financialStats.map((item, i) => (
            <Card
              key={i}
              bordered={false}
              className="shadow-xl border-none rounded transition duration-300 hover:shadow-2xl"
            >
              <div className="flex justify-between items-start p-5">
                <div>
                  <Text className="text-sm text-gray-500 mb-1">{item.label}</Text>
                  <Title level={3} className="my-0 text-gray-900 font-extrabold">
                    {item.val}
                  </Title>
                </div>

                <Tag className={`py-1 px-3 text-xs font-bold rounded-md border ${getTagClasses(item.color)}`}>
                  {item.tag}
                </Tag>
              </div>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default EarningAndExpenses;
