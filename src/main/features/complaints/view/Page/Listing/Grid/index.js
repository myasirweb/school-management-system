import ComplaintCard from "../../UI/ComplaintCard";

const ComplaintsGrid = ({ complaints, onCardClick }) => {
  if (!complaints.length) {
    return (
      <div
        className="flex items-center justify-center py-20 text-gray-400 text-sm"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        No complaint records found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full py-4">
      {complaints.map((c) => (
        <ComplaintCard key={c.id} complaint={c} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default ComplaintsGrid;
