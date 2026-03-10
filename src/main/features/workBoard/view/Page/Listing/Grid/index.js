import BoardCard from "../../UI/BoardCard";

const BoardsGrid = ({ boards }) => {
  if (!boards.length) {
    return (
      <div
        className="flex items-center justify-center py-20 text-gray-400 text-sm"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        No board records found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 px-6 py-4 w-full">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};

export default BoardsGrid;
