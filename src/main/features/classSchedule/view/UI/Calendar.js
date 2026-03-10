import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "antd";

const Calendar = ({ events, selectedDate, onSelectDate, currentMonth, onMonthChange, viewType, onViewChange }) => {

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const getEventTypesForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((e) => e.date === dateStr);
  };

  const getEventColor = (type) => {
    const colors = {
      class: "var(--blue-hosta)",
      exam: "var(--vivid-cerise)",
      break: "var(--medium-turquoise)",
      assignment: "var(--RoyalBlue)",
      holiday: "var(--bright-sun)",
      event: "var(--waikawa-grey)",
    };
    return colors[type] || "var(--RoyalBlue)";
  };

  const prevMonth = () => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const getWeekDays = () => {
    const today = selectedDate || new Date();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      weekDays.push(date);
    }
    return weekDays;
  };

  // Day View
  if (viewType === "day") {
    const dayEvents = selectedDate ? getEventTypesForDate(selectedDate) : [];
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button
              size="small"
              onClick={() => onViewChange("day")}
              style={{ backgroundColor: "var(--RoyalBlue)", color: "white" }}
            >
              Day
            </Button>
            <Button size="small" onClick={() => onViewChange("week")}>
              Week
            </Button>
            <Button size="small" onClick={() => onViewChange("month")}>
              Month
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              icon={<ChevronLeft size={18} />}
              onClick={() => {
                const prev = new Date(selectedDate);
                prev.setDate(prev.getDate() - 1);
                onSelectDate(prev);
              }}
              type="text"
              size="small"
            />
            <Button
              icon={<ChevronRight size={18} />}
              onClick={() => {
                const next = new Date(selectedDate);
                next.setDate(next.getDate() + 1);
                onSelectDate(next);
              }}
              type="text"
              size="small"
            />
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {selectedDate?.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h2>

        {dayEvents.length > 0 ? (
          <div className="space-y-3">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded border-l-4"
                style={{
                  borderColor: getEventColor(event.type),
                  backgroundColor:
                    event.type === "class"
                      ? "#f0fdfb"
                      : event.type === "exam"
                      ? "#fdf2f8"
                      : event.type === "break"
                      ? "#f0fef9"
                      : event.type === "assignment"
                      ? "#f3f4ff"
                      : event.type === "holiday"
                      ? "#fffbf0"
                      : "#f8f9ff",
                }}
              >
                <div className="font-semibold text-gray-900">{event.subject}</div>
                {event.time && <div className="text-sm text-gray-600 mt-1">🕐 {event.time}</div>}
                {event.teacher && <div className="text-sm text-gray-600">👨‍🏫 {event.teacher}</div>}
                {event.room && <div className="text-sm text-gray-600">📍 {event.room}</div>}
                {event.description && <div className="text-sm text-gray-700 mt-2 italic">{event.description}</div>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No events scheduled</p>
        )}
      </div>
    );
  }

  // Week View
  if (viewType === "week") {
    const weekDays = getWeekDays();
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button size="small" onClick={() => onViewChange("day")}>
              Day
            </Button>
            <Button
              size="small"
              onClick={() => onViewChange("week")}
              style={{ backgroundColor: "var(--RoyalBlue)", color: "white" }}
            >
              Week
            </Button>
            <Button size="small" onClick={() => onViewChange("month")}>
              Month
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              icon={<ChevronLeft size={18} />}
              onClick={() => {
                const prev = new Date(currentMonth);
                prev.setDate(prev.getDate() - 7);
                onMonthChange(prev);
              }}
              type="text"
              size="small"
            />
            <Button
              icon={<ChevronRight size={18} />}
              onClick={() => {
                const next = new Date(currentMonth);
                next.setDate(next.getDate() + 7);
                onMonthChange(next);
              }}
              type="text"
              size="small"
            />
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {weekDays[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
          {weekDays[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </h2>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((date, idx) => {
            const dayEvents = getEventTypesForDate(date);
            return (
              <div
                key={idx}
                onClick={() => onSelectDate(date)}
                className="p-3 rounded border-2 cursor-pointer transition"
                style={{
                  borderColor: selectedDate?.toDateString() === date.toDateString() ? "var(--RoyalBlue)" : "var(--BlueHaze)",
                  backgroundColor:
                    selectedDate?.toDateString() === date.toDateString()
                      ? "var(--BlueHaze)"
                      : date.toDateString() === new Date().toDateString()
                      ? "#f0f9ff"
                      : "white",
                }}
              >
                <div className="font-bold text-sm mb-2">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                <div className="text-lg font-bold text-gray-900 mb-2">{date.getDate()}</div>
                <div className="flex gap-1 flex-wrap">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getEventColor(event.type) }}
                    />
                  ))}
                  {dayEvents.length > 2 && <span className="text-[9px] text-gray-500">+{dayEvents.length - 2}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Month View (default)
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button size="small" onClick={() => onViewChange("day")}>
            Day
          </Button>
          <Button size="small" onClick={() => onViewChange("week")}>
            Week
          </Button>
          <Button
            size="small"
            onClick={() => onViewChange("month")}
            style={{ backgroundColor: "var(--RoyalBlue)", color: "white" }}
          >
            Month
          </Button>
        </div>
        <div className="flex gap-2">
          <Button icon={<ChevronLeft size={18} />} onClick={prevMonth} type="text" size="small" />
          <Button icon={<ChevronRight size={18} />} onClick={nextMonth} type="text" size="small" />
        </div>
      </div>
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </h2>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, idx) => {
          if (!date) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dayEvents = getEventTypesForDate(date);
          const isSelected =
            selectedDate && date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className="aspect-square rounded-lg border-2 p-2 transition flex flex-col items-center justify-start relative"
              style={{
                borderColor: isSelected ? "var(--RoyalBlue)" : "var(--BlueHaze)",
                backgroundColor: isSelected ? "var(--BlueHaze)" : isToday ? "#f0f9ff" : "white",
              }}
            >
              {/* Date */}
              <span
                className="text-xs font-bold"
                style={{
                  color: isToday ? "var(--RoyalBlue)" : "#333",
                  fontSize: "11px",
                }}
              >
                {date.getDate()}
              </span>

              {/* Event Indicators */}
              <div className="flex gap-1 flex-wrap justify-center mt-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: getEventColor(event.type) }}
                    title={event.subject}
                  />
                ))}
                {dayEvents.length > 3 && (
                  <span className="text-[9px] text-gray-500">+{dayEvents.length - 3}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t">
        <div className="text-xs font-semibold text-gray-700 mb-3">Event Types:</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--blue-hosta)" }} />
            <span>Class</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--vivid-cerise)" }} />
            <span>Exam</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--medium-turquoise)" }} />
            <span>Break</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--RoyalBlue)" }} />
            <span>Assignment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--bright-sun)" }} />
            <span>Holiday</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--waikawa-grey)" }} />
            <span>Event</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
