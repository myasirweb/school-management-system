import React from "react";
import { Table, Tag, Button, Space, Avatar } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import students from "../../../../utils/dummyStudents";


const StudentTable = () => {
  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    {
      title: "Admission No",
      dataIndex: "admissionNo",
      key: "admissionNo",
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
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
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "Active" ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Date of Join",
      dataIndex: "joinDate",
      key: "joinDate",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button danger icon={<DeleteOutlined />} />
          <Button type="primary">Collect Fees</Button>
        </Space>
      ),
    },
  ];

  /* ---------------- DUMMY DATA MAPPING ---------------- */
  const dataSource = students.map((student) => {
    const [className, section] = student.classLabel.split(",");

    return {
      key: student.id,
      admissionNo: student.id,
      rollNo: student.roll,
      name: student.name,
      avatar: student.avatar,
      class: className?.trim(),
      section: section?.trim(),
      gender: student.gender,
      status: student.status,
      joinDate: student.joinedOn,
      dob: student.joinedOn,
    };
  });

  return (
    <div className="bg-white rounded border shadow-sm">
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default StudentTable;
