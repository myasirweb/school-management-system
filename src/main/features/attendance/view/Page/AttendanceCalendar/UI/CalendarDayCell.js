const CalendarDayCell = ({
  date,
  dayData,
  isToday,
  isSelected,
  isWeekend,
  onClick,
}) => {
  const { present = 0, absent = 0, late = 0 } = dayData || {};
  const hasData = present > 0 || absent > 0 || late > 0;

  return (
    <div
      onClick={onClick}
      className={`
        border rounded-lg p-1.5 cursor-pointer min-h-[72px]
        transition-all duration-200
        ${isSelected
          ? "ring-2 ring-[rgb(82,107,177)] border-[rgb(82,107,177)] bg-blue-50"
          : isToday
          ? "border-[rgb(82,107,177)] bg-blue-50/40"
          : isWeekend
          ? "border-gray-100 bg-gray-50/50 hover:bg-gray-100/60"
          : "border-gray-100 bg-white hover:bg-gray-50"}
      `}
    >
      <div
        className={`text-xs font-bold mb-1 ${
          isToday
            ? "text-[rgb(82,107,177)]"
            : isWeekend
            ? "text-gray-400"
            : "text-gray-600"
        }`}
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {date}
      </div>
      {hasData && (
        <div className="flex flex-col gap-0.5">
          {present > 0 && (
            <div className="flex items-center gap-1">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "rgb(100,196,178)" }}
              />
              <span className="text-xs text-gray-500 leading-none">{present}</span>
            </div>
          )}
          {absent > 0 && (
            <div className="flex items-center gap-1">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "rgb(232,19,123)" }}
              />
              <span className="text-xs text-gray-500 leading-none">{absent}</span>
            </div>
          )}
          {late > 0 && (
            <div className="flex items-center gap-1">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "rgb(247,212,71)" }}
              />
              <span className="text-xs text-gray-500 leading-none">{late}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDayCell;
