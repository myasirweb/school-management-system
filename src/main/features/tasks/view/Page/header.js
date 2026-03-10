import HeaderBar from "../../../../sharedComponents/header/view";
import { CheckCircleOutlined } from "@ant-design/icons";

const TaskHeader = ({ onCreateTask }) => {
  return (
    <HeaderBar
      title="Tasks"
      icon={<CheckCircleOutlined style={{ fontSize: 18 }} />}
      buttonTitle="Create Task"
      onButtonClick={onCreateTask}
    />
  );
};

export default TaskHeader;
