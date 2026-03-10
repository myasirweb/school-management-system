import React from "react";
import { Table, Tag, Space, Button } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import classes from "../../../../utils/dummyClasses";

const ClassTable = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Class",
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="font-semibold">{name}</span>,
    },
    { title: "Level", dataIndex: "level", key: "level", width: 70 },
    { title: "Section", dataIndex: "section", key: "section", width: 80 },
    { title: "Class Teacher", dataIndex: "classTeacher", key: "teacher" },
    {
      title: "Students",
      dataIndex: "studentCount",
      key: "students",
      render: (count, record) => `${count}/${record.totalStrength}`,
      width: 90,
    },
    {
      title: "Attendance",
      dataIndex: "averageAttendance",
      key: "attendance",
      render: (att) => (
        <span className="font-medium" style={{ color: "var(--blue-hosta)" }}>
          {att}%
        </span>
      ),
      width: 100,
    },
    {
      title: "Performance",
      dataIndex: "performance",
      key: "performance",
      render: (p) => <Tag color={p >= 85 ? "success" : "processing"}>{p}%</Tag>,
      width: 110,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} onClick={() => navigate(`/allclasses/${record.id}`)} />
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table columns={columns} dataSource={classes.map((c) => ({ ...c, key: c.id }))} pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />
    </div>
  );
};

export default ClassTable;
