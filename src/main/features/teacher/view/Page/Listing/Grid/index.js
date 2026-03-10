import teachers from "../../../../utils/dummyTeachers";
import TeacherCard from "../../../UI/TeacherCard";

const TeacherGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {teachers.map((t) => (
        <TeacherCard key={t.id} t={t} />
      ))}
    </div>
  );
};

export default TeacherGrid;
