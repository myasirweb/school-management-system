import React from "react";
import { Tag, Progress, Button } from "antd";
import { useNavigate } from "react-router-dom";

const AssignCard = ({ a }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/assign/courses/${a.id}`)} className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden hover:shadow-md cursor-pointer">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div className="text-xs text-indigo-600 font-medium">{a.id}</div>
        <Tag color={a.status === "Completed" ? "green" : "blue"}>{a.status}</Tag>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900">{a.courseName}</h3>
        <p className="text-xs text-gray-500">{a.studentName}</p>

        <div className="mt-3 mb-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>Due</span>
            <span>{a.dueDate}</span>
          </div>
          <Progress percent={a.progress} size="small" strokeColor={a.progress >= 80 ? "#10b981" : "#f59e0b"} />
        </div>

        <div className="flex justify-end">
          <Button type="link" size="small">View</Button>
        </div>
      </div>
    </div>
  );
};

export default AssignCard;
