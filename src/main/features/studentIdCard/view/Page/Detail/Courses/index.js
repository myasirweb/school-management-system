import { Tag } from "antd";

const gradeColor = (g) => {
  if (g === "A+") return "rgb(82,107,177)";
  if (g === "A")  return "rgb(34,197,94)";
  if (g === "B+") return "rgb(234,179,8)";
  if (g === "B")  return "rgb(249,115,22)";
  return "rgb(239,68,68)";
};

const Courses = ({ student }) => (
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
          Enrolled Courses
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
                Course
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Teacher
              </th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Credits
              </th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {student.courses.map((course) => (
              <tr
                key={course.courseId}
                className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
              >
                <td className="px-5 py-3 font-medium text-gray-800">
                  {course.courseName}
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs">
                  {course.teacher}
                </td>
                <td className="px-5 py-3 text-center text-gray-600">
                  {course.creditHours}
                </td>
                <td className="px-5 py-3 text-center">
                  <span
                    className="px-2 py-0.5 rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: gradeColor(course.grade) }}
                  >
                    {course.grade}
                  </span>
                </td>
                <td className="px-5 py-3 text-center">
                  <Tag
                    style={{
                      backgroundColor:
                        course.status === "ongoing"
                          ? "rgb(59,130,246)"
                          : "rgb(34,197,94)",
                      color: "#fff",
                      border: "none",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      borderRadius: 999,
                      padding: "1px 8px",
                    }}
                  >
                    {course.status === "ongoing" ? "Ongoing" : "Completed"}
                  </Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Courses;
