import React, { useState } from "react";
import {
  Button,
  Divider,
  Tag,
  Breadcrumb,
  ConfigProvider,
  Progress,
} from "antd";
import {
  BookOpen,
  User,
  Calendar,
  Download,
  Award,
  Target,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------------- MOCK DATA ---------------- */
const courseData = {
  id: "CRS001",
  name: "Mathematics",
  code: "MATH101",
  instructor: "Dr. Sarah Johnson",
  instructorEmail: "sarah.johnson@school.edu",
  instructorPhone: "+1 555-0123",
  grade: "A",
  progress: 85,
  status: "Active",
  credits: 4,
  semester: "Fall 2024",
  startDate: "15 Aug 2024",
  endDate: "15 Dec 2024",
  description:
    "Advanced Mathematics course covering calculus, algebra, and advanced topics in pure mathematics.",
  midTermGrade: "A-",
  finalGrade: null,
  totalClasses: 40,
  classesAttended: 38,
  assessment: {
    quizzes: 92,
    assignments: 88,
    midTerm: 85,
    finalTerm: null,
  },
  documents: [
    "Syllabus.pdf",
    "Assignment1.pdf",
    "MidtermExam.pdf",
  ],
  prerequisites: ["Basic Algebra", "Trigonometry"],
  outcomes: [
    "Understanding of calculus concepts",
    "Problem-solving skills",
    "Mathematical reasoning",
    "Application of formulas",
  ],
};

/* ---------------- REUSABLE UI COMPONENTS ---------------- */
const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
    <div className="px-5 py-4 border-b border-gray-200">
      <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
        {title}
      </h4>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between py-3 border-b last:border-b-0">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={16} className="text-indigo-600" />}
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

const DetailField = ({ label, value, icon: Icon }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={16} className="text-indigo-600" />}
      <div className="text-[11px] uppercase text-gray-500 font-semibold">
        {label}
      </div>
    </div>
    <div className="text-[14px] font-semibold text-gray-800">{value}</div>
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */
const CourseDetailPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");

  const tabs = [
    { key: "1", label: "Overview", icon: <BookOpen size={16} /> },
    { key: "2", label: "Assessment", icon: <Award size={16} /> },
    { key: "3", label: "Attendance", icon: <Calendar size={16} /> },
    { key: "4", label: "Documents", icon: <Download size={16} /> },
    { key: "5", label: "Outcomes", icon: <Target size={16} /> },
  ];

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Button
          type="text"
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          Back
        </Button>
      </div>

      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { title: "Home", onClick: () => navigate("/") },
          {
            title: "Study Courses",
            onClick: () => navigate("/mystudiedcourses"),
          },
          { title: courseData.name },
        ]}
      />

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg p-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={28} />
            <div>
              <h1 className="text-2xl font-bold">{courseData.name}</h1>
              <p className="text-indigo-100">{courseData.code}</p>
            </div>
          </div>
          <p className="text-indigo-100 max-w-2xl">{courseData.description}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{courseData.grade}</div>
          <div className="text-indigo-100">Grade</div>
        </div>
      </div>

      {/* KEY STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SectionCard title="Progress">
          <div className="space-y-3">
            <Progress percent={courseData.progress} />
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {courseData.progress}%
              </div>
              <div className="text-xs text-gray-600">Course Completion</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Credits">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {courseData.credits}
            </div>
            <div className="text-xs text-gray-600 mt-2">Credit Hours</div>
          </div>
        </SectionCard>

        <SectionCard title="Attendance">
          <div className="space-y-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {courseData.classesAttended}/{courseData.totalClasses}
              </div>
              <div className="text-xs text-gray-600">Classes</div>
            </div>
            <Progress
              percent={Math.round(
                (courseData.classesAttended / courseData.totalClasses) * 100
              )}
              strokeColor="#10b981"
            />
          </div>
        </SectionCard>

        <SectionCard title="Duration">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={14} className="text-indigo-600" />
              <div>
                <div className="font-semibold text-gray-800">
                  {courseData.startDate}
                </div>
                <div className="text-xs text-gray-600">Start Date</div>
              </div>
            </div>
            <Divider className="my-2" />
            <div className="flex items-center gap-2 text-sm">
              <Clock size={14} className="text-red-600" />
              <div>
                <div className="font-semibold text-gray-800">
                  {courseData.endDate}
                </div>
                <div className="text-xs text-gray-600">End Date</div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* TABS */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 transition ${
              activeTab === tab.key
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div>
        {/* OVERVIEW TAB */}
        {activeTab === "1" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <SectionCard title="Course Information">
                <div className="space-y-4">
                  <InfoRow label="Course Code" value={courseData.code} />
                  <InfoRow label="Semester" value={courseData.semester} />
                  <InfoRow label="Status" value={courseData.status} />
                  <InfoRow label="Credits" value={`${courseData.credits} Hours`} />
                </div>
              </SectionCard>

              <SectionCard title="Instructor Information">
                <div className="space-y-4">
                  <InfoRow
                    label="Name"
                    value={courseData.instructor}
                    icon={User}
                  />
                  <InfoRow
                    label="Email"
                    value={courseData.instructorEmail}
                  />
                  <InfoRow
                    label="Phone"
                    value={courseData.instructorPhone}
                  />
                </div>
              </SectionCard>
            </div>

            <div className="space-y-4">
              <SectionCard title="Grade Information">
                <div className="space-y-3">
                  <DetailField
                    label="Current Grade"
                    value={courseData.grade}
                    icon={Award}
                  />
                  <Divider />
                  <DetailField
                    label="Mid Term"
                    value={courseData.midTermGrade}
                  />
                  <Divider />
                  <DetailField
                    label="Final Grade"
                    value={courseData.finalGrade || "Pending"}
                  />
                </div>
              </SectionCard>

              <SectionCard title="Prerequisites">
                <div className="space-y-2">
                  {courseData.prerequisites.map((pre, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <span className="text-sm text-gray-700">{pre}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        )}

        {/* ASSESSMENT TAB */}
        {activeTab === "2" && (
          <SectionCard title="Assessment Breakdown">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(courseData.assessment).map(
                ([key, value]) =>
                  value !== null && (
                    <div key={key} className="text-center">
                      <Progress
                        type="circle"
                        percent={value}
                        width={100}
                        strokeColor={
                          value >= 80
                            ? "#10b981"
                            : value >= 70
                            ? "#f59e0b"
                            : "#ef4444"
                        }
                      />
                      <div className="mt-3 capitalize font-semibold text-gray-900">
                        {key.replace(/([A-Z])/g, " $1")}
                      </div>
                    </div>
                  )
              )}
            </div>
          </SectionCard>
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === "3" && (
          <SectionCard title="Attendance Summary">
            <div className="space-y-6">
              <div className="text-center">
                <Progress
                  type="circle"
                  percent={Math.round(
                    (courseData.classesAttended / courseData.totalClasses) * 100
                  )}
                  width={150}
                  strokeColor="#3b82f6"
                />
                <div className="mt-4">
                  <div className="text-lg font-semibold text-gray-900">
                    {courseData.classesAttended} of {courseData.totalClasses}{" "}
                    Classes
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.round(
                      (courseData.classesAttended / courseData.totalClasses) *
                        100
                    )}
                    % Attendance Rate
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "4" && (
          <SectionCard title="Course Documents">
            <div className="space-y-2">
              {courseData.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Download size={18} className="text-indigo-600" />
                    <span className="font-medium text-gray-900">{doc}</span>
                  </div>
                  <Button
                    type="text"
                    size="small"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* OUTCOMES TAB */}
        {activeTab === "5" && (
          <SectionCard title="Learning Outcomes">
            <div className="space-y-3">
              {courseData.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{outcome}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 justify-end">
        <Button onClick={() => navigate(-1)}>Close</Button>
        <Button type="primary">Download Certificate</Button>
      </div>
    </div>
  );
};

export default CourseDetailPage;
