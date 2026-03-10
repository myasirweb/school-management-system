import LeaveCard from "../../../UI/leaveCard";

const LeavesGrid = ({ leaves, onCardClick }) => {
  if (!leaves.length) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        No leave records found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full py-4">
      {leaves.map((leave) => (
        <LeaveCard key={leave.id} leave={leave} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default LeavesGrid;
