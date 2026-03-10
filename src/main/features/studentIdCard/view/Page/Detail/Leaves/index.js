import { Tag } from "antd";

const statusColor = (status) => {
  if (status === "Approved") return "rgb(34,197,94)";
  if (status === "Pending")  return "rgb(234,179,8)";
  return "rgb(239,68,68)";
};

const Leaves = ({ student }) => (
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
          Leave Records
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
                Type
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Days
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {student.leaves.map((leave) => (
              <tr
                key={leave.id}
                className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
              >
                <td className="px-5 py-3 font-medium text-gray-800">
                  {leave.leaveType}
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">
                  {leave.fromDate}
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">
                  {leave.toDate}
                </td>
                <td className="px-5 py-3 text-center font-semibold text-gray-700">
                  {leave.days}
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs max-w-xs truncate">
                  {leave.reason}
                </td>
                <td className="px-5 py-3 text-center">
                  <Tag
                    style={{
                      backgroundColor: statusColor(leave.status),
                      color: "#fff",
                      border: "none",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      borderRadius: 999,
                      padding: "1px 8px",
                    }}
                  >
                    {leave.status}
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

export default Leaves;
