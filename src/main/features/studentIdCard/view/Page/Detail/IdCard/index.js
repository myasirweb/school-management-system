import { Button } from "antd";
import { PrinterOutlined, DownloadOutlined } from "@ant-design/icons";

const IdCard = ({ student }) => {
  return (
    <div className="flex flex-col items-center p-8 gap-6">
      {/* Action buttons */}
      <div className="flex items-center gap-3 self-start">
        <Button
          icon={<PrinterOutlined />}
          onClick={() => window.print()}
          style={{
            borderColor: "rgb(82,107,177)",
            color: "rgb(82,107,177)",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Print
        </Button>
        <Button
          icon={<DownloadOutlined />}
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Download
        </Button>
      </div>

      {/* ID Card */}
      <div
        className="id-card-print bg-white rounded-xl overflow-hidden"
        style={{
          width: 360,
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        {/* Card header */}
        <div
          className="px-5 py-4 flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))",
          }}
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
            <span className="font-black text-lg" style={{ color: "rgb(82,107,177)" }}>
              S
            </span>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">
              Bright Future Academy
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              Student Identity Card
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="px-5 py-4 flex gap-4">
          {/* Photo */}
          <div className="shrink-0">
            <img
              src={student.profilePhoto}
              alt={student.fullName}
              className="w-24 h-28 rounded-lg object-cover"
              style={{ border: "3px solid rgb(82,107,177)" }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-1.5 min-w-0">
            <div className="text-base font-bold text-gray-800 leading-tight">
              {student.fullName}
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">ID: </span>
              {student.studentId}
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Class: </span>
              {student.className}
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Roll No: </span>
              {student.rollNumber}
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Blood: </span>
              {student.bloodGroup}
            </div>
            <div
              className="mt-1 px-2 py-0.5 rounded-full text-white text-xs font-bold self-start"
              style={{
                backgroundColor:
                  student.status === "Active"
                    ? "rgb(34,197,94)"
                    : "rgb(156,163,175)",
              }}
            >
              {student.status}
            </div>
          </div>
        </div>

        {/* Validity strip */}
        <div
          className="px-5 py-2 flex items-center justify-between"
          style={{ backgroundColor: "rgb(82,107,177)" }}
        >
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
            Issued: {student.enrollmentDate}
          </span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
            AY: {student.academicYear}
          </span>
        </div>

        {/* Barcode decoration */}
        <div className="px-5 py-3 flex flex-col items-center gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-800"
                style={{
                  width: i % 3 === 0 ? 3 : i % 5 === 0 ? 1 : 2,
                  height: 32,
                  opacity: 0.7 + (i % 4) * 0.07,
                }}
              />
            ))}
          </div>
          <div className="text-xs text-gray-400 tracking-widest font-mono">
            {student.studentId.replace(/-/g, " ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdCard;
