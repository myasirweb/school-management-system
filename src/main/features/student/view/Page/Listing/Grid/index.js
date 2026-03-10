import students from "../../../../utils/dummyStudents";
import StudentCard from "../../../UI/StudentCard";


const StudentGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {students.map((s) => (
        <StudentCard key={s.id} s={s} />
      ))}
    </div>
  );
};

export default StudentGrid;
