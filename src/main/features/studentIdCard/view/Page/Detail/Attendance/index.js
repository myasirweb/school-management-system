const Attendance = ({ student }) => {
  const att = student.attendance;
  const pct = att.attendancePercentage;
  const pctColor =
    pct >= 90
      ? "rgb(34,197,94)"
      : pct >= 75
      ? "rgb(234,179,8)"
      : "rgb(239,68,68)";

  return (
    <div className="p-5 flex flex-col gap-4">
      {/* Summary stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Days",    value: att.totalDays,    color: "rgb(82,107,177)" },
          { label: "Present",       value: att.presentDays,  color: "rgb(34,197,94)" },
          { label: "Absent",        value: att.absentDays,   color: "rgb(239,68,68)" },
          { label: "Late",          value: att.lateDays,     color: "rgb(234,179,8)" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white rounded-lg p-4 flex flex-col gap-1"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
          >
            <div
              className="text-2xl font-bold"
              style={{ color, fontFamily: "Montserrat, sans-serif" }}
            >
              {value}
            </div>
            <div
              className="text-xs text-gray-500"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Overall attendance progress bar */}
      <div
        className="bg-white rounded-lg p-5"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-sm font-semibold text-gray-700"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Overall Attendance
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: pctColor, fontFamily: "Montserrat, sans-serif" }}
          >
            {pct}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: pctColor }}
          />
        </div>
      </div>

      {/* Monthly breakdown table */}
      <div
        className="bg-white rounded-lg overflow-hidden"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
      >
        <div
          className="px-6 py-3"
          style={{
            background: "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))",
          }}
        >
          <span
            className="text-sm font-bold text-white"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Monthly Breakdown
          </span>
        </div>
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Present
                </th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Absent
                </th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Late
                </th>
              </tr>
            </thead>
            <tbody>
              {att.monthlyAttendance.map((row) => (
                <tr
                  key={row.month}
                  className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {row.month}
                  </td>
                  <td className="px-5 py-3 text-center font-semibold text-green-600">
                    {row.present}
                  </td>
                  <td className="px-5 py-3 text-center font-semibold text-red-500">
                    {row.absent}
                  </td>
                  <td className="px-5 py-3 text-center font-semibold text-yellow-500">
                    {row.late}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
