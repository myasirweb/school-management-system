const COLOR_TO_BG = {
  "rgb(100,196,178)": "bg-teal-50",
  "rgb(232,19,123)":  "bg-pink-50",
  "rgb(247,212,71)":  "bg-yellow-50",
  "rgb(82,107,177)":  "bg-blue-50",
  "rgb(69,198,238)":  "bg-sky-50",
};

const StatCard = ({ title, value, icon, color, trend, trendText }) => (
  <div
    className="bg-white rounded-xl border border-gray-100 px-5 py-5 flex items-start justify-between transition-all duration-200"
    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
  >
    <div className="flex flex-col gap-1">
      <div
        className="text-3xl font-bold leading-none"
        style={{ color, fontFamily: "Montserrat, sans-serif" }}
      >
        {value ?? "—"}
      </div>
      <div
        className="text-sm text-gray-500 mt-1"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {title}
      </div>
      {trendText && (
        <div
          className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {trend >= 0 ? "↑" : "↓"} {trendText}
        </div>
      )}
    </div>
    <div
      className={`rounded-full flex items-center justify-center shrink-0 ${COLOR_TO_BG[color] || "bg-gray-50"}`}
      style={{ width: 44, height: 44 }}
    >
      <span style={{ color, fontSize: 20 }}>{icon}</span>
    </div>
  </div>
);

export default StatCard;
