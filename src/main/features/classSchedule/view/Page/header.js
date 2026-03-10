import { Calendar } from "lucide-react";
import HeaderBar from "../../../../sharedComponents/header/view";

const ScheduleHeader = ({ onAddSchedule }) => {
  return (
    <HeaderBar
      title="Class Schedule"
      icon={<Calendar size={18} />}
      buttonTitle="Add Schedule"
      onButtonClick={onAddSchedule}
    />
  );
};

export default ScheduleHeader;
