import GroupCard from "../../UI/GroupCard";

const GroupsGrid = ({ groups }) => {
  if (!groups.length) {
    return (
      <div
        className="flex items-center justify-center py-20 text-gray-400 text-sm"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        No group records found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 px-6 py-4 w-full">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupsGrid;
