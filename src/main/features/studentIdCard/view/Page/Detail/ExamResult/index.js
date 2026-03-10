import { useState } from "react";

const gradeColor = (g) => {
  if (g === "A+") return "rgb(82,107,177)";
  if (g === "A")  return "rgb(34,197,94)";
  if (g === "B+") return "rgb(234,179,8)";
  if (g === "B")  return "rgb(249,115,22)";
  return "rgb(239,68,68)";
};

const ExamResult = ({ student }) => {
  const [expandedExam, setExpandedExam] = useState(null);

  return (
    <div className="p-5 flex flex-col gap-4">
      {student.examResults.map((exam) => {
        const isExpanded = expandedExam === exam.examName;
        const pctColor = gradeColor(exam.grade);

        return (
          <div
            key={exam.examName}
            className="bg-white rounded-lg overflow-hidden"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
          >
            {/* Exam summary row — clickable to expand */}
            <button
              type="button"
              className="w-full px-5 py-4 flex items-center gap-4 hover:bg-blue-50/30 transition-colors text-left"
              onClick={() =>
                setExpandedExam(isExpanded ? null : exam.examName)
              }
            >
              <div className="flex-1">
                <div
                  className="text-sm font-bold text-gray-800"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {exam.examName}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{exam.date}</div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div
                    className="text-sm font-bold text-gray-700"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {exam.obtainedMarks}/{exam.totalMarks}
                  </div>
                  <div className="text-xs text-gray-400">Marks</div>
                </div>

                <div className="text-center">
                  <div
                    className="text-sm font-bold"
                    style={{ color: pctColor, fontFamily: "Montserrat, sans-serif" }}
                  >
                    {exam.percentage}%
                  </div>
                  <div className="text-xs text-gray-400">Percentage</div>
                </div>

                <div
                  className="px-2.5 py-1 rounded-full text-white text-xs font-bold"
                  style={{ backgroundColor: pctColor }}
                >
                  {exam.grade}
                </div>

                <div className="text-center">
                  <div
                    className="text-sm font-bold text-gray-700"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    #{exam.position}
                  </div>
                  <div className="text-xs text-gray-400">Position</div>
                </div>

                <span className="text-gray-400 text-xs">
                  {isExpanded ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {/* Subject breakdown — collapsible */}
            {isExpanded && (
              <div className="border-t border-gray-100">
                <table
                  className="w-full text-sm"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="text-center px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="text-center px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Obtained
                      </th>
                      <th className="text-center px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam.subjects.map((sub) => (
                      <tr
                        key={sub.subjectName}
                        className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="px-5 py-2.5 font-medium text-gray-800">
                          {sub.subjectName}
                        </td>
                        <td className="px-5 py-2.5 text-center text-gray-500">
                          {sub.totalMarks}
                        </td>
                        <td className="px-5 py-2.5 text-center font-semibold text-gray-700">
                          {sub.obtainedMarks}
                        </td>
                        <td className="px-5 py-2.5 text-center">
                          <span
                            className="px-2 py-0.5 rounded-full text-white text-xs font-bold"
                            style={{ backgroundColor: gradeColor(sub.grade) }}
                          >
                            {sub.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExamResult;
