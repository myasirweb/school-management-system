const Timetable = ({ student }) => (
  <div className="p-5">
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
          Weekly Timetable
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
                Day
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Teacher
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Room
              </th>
            </tr>
          </thead>
          <tbody>
            {student.timetable.map((day) =>
              day.periods.map((period, i) => (
                <tr
                  key={`${day.day}-${i}`}
                  className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                >
                  {i === 0 && (
                    <td
                      className="px-5 py-3 font-semibold text-gray-700"
                      rowSpan={day.periods.length}
                      style={{
                        borderRight: "2px solid rgba(82,107,177,0.15)",
                        verticalAlign: "top",
                      }}
                    >
                      {day.day}
                    </td>
                  )}
                  <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {period.time}
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {period.subject}
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs">
                    {period.teacher}
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs">
                    {period.room}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Timetable;
