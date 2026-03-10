import React from "react";
import { Tag } from "antd";
import { BookOpen, Users, User, Clock, MapPin } from "lucide-react";

const ClassInfoCard = ({ classData }) => {
  return (
    <div className="bg-white rounded-lg border-2 p-4" style={{ borderColor: "var(--BlueHaze)" }}>
      <div className="mb-3 pb-3 border-b">
        <h3 className="font-bold text-lg text-gray-900" style={{ color: "var(--RoyalBlue)" }}>
          {classData.className}
        </h3>
        <p className="text-xs text-gray-500 mt-1">Level {classData.level} - Section {classData.section}</p>
      </div>

      {/* Student Info */}
      <div className="space-y-3 text-sm">
        <div>
          <div className="text-gray-600 text-xs mb-1">Student Name</div>
          <div className="font-semibold text-gray-900">{classData.studentName}</div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: "var(--BlueHaze)" }}>
          <User size={14} style={{ color: "var(--RoyalBlue)" }} />
          <div className="text-xs">
            <div className="text-gray-600">Class Teacher</div>
            <div className="font-semibold text-gray-900">{classData.classTeacher}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <MapPin size={14} style={{ color: "var(--blue-hosta)" }} />
          <span className="text-xs">{classData.classroom}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={14} style={{ color: "var(--medium-turquoise)" }} />
          <span className="text-xs">{classData.timings}</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-3 pt-3 border-t">
        <Tag color="success" className="w-full text-center">
          Active
        </Tag>
      </div>
    </div>
  );
};

export default ClassInfoCard;
