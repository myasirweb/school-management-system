import { User } from "lucide-react";
import HeaderBar from "../../../../sharedComponents/header/view";

const TeacherHeader = ({ onAddTeacher, onBack, mode }) => {
  return (
    <HeaderBar
      title={mode === "create" ? "Add Teacher" : "Teachers"}
      icon={<User size={18} />}
      buttonTitle={mode === "create" ? "Back to List" : "Add Teacher"}
      onButtonClick={mode === "create" ? onBack : onAddTeacher}
    />
  );
};

export default TeacherHeader;
