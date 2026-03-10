import TaskCard from "../../UI/TaskCard";

const TasksGrid = ({ tasks, onCardClick }) => {
  if (!tasks.length) {
    return (
      <div
        className="flex items-center justify-center py-20 text-gray-400 text-sm"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        No task records found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full py-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default TasksGrid;
