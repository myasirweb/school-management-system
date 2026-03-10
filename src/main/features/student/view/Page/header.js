import { GraduationCap } from "lucide-react";
import HeaderBar from "../../../../sharedComponents/header/view";

const StudentHeader = ({ onAddStudent, onBack, mode }) => {
  return (
    <HeaderBar
      title={mode === "create" ? "Add Student" : "Students"}
      icon={<GraduationCap size={18} />}
      buttonTitle={mode === "create" ? "Back to List" : "Add Student"}
      onButtonClick={mode === "create" ? onBack : onAddStudent}
    />
  );
};

export default StudentHeader;
