import { message } from "antd";
import {
  CalendarOutlined,
  TeamOutlined,
  UserOutlined,
  CloseCircleOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import ReportCard from "./UI/ReportCard";

const REPORTS = [
  {
    key: "monthly",
    title: "Monthly Attendance Report",
    icon: <CalendarOutlined />,
    description:
      "Generate a comprehensive month-by-month attendance summary for all students and teachers. Includes present, absent, late, and leave breakdowns.",
  },
  {
    key: "classwise",
    title: "Class-wise Report",
    icon: <TeamOutlined />,
    description:
      "View attendance statistics grouped by class section. Compare performance across Grade 8, 9, 10, and 11 with percentage breakdowns.",
  },
  {
    key: "studentwise",
    title: "Student-wise Report",
    icon: <UserOutlined />,
    description:
      "Individual student attendance report with daily records, monthly trends, and overall percentage. Ideal for parent-teacher meetings.",
  },
  {
    key: "absence",
    title: "Absence Report",
    icon: <CloseCircleOutlined />,
    description:
      "Detailed log of all absences including dates, reasons, and patterns. Identify students at risk of crossing the absence threshold.",
  },
  {
    key: "analytics",
    title: "Attendance Analytics",
    icon: <BarChartOutlined />,
    description:
      "Trend analysis showing attendance patterns over time. Highlights peak absence days, weekly trends, and improvement areas.",
  },
  {
    key: "summary",
    title: "Annual Summary Report",
    icon: <FileTextOutlined />,
    description:
      "Full academic year attendance summary. Covers all months, all classes, both students and teachers in a single exportable document.",
  },
];

const Reports = () => {
  const handleGenerate = (reportKey) => {
    const report = REPORTS.find((r) => r.key === reportKey);
    message.success(`Generating "${report?.title}"…`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        className="bg-white rounded-xl border border-gray-100 px-5 py-4"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        <div
          className="text-sm font-bold text-gray-700 mb-1"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Attendance Reports
        </div>
        <p
          className="text-xs text-gray-400"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Select a report type to generate and export attendance data.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {REPORTS.map((report) => (
          <ReportCard
            key={report.key}
            title={report.title}
            icon={report.icon}
            description={report.description}
            onGenerate={() => handleGenerate(report.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default Reports;
