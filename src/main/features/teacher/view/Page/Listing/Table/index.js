import React from "react";
import { Table, Tag, Button, Space, Avatar } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import teachers from "../../../../utils/dummyTeachers";

const TeacherTable = () => {
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <span className="font-medium">{record.name}</span>
        </Space>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === "Active" ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>),
    },
    {
      title: "Date of Join",
      dataIndex: "joinDate",
      key: "joinDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button danger icon={<DeleteOutlined />} />
          <Button type="primary">Assign Class</Button>
        </Space>
      ),
    },
  ];

  const dataSource = teachers.map((t) => ({
    key: t.id,
    employeeId: t.id,
    name: t.name,
    avatar: t.avatar,
    subject: t.subject,
    department: t.department || "-",
    status: t.status,
    joinDate: t.joinedOn,
  }));

  return (
    <div className="bg-white rounded border shadow-sm">
      <Table columns={columns} dataSource={dataSource} bordered pagination={{ pageSize: 10 }} scroll={{ x: 1000 }} />
    </div>
  );
};

export default TeacherTable;
