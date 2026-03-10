import { ClipboardList } from "lucide-react";
import HeaderBar from "../../../../sharedComponents/header/view";

const AssignHeader = ({ onAddAssign, onBack, mode }) => {
  return (
    <HeaderBar
      title={mode === "create" ? "Assign Course" : "Assign Courses"}
      icon={<ClipboardList size={18} />}
      buttonTitle={mode === "create" ? "Back to List" : "Assign Course"}
      onButtonClick={mode === "create" ? onBack : onAddAssign}
    />
  );
};

export default AssignHeader;
