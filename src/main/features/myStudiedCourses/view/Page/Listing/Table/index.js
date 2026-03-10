import React from "react";
import { Table, Tag, Button, Space, Progress } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import courses from "../../../../utils/dummyCourses";

const CourseTable = () => {
  const navigate = useNavigate();

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    {
      title: "Course Code",
      dataIndex: "code",
      key: "code",
      width: 120,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress) => (
        <div className="flex items-center gap-2 w-full">
          <Progress
            type="circle"
            percent={progress}
            width={30}
            strokeColor={progress >= 80 ? "#10b981" : "#f59e0b"}
          />
          <span>{progress}%</span>
        </div>
      ),
      width: 120,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      render: (grade) => (
        <Tag color={grade === "A+" ? "gold" : "blue"}>{grade}</Tag>
      ),
      width: 80,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "default"}>
          {status}
        </Tag>
      ),
      width: 100,
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
      width: 130,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/mystudiedcourses/${record.id}`)}
            title="View"
          />
          <Button type="text" size="small" icon={<EditOutlined />} title="Edit" />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            title="Delete"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table
        columns={columns}
        dataSource={courses.map((c) => ({ ...c, key: c.id }))}
        pagination={{
          pageSize: 10,
          total: courses.length,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} courses`,
        }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default CourseTable;
