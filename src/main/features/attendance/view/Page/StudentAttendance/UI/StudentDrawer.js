import { Drawer, Progress, Avatar } from "antd";
import AttendanceStatusTag from "../../UI/AttendanceStatusTag";

const LEGEND = [
  { label: "Present", color: "rgb(100,196,178)" },
  { label: "Absent",  color: "rgb(232,19,123)" },
  { label: "Late",    color: "rgb(247,212,71)" },
  { label: "Leave",   color: "rgb(69,198,238)" },
];

const getStrokeColor = (pct) => {
  if (pct >= 90) return "rgb(100,196,178)";
  if (pct >= 75) return "rgb(247,212,71)";
  return "rgb(232,19,123)";
};

const StudentDrawer = ({ visible, student, onClose }) => {
  if (!student) return null;

  const pctColor = getStrokeColor(student.attendancePercentage);

  return (
    <Drawer
      title={
        <div className="flex items-center gap-3">
          <Avatar src={student.avatar} size={36} />
          <div>
            <div
              className="text-sm font-bold text-gray-800"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {student.name}
            </div>
            <div className="text-xs text-gray-400">{student.className}</div>
          </div>
        </div>
      }
      open={visible}
      onClose={onClose}
      width={480}
      styles={{ body: { fontFamily: "Montserrat, sans-serif", padding: "20px 24px" } }}
    >
      {/* Circular progress + stat boxes */}
      <div className="flex items-center gap-5 mb-6">
        <Progress
          type="circle"
          percent={student.attendancePercentage}
          strokeColor={pctColor}
          trailColor="#f3f4f6"
          width={96}
          format={(p) => (
            <span style={{ fontSize: 14, fontWeight: 700, color: pctColor }}>
              {p}%
            </span>
          )}
        />
        <div className="grid grid-cols-3 gap-2 flex-1">
          {[
            { label: "Present", value: student.presentDays, color: "rgb(100,196,178)" },
            { label: "Absent",  value: student.absentDays,  color: "rgb(232,19,123)" },
            { label: "Late",    value: student.lateDays,     color: "rgb(247,212,71)" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="text-center bg-gray-50 rounded-xl py-3"
            >
              <div
                className="text-xl font-bold"
                style={{ color, fontFamily: "Montserrat, sans-serif" }}
              >
                {value}
              </div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly attendance bars */}
      <div className="mb-6">
        <div
          className="text-sm font-bold text-gray-700 mb-3"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Monthly Attendance
        </div>
        {student.monthlyData.map((m) => {
          const total = m.present + m.absent + m.late;
          const pct = total ? Math.round((m.present / total) * 100) : 0;
          return (
            <div key={m.month} className="mb-2.5">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {m.month}
                </span>
                <span className="text-gray-500">
                  {m.present} / {total} ({pct}%)
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: pct >= 90 ? "rgb(100,196,178)" : pct >= 75 ? "rgb(247,212,71)" : "rgb(232,19,123)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily records calendar grid */}
      <div>
        <div
          className="text-sm font-bold text-gray-700 mb-3"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Daily Records (Jan 2025)
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {student.dailyRecords.map((rec) => {
            const day = new Date(rec.date).getDate();
            const bg =
              rec.status === "present" ? "rgb(100,196,178)" :
              rec.status === "absent"  ? "rgb(232,19,123)"  :
              rec.status === "late"    ? "rgb(247,212,71)"  : "rgb(69,198,238)";
            return (
              <div
                key={rec.date}
                title={`${rec.date}: ${rec.status}${rec.note ? ` — ${rec.note}` : ""}`}
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold text-white cursor-default transition-all duration-150 hover:opacity-80"
                style={{ backgroundColor: bg }}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-2">
          {LEGEND.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
              <span className="text-xs text-gray-500" style={{ fontFamily: "Montserrat, sans-serif" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default StudentDrawer;
