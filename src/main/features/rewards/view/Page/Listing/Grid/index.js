import RewardCard from "../../UI/RewardCard";

const RewardsGrid = ({ rewards, onCardClick }) => {
  if (!rewards.length) {
    return (
      <div
        className="flex items-center justify-center py-20 text-gray-400 text-sm"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        No reward records found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full py-4">
      {rewards.map((reward) => (
        <RewardCard key={reward.id} reward={reward} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default RewardsGrid;
