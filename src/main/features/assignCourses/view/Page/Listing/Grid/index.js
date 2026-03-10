import assignments from "../../../../utils/dummyAssignments";
import AssignCard from "../../../UI/AssignCard";

const AssignGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {assignments.map((a) => (
        <AssignCard key={a.id} a={a} />
      ))}
    </div>
  );
};

export default AssignGrid;
