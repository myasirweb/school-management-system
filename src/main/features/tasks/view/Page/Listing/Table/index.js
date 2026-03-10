import SharedTable from "../../../../../../sharedComponents/SharedTable";
import { tableColumns } from "./tableColumns";

const TasksTable = ({ tasks, onView, loading = false }) => {
  return (
    <SharedTable
      columns={tableColumns(onView)}
      dataSource={tasks}
      loading={loading}
      rowKey="id"
      scroll={{ x: 1200 }}
      pagination={{ pageSize: 10 }}
      onRow={(record) => ({
        onClick: () => onView && onView(record.id),
        style: { cursor: "pointer" },
      })}
    />
  );
};

export default TasksTable;
