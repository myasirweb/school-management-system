import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const ReportCard = ({ title, icon, description, onGenerate }) => (
  <div
    className="bg-white rounded-xl border border-gray-100 px-5 py-5 flex flex-col gap-3 transition-all duration-200"
    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
  >
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: "rgb(82,107,177,0.1)" }}
      >
        <span style={{ color: "rgb(82,107,177)", fontSize: 20 }}>{icon}</span>
      </div>
      <div
        className="text-sm font-bold text-gray-800"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {title}
      </div>
    </div>
    <p
      className="text-xs text-gray-500 leading-relaxed"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {description}
    </p>
    <Button
      icon={<DownloadOutlined />}
      onClick={onGenerate}
      style={{
        borderColor: "rgb(82,107,177)",
        color: "rgb(82,107,177)",
        fontFamily: "Montserrat, sans-serif",
        fontSize: 12,
        alignSelf: "flex-start",
      }}
    >
      Generate Report
    </Button>
  </div>
);

export default ReportCard;
