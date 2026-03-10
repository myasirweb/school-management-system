import CalendarDayCell from "./CalendarDayCell";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = ({
  currentMonth,
  currentYear,
  attendanceData,
  onDayClick,
  selectedDate,
}) => {
  const today = new Date();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  /* Build cells array: nulls for offset + day numbers */
  const cells = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS_OF_WEEK.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold text-gray-400 py-1.5"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null)
            return <div key={`empty-${idx}`} className="min-h-[72px]" />;

          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isToday =
            today.getFullYear() === currentYear &&
            today.getMonth() === currentMonth &&
            today.getDate() === day;
          const isSelected = selectedDate === dateStr;
          const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const dayData = attendanceData[dateStr] || null;

          return (
            <CalendarDayCell
              key={dateStr}
              date={day}
              dayData={dayData}
              isToday={isToday}
              isSelected={isSelected}
              isWeekend={isWeekend}
              onClick={() => onDayClick(dateStr)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
