import { useMemo } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import {
  UserOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import StatCard from "./UI/StatCard";
import TodayOverviewCard from "./UI/TodayOverviewCard";
import AttendanceSummaryCard from "./UI/AttendanceSummaryCard";
import RecentAbsencesCard from "./UI/RecentAbsencesCard";

const Overview = () => {
  const { todayAttendance, students } = useSelector((s) => s.attendance);

  const stats = [
    {
      title: "Students Present",
      value: todayAttendance?.studentsPresent,
      icon: <UserOutlined />,
      color: "rgb(100,196,178)",
      trend: 2,
      trendText: "vs yesterday",
    },
    {
      title: "Students Absent",
      value: todayAttendance?.studentsAbsent,
      icon: <CloseCircleOutlined />,
      color: "rgb(232,19,123)",
      trend: -1,
      trendText: "vs yesterday",
    },
    {
      title: "Students Late",
      value: todayAttendance?.studentsLate,
      icon: <ClockCircleOutlined />,
      color: "rgb(247,212,71)",
      trend: 0,
      trendText: "same as yesterday",
    },
    {
      title: "Teachers Present",
      value: todayAttendance?.teachersPresent,
      icon: <TeamOutlined />,
      color: "rgb(82,107,177)",
      trend: 1,
      trendText: "vs yesterday",
    },
  ];

  const recentAbsences = useMemo(() => {
    return students
      .filter((s) => s.absentDays > 0)
      .slice(0, 6)
      .map((s) => ({
        studentId: s.id,
        name: s.name,
        avatar: s.avatar,
        className: s.className,
        date: "Today",
      }));
  }, [students]);

  const handleNotifyParent = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    message.success(
      `Parent notification sent for ${student?.name || "student"}!`
    );
  };

  if (!todayAttendance) return null;

  return (
    <div className="flex flex-col gap-5">
      {/* Stat cards row */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Main content row */}
      <div className="flex gap-5 items-start">
        {/* Left — today overview + class table */}
        <div className="flex-1 min-w-0">
          <TodayOverviewCard
            todayData={todayAttendance}
            classWiseData={todayAttendance.classWiseData}
          />
        </div>

        {/* Right — summary circles + absences */}
        <div className="w-72 flex flex-col gap-5 shrink-0">
          <AttendanceSummaryCard
            studentsPresent={todayAttendance.studentsPresent}
            studentsAbsent={todayAttendance.studentsAbsent}
            teachersPresent={todayAttendance.teachersPresent}
            teachersAbsent={todayAttendance.teachersAbsent}
            totals={{
              students: todayAttendance.totalStudents,
              teachers: todayAttendance.totalTeachers,
            }}
          />
          <RecentAbsencesCard
            absences={recentAbsences}
            onNotifyParent={handleNotifyParent}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
