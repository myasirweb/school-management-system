import { BookOpen } from "lucide-react";
import HeaderBar from "../../../../sharedComponents/header/view";

const ClassHeader = ({ onAddClass, onBack, mode }) => {
  return (
    <HeaderBar
      title={mode === "create" ? "Create Class" : "All Classes"}
      icon={<BookOpen size={18} />}
      buttonTitle={mode === "create" ? "Back to List" : "Create Class"}
      onButtonClick={mode === "create" ? onBack : onAddClass}
    />
  );
};

export default ClassHeader;
