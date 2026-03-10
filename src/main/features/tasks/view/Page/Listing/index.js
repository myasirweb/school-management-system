import TasksGrid from "./Grid";
import TasksTable from "./Table";

const TasksListing = ({ viewMode, tasks, onCardClick }) => {
  if (viewMode === "list") {
    return <TasksTable tasks={tasks} onView={onCardClick} />;
  }
  return <TasksGrid tasks={tasks} onCardClick={onCardClick} />;
};

export default TasksListing;
