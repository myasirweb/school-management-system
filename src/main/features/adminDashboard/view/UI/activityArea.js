import React from "react";
import { Card, Tag, Progress, Avatar, Typography } from "antd";
import { Check } from "lucide-react";

const { Title, Text } = Typography;

const ActivityArea = () => {
  const subjects = ["Maths", "Physics", "Chemistry", "Botany", "English", "Spanish"];

  const activities = [
    { title: "1st place in 'Chess'", desc: "This event took place in Our School", icon: "🏆" },
    { title: "Participated in 'Carrom'", desc: "Justin Lee participated in 'Carrom'", icon: "♟️" },
    { title: "1st place in '100M'", desc: "This event took place in Our School", icon: "🏃" },
    { title: "International conference", desc: "We attended International conference", icon: "🌍" },
  ];

  const todos = [
    { task: "Send Reminder to Students", time: "01:00 PM", status: "Completed", color: "text-green-600 bg-green-100" },
    { task: "Create Routine to new staff", time: "04:50 PM", status: "In progress", color: "text-blue-600 bg-blue-100" },
    { task: "Extra Class Info to Students", time: "04:55 PM", status: "Yet to Start", color: "text-yellow-600 bg-yellow-100" },
    { task: "Fees for Upcoming Academics", time: "04:55 PM", status: "Yet to Start", color: "text-yellow-600 bg-yellow-100" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* =======================
          Top Subjects
      ======================== */}
      <Card
        bordered={false}
        className="rounded shadow-md h-full"
        title={<Title level={4} className="m-0">Top Subjects</Title>}
        extra={<span className="text-xs text-gray-500">Class 11</span>}
      >
        <div className="bg-green-50 p-3 rounded-lg border border-green-100 mb-5">
          <p className="text-[10px] text-green-700 leading-tight">
            These results are obtained from the syllabus completion on the respective Class
          </p>
        </div>

        <div className="space-y-4">
          {subjects.map((sub, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <Text className="text-xs text-gray-600">{sub}</Text>
              </div>
              <Progress
                percent={Math.floor(Math.random() * 60 + 20)}
                showInfo={false}
                strokeColor="#526BB1"
                trailColor="#f0f0f0"
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* =======================
          Student Activity
      ======================== */}
      <Card
        bordered={false}
        className="rounded shadow-md h-full"
        title={<Title level={4} className="m-0">Student Activity</Title>}
        extra={<span className="text-xs text-gray-500">This Month</span>}
      >
        <div className="space-y-6 mt-3">
          {activities.map((act, i) => (
            <div key={i} className="flex items-start space-x-3">
              <Avatar className="bg-gray-100 !text-lg">{act.icon}</Avatar>

              <div>
                <h5 className="text-sm font-semibold text-gray-900">{act.title}</h5>
                <p className="text-xs text-gray-500">{act.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* =======================
          Todo
      ======================== */}
      <Card
        bordered={false}
        className="rounded shadow-md h-full"
        title={<Title level={4} className="m-0">To-do List</Title>}
        extra={<span className="text-xs text-gray-500">Today</span>}
      >
        <div className="space-y-4 mt-2">
          {todos.map((todo, i) => (
            <div
              key={i}
              className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-none last:pb-0"
            >
              <div className="mt-1">
                {todo.status === "Completed" ? (
                  <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center text-white">
                    <Check size={10} />
                  </div>
                ) : (
                  <div className="w-4 h-4 border border-gray-300 rounded"></div>
                )}
              </div>

              <div className="flex-1">
                <h5
                  className={`text-sm font-medium ${
                    todo.status === "Completed"
                      ? "line-through text-gray-400"
                      : "text-gray-900"
                  }`}
                >
                  {todo.task}
                </h5>
                <p className="text-xs text-gray-400 mt-0.5">{todo.time}</p>
              </div>

              <Tag className={`rounded-md text-[10px] px-2 py-0.5 border-none ${todo.color}`}>
                {todo.status}
              </Tag>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};

export default ActivityArea;
