import React from "react";
import { Tag, Button, Progress } from "antd";
import { BookOpen, User, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/mystudiedcourses/${course.id}`)}
      className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-indigo-50 to-blue-50">
        <span className="text-xs text-indigo-600 font-medium cursor-pointer flex items-center gap-1">
          <BookOpen size={14} /> {course.code}
        </span>

        <div className="flex items-center gap-2">
          <Tag color={course.status === "Active" ? "green" : "default"}>
            {course.status}
          </Tag>
          <button className="text-gray-400 hover:text-gray-600">⋮</button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Course Title */}
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-900">
            {course.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{course.semester}</p>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-md p-2 mb-3">
          <User size={14} className="text-indigo-600" />
          <div className="text-xs">
            <div className="text-gray-600">{course.instructor}</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">Progress</span>
            <span className="text-xs font-semibold text-gray-900">
              {course.progress}%
            </span>
          </div>
          <Progress
            percent={course.progress}
            strokeColor={
              course.progress >= 80 ? "#10b981" : "#f59e0b"
            }
            size="small"
          />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
          <div className="text-center">
            <div className="text-gray-500">Grade</div>
            <div className="text-gray-900 font-bold mt-1">
              {course.grade}
            </div>
          </div>

          <div className="text-center border-l border-r border-gray-200">
            <div className="text-gray-500">Credits</div>
            <div className="text-gray-900 font-bold mt-1">
              {course.credits}
            </div>
          </div>

          <div className="text-center">
            <div className="text-gray-500">Status</div>
            <div
              className={`text-[11px] px-2 py-[2px] rounded-full font-medium mt-1 inline-block ${
                course.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              ● {course.status === "Active" ? "Running" : "Done"}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-3 flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            {course.startDate} - {course.endDate}
          </span>
          <Button
            type="link"
            size="small"
            className="p-0 h-auto"
            onClick={() => navigate(`/mystudiedcourses/${course.id}`)}
          >
            View More →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
