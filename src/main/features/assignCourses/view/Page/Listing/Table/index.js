import React from "react";
import { Table, Tag, Space, Progress, Button } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import assignments from "../../../../utils/dummyAssignments";

const AssignTable = () => {
  const navigate = useNavigate();

  const columns = [
    { title: "Assignment ID", dataIndex: "id", key: "id" },
    { title: "Course", dataIndex: "courseName", key: "courseName" },
    { title: "Student", dataIndex: "studentName", key: "studentName" },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (p) => (
        <div className="flex items-center gap-2">
          <Progress percent={p} width={40} />
          <span>{p}%</span>
        </div>
      ),
      width: 140,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) => <Tag color={s === "Completed" ? "green" : "default"}>{s}</Tag>,
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} onClick={() => navigate(`/assign/courses/${record.id}`)} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table columns={columns} dataSource={assignments.map((a) => ({ ...a, key: a.id }))} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default AssignTable;
