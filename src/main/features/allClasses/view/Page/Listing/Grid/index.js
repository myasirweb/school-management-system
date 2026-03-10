import classes from "../../../../utils/dummyClasses";
import ClassCard from "../../../UI/ClassCard";

const ClassGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {classes.map((cls) => (
        <ClassCard key={cls.id} cls={cls} />
      ))}
    </div>
  );
};

export default ClassGrid;
