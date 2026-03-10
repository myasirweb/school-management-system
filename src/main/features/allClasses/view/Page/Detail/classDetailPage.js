import React, { useState } from "react";
import { Button, Breadcrumb, Divider, Tag, Progress } from "antd";
import { ArrowLeft, Users, User, Clock, BookOpen, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockClass = {
  id: "CLS001",
  name: "Class X-A",
  level: "10",
  section: "A",
  classTeacher: "Mr. Robert Smith",
  studentCount: 42,
  totalStrength: 45,
  classroom: "Block-B, Room 201",
  timings: "08:00 AM - 2:00 PM",
  startDate: "01 Aug 2024",
  endDate: "31 May 2025",
  status: "Active",
  averageAttendance: 92,
  performance: 85,
  subjects: ["Mathematics", "English", "Science", "History", "Geography"],
  totalStudents: 42,
  passedStudents: 40,
  avgMarks: 78,
};

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition">
    <h4 className="text-sm font-bold uppercase text-gray-800 mb-3" style={{ color: "var(--RoyalBlue)" }}>
      {title}
    </h4>
    {children}
  </div>
);

const ClassDetailPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");

  const tabs = [
    { key: "1", label: "Overview", icon: <BookOpen size={16} /> },
    { key: "2", label: "Subjects", icon: <Users size={16} /> },
    { key: "3", label: "Performance", icon: <TrendingUp size={16} /> },
  ];

  return (
    <div className="space-y-5">
      <Button type="text" icon={<ArrowLeft size={18} />} onClick={() => navigate(-1)}>
        Back
      </Button>

      <Breadcrumb items={[{ title: "Home" }, { title: "All Classes", onClick: () => navigate("/allclasses") }, { title: mockClass.name }]} />

      {/* Hero Card */}
      <div className="rounded-lg p-6" style={{ backgroundColor: "var(--BlueHaze)", borderLeft: "4px solid var(--RoyalBlue)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen size={28} style={{ color: "var(--RoyalBlue)" }} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{mockClass.name}</h1>
                <p className="text-gray-600">Level {mockClass.level} Section {mockClass.section}</p>
              </div>
            </div>
          </div>
          <Tag color="success" className="text-base px-3 py-1">
            {mockClass.status}
          </Tag>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SectionCard title="Total Students">
          <div className="text-3xl font-bold" style={{ color: "var(--blue-hosta)" }}>
            {mockClass.studentCount}/{mockClass.totalStrength}
          </div>
          <div className="text-xs text-gray-600 mt-2">
            <Progress percent={Math.round((mockClass.studentCount / mockClass.totalStrength) * 100)} size="small" />
          </div>
        </SectionCard>

        <SectionCard title="Attendance Rate">
          <div className="text-3xl font-bold" style={{ color: "var(--medium-turquoise)" }}>
            {mockClass.averageAttendance}%
          </div>
          <div className="text-xs text-gray-600 mt-2">Average attendance</div>
        </SectionCard>

        <SectionCard title="Performance">
          <div className="text-3xl font-bold" style={{ color: "var(--RoyalBlue)" }}>
            {mockClass.performance}%
          </div>
          <div className="text-xs text-gray-600 mt-2">Class average</div>
        </SectionCard>

        <SectionCard title="Class Teacher">
          <div className="flex items-center gap-2">
            <User size={20} style={{ color: "var(--RoyalBlue)" }} />
            <div className="text-sm font-semibold">{mockClass.classTeacher}</div>
          </div>
        </SectionCard>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-4 py-3 flex items-center gap-2 border-b-2 transition font-medium"
            style={{
              borderColor: activeTab === tab.key ? "var(--RoyalBlue)" : "transparent",
              color: activeTab === tab.key ? "var(--RoyalBlue)" : "#666",
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "1" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <SectionCard title="Class Information">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Classroom</span>
                  <span className="font-semibold">{mockClass.classroom}</span>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-600">Timings</span>
                  <span className="font-semibold">{mockClass.timings}</span>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-600">Academic Year</span>
                  <span className="font-semibold">
                    {mockClass.startDate} - {mockClass.endDate}
                  </span>
                </div>
              </div>
            </SectionCard>
          </div>

          <div>
            <SectionCard title="Quick Stats">
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-600 text-xs">Passed</div>
                  <div className="text-xl font-bold" style={{ color: "var(--blue-hosta)" }}>
                    {mockClass.passedStudents}/{mockClass.totalStudents}
                  </div>
                </div>
                <Divider className="my-2" />
                <div>
                  <div className="text-gray-600 text-xs">Average Marks</div>
                  <div className="text-xl font-bold" style={{ color: "var(--RoyalBlue)" }}>
                    {mockClass.avgMarks}%
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {activeTab === "2" && (
        <SectionCard title="Subjects Taught">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockClass.subjects.map((sub, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded">
                <BookOpen size={16} style={{ color: "var(--RoyalBlue)" }} />
                <span className="font-medium text-gray-900">{sub}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {activeTab === "3" && (
        <SectionCard title="Performance Metrics">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Class Performance</span>
                <span className="font-bold" style={{ color: "var(--RoyalBlue)" }}>
                  {mockClass.performance}%
                </span>
              </div>
              <Progress percent={mockClass.performance} strokeColor="var(--RoyalBlue)" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Attendance</span>
                <span className="font-bold" style={{ color: "var(--blue-hosta)" }}>
                  {mockClass.averageAttendance}%
                </span>
              </div>
              <Progress percent={mockClass.averageAttendance} strokeColor="var(--blue-hosta)" />
            </div>
          </div>
        </SectionCard>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button onClick={() => navigate(-1)}>Close</Button>
        <Button type="primary" style={{ backgroundColor: "var(--RoyalBlue)" }}>
          Edit Class
        </Button>
      </div>
    </div>
  );
};

export default ClassDetailPage;
