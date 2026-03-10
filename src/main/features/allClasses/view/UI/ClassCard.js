import React from "react";
import { Tag, Button } from "antd";
import { Users, User, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClassCard = ({ cls }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/allclasses/${cls.id}`)}
      className="bg-white border-2 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition cursor-pointer"
      style={{ borderColor: "var(--BlueHaze)" }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b" style={{ backgroundColor: "var(--BlueHaze)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">{cls.name}</h3>
            <p className="text-xs text-gray-600">Class {cls.level} Section {cls.section}</p>
          </div>
          <Tag color="success">Active</Tag>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Teacher */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b">
          <User size={16} style={{ color: "var(--RoyalBlue)" }} />
          <div className="text-sm">
            <div className="text-gray-500 text-xs">Class Teacher</div>
            <div className="font-semibold text-gray-900">{cls.classTeacher}</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-50 rounded p-3">
            <div className="flex items-center gap-1 mb-1">
              <Users size={14} style={{ color: "var(--blue-hosta)" }} />
              <div className="text-[11px] text-gray-500">Students</div>
            </div>
            <div className="font-bold text-gray-900">
              {cls.studentCount}/{cls.totalStrength}
            </div>
          </div>

          <div className="bg-gray-50 rounded p-3">
            <div className="flex items-center gap-1 mb-1">
              <Clock size={14} style={{ color: "var(--medium-turquoise)" }} />
              <div className="text-[11px] text-gray-500">Attendance</div>
            </div>
            <div className="font-bold" style={{ color: "var(--blue-hosta)" }}>
              {cls.averageAttendance}%
            </div>
          </div>
        </div>

        {/* Performance Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-600">Performance</span>
            <span className="font-bold" style={{ color: "var(--RoyalBlue)" }}>
              {cls.performance}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition"
              style={{
                width: `${cls.performance}%`,
                backgroundColor: "var(--RoyalBlue)",
              }}
            />
          </div>
        </div>

        {/* Room */}
        <div className="text-xs text-gray-600 py-2 border-t">
          <span className="font-medium">Room: </span>
          {cls.classroom}
        </div>

        {/* Footer Button */}
        <Button type="link" className="w-full" onClick={() => navigate(`/allclasses/${cls.id}`)}>
          View Details →
        </Button>
      </div>
    </div>
  );
};

export default ClassCard;
