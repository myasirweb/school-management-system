import { Progress } from "antd";

const AttendanceSummaryCard = ({
  studentsPresent,
  studentsAbsent,
  teachersPresent,
  teachersAbsent,
  totals,
}) => {
  const sPct   = totals.students ? Math.round((studentsPresent / totals.students) * 100) : 0;
  const sAPct  = totals.students ? Math.round((studentsAbsent  / totals.students) * 100) : 0;
  const tPct   = totals.teachers ? Math.round((teachersPresent / totals.teachers) * 100) : 0;
  const tAPct  = totals.teachers ? Math.round((teachersAbsent  / totals.teachers) * 100) : 0;

  const items = [
    { label: "Students Present", pct: sPct,  color: "rgb(100,196,178)" },
    { label: "Students Absent",  pct: sAPct, color: "rgb(232,19,123)" },
    { label: "Teachers Present", pct: tPct,  color: "rgb(69,198,238)" },
    { label: "Teachers Absent",  pct: tAPct, color: "rgb(247,212,71)" },
  ];

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 px-5 py-5"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
    >
      <div
        className="text-sm font-bold text-gray-700 mb-4"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Attendance Summary
      </div>
      <div className="grid grid-cols-2 gap-5">
        {items.map(({ label, pct, color }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Progress
              type="circle"
              percent={pct}
              width={80}
              strokeColor={color}
              trailColor="#f3f4f6"
              format={(p) => (
                <span style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "Montserrat, sans-serif" }}>
                  {p}%
                </span>
              )}
            />
            <div
              className="text-xs text-gray-500 text-center leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceSummaryCard;
