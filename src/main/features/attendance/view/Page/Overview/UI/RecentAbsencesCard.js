import { Avatar, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";

const RecentAbsencesCard = ({ absences, onNotifyParent }) => (
  <div
    className="bg-white rounded-xl border border-gray-100 px-5 py-5"
    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
  >
    <div
      className="text-sm font-bold text-gray-700 mb-4"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      Recent Absences
    </div>

    {absences.length === 0 ? (
      <div
        className="text-center text-sm text-gray-400 py-4"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        No absences recorded today.
      </div>
    ) : (
      <div className="flex flex-col gap-3">
        {absences.map((absence) => (
          <div key={absence.studentId} className="flex items-center gap-3">
            <Avatar src={absence.avatar} size={36} />
            <div className="flex-1 min-w-0">
              <div
                className="text-sm font-medium text-gray-800 truncate"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {absence.name}
              </div>
              <div className="text-xs text-gray-400">
                {absence.className} • {absence.date}
              </div>
            </div>
            <Button
              size="small"
              icon={<BellOutlined />}
              onClick={() => onNotifyParent(absence.studentId)}
              style={{
                borderColor: "rgb(82,107,177)",
                color: "rgb(82,107,177)",
                fontSize: 11,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Notify
            </Button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default RecentAbsencesCard;
