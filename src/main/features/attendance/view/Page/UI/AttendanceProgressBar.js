import { Progress } from "antd";

const getStrokeColor = (pct) => {
  if (pct >= 90) return "rgb(100,196,178)";
  if (pct >= 75) return "rgb(247,212,71)";
  return "rgb(232,19,123)";
};

const AttendanceProgressBar = ({ percentage }) => (
  <Progress
    type="line"
    percent={percentage}
    strokeColor={getStrokeColor(percentage)}
    trailColor="#f3f4f6"
    strokeWidth={8}
    format={(pct) => (
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: getStrokeColor(pct),
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        {pct}%
      </span>
    )}
  />
);

export default AttendanceProgressBar;
