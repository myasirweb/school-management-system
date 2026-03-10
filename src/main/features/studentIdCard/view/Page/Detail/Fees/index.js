import { Tag } from "antd";

const feeStatusColor = (status) => {
  if (status === "Paid")    return "rgb(34,197,94)";
  if (status === "Pending") return "rgb(234,179,8)";
  return "rgb(239,68,68)";
};

const Fees = ({ student }) => {
  const fees = student.fees;
  const paidPct = Math.round((fees.paidFees / fees.totalFees) * 100);
  const barColor = paidPct >= 75 ? "rgb(34,197,94)" : "rgb(234,179,8)";

  return (
    <div className="p-5 flex flex-col gap-4">
      {/* Summary stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Fees", value: fees.totalFees,   color: "rgb(82,107,177)" },
          { label: "Paid",       value: fees.paidFees,    color: "rgb(34,197,94)" },
          {
            label: "Pending",
            value: fees.pendingFees,
            color: fees.pendingFees > 0 ? "rgb(239,68,68)" : "rgb(156,163,175)",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white rounded-lg p-4 flex flex-col gap-1"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
          >
            <div
              className="text-xl font-bold"
              style={{ color, fontFamily: "Montserrat, sans-serif" }}
            >
              {fees.currency} {value.toLocaleString()}
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

      {/* Payment progress bar */}
      <div
        className="bg-white rounded-lg p-5"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-sm font-semibold text-gray-700"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Payment Progress
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: barColor, fontFamily: "Montserrat, sans-serif" }}
          >
            {paidPct}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="h-3 rounded-full"
            style={{ width: `${paidPct}%`, backgroundColor: barColor }}
          />
        </div>
      </div>

      {/* Fee breakdown table */}
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
            Fee Breakdown
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
                  Fee Type
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Paid On
                </th>
              </tr>
            </thead>
            <tbody>
              {fees.feeBreakdown.map((fee) => (
                <tr
                  key={fee.feeType}
                  className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {fee.feeType}
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-700">
                    {fees.currency} {fee.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-center text-gray-500 text-xs whitespace-nowrap">
                    {fee.dueDate}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <Tag
                      style={{
                        backgroundColor: feeStatusColor(fee.status),
                        color: "#fff",
                        border: "none",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: 10,
                        fontWeight: 600,
                        borderRadius: 999,
                        padding: "1px 8px",
                      }}
                    >
                      {fee.status}
                    </Tag>
                  </td>
                  <td className="px-5 py-3 text-center text-gray-500 text-xs">
                    {fee.paidOn || "—"}
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

export default Fees;
