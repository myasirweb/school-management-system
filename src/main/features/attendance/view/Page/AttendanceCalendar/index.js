import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { setSelectedCalendarDate } from "../../../store/attendanceSlice";
import CalendarGrid from "./UI/CalendarGrid";
import DayDetailPanel from "./UI/DayDetailPanel";

const AttendanceCalendar = () => {
  const dispatch = useDispatch();
  const { students, selectedCalendarDate } = useSelector((s) => s.attendance);

  const [currentMonth, setCurrentMonth] = useState(0); // January
  const [currentYear, setCurrentYear] = useState(2025);

  /* Aggregate attendance data across all students by date */
  const attendanceData = useMemo(() => {
    const map = {};
    students.forEach((student) => {
      (student.dailyRecords || []).forEach((record) => {
        if (!map[record.date]) {
          map[record.date] = { present: 0, absent: 0, late: 0, leave: 0, absences: [] };
        }
        if (record.status === "present") map[record.date].present++;
        else if (record.status === "absent") {
          map[record.date].absent++;
          map[record.date].absences.push({
            name: student.name,
            avatar: student.avatar,
            className: student.className,
          });
        } else if (record.status === "late") map[record.date].late++;
        else if (record.status === "leave") map[record.date].leave++;
      });
    });
    return map;
  }, [students]);

  const dayDetails = selectedCalendarDate
    ? attendanceData[selectedCalendarDate] || {}
    : null;

  const monthName = new Date(currentYear, currentMonth, 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <div className="flex gap-5 items-start">
      {/* Calendar main panel */}
      <div
        className="flex-1 bg-white rounded-xl border border-gray-100 px-5 py-5"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-sm font-bold text-gray-700"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {monthName}
          </span>
          <div className="flex gap-2">
            <Button
              size="small"
              icon={<LeftOutlined />}
              onClick={handlePrevMonth}
              style={{ borderColor: "#e5e7eb" }}
            />
            <Button
              size="small"
              icon={<RightOutlined />}
              onClick={handleNextMonth}
              style={{ borderColor: "#e5e7eb" }}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-4">
          {[
            { label: "Present", color: "rgb(100,196,178)" },
            { label: "Absent",  color: "rgb(232,19,123)" },
            { label: "Late",    color: "rgb(247,212,71)" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span
                className="text-xs text-gray-500"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <CalendarGrid
          currentMonth={currentMonth}
          currentYear={currentYear}
          attendanceData={attendanceData}
          onDayClick={(date) => dispatch(setSelectedCalendarDate(date))}
          selectedDate={selectedCalendarDate}
        />
      </div>

      {/* Day detail side panel */}
      <div
        className="w-72 bg-white rounded-xl border border-gray-100 px-5 py-5 shrink-0"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        <div
          className="text-sm font-bold text-gray-700 mb-4"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Day Details
        </div>
        <DayDetailPanel
          selectedDate={selectedCalendarDate}
          dayDetails={dayDetails}
        />
      </div>
    </div>
  );
};

export default AttendanceCalendar;
