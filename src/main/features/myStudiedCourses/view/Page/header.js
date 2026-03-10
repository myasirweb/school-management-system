import { BookOpen } from "lucide-react";
import HeaderBar from "../../../../sharedComponents/header/view";

const CourseHeader = ({ onAddCourse, onBack, mode }) => {
  return (
    <HeaderBar
      title={mode === "create" ? "Add Course" : "Study Courses"}
      icon={<BookOpen size={18} />}
      buttonTitle={mode === "create" ? "Back to List" : "Add Course"}
      onButtonClick={mode === "create" ? onBack : onAddCourse}
    />
  );
};

export default CourseHeader;
