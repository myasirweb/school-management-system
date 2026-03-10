import WarningCard from "../../UI/WarningCard";

const WarningsGrid = ({ warnings, onCardClick }) => {
  if (!warnings.length) {
    return (
      <div
        className="flex items-center justify-center py-20 text-gray-400 text-sm"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        No warning records found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full py-4">
      {warnings.map((w) => (
        <WarningCard key={w.id} warning={w} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default WarningsGrid;
