import { Avatar } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const DayDetailPanel = ({ selectedDate, dayDetails }) => {
  if (!selectedDate) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <CalendarOutlined style={{ fontSize: 40, color: "#d1d5db" }} />
        <p
          className="text-gray-400 text-sm text-center"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Select a day to view details
        </p>
      </div>
    );
  }

  const present = dayDetails?.present || 0;
  const absent  = dayDetails?.absent  || 0;
  const late    = dayDetails?.late    || 0;
  const absences = dayDetails?.absences || [];

  return (
    <div className="flex flex-col gap-4">
      <div
        className="text-sm font-bold text-gray-700"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>

      {/* Stat boxes */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Present", value: present, color: "rgb(100,196,178)" },
          { label: "Absent",  value: absent,  color: "rgb(232,19,123)" },
          { label: "Late",    value: late,    color: "rgb(247,212,71)" },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center bg-gray-50 rounded-xl py-3">
            <div
              className="text-2xl font-bold"
              style={{ color, fontFamily: "Montserrat, sans-serif" }}
            >
              {value}
            </div>
            <div
              className="text-xs text-gray-500 mt-0.5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Absent students list */}
      {absences.length > 0 ? (
        <div>
          <div
            className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Absent Students ({absences.length})
          </div>
          <div className="flex flex-col gap-2">
            {absences.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-b-0"
              >
                <Avatar src={s.avatar} size={28} />
                <div>
                  <div
                    className="text-sm font-medium text-gray-700"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {s.name}
                  </div>
                  <div className="text-xs text-gray-400">{s.className}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="text-sm text-gray-400 text-center py-2"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {present + absent + late === 0
            ? "No attendance data for this day."
            : "No absences recorded."}
        </div>
      )}
    </div>
  );
};

export default DayDetailPanel;
