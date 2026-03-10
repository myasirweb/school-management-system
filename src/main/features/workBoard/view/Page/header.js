import HeaderBar from "../../../../sharedComponents/header/view";
import { TableOutlined } from "@ant-design/icons";

const WorkBoardHeader = ({ onCreateBoard }) => {
  return (
    <HeaderBar
      title="Work Board"
      icon={<TableOutlined style={{ fontSize: 18 }} />}
      buttonTitle="Create Board"
      onButtonClick={onCreateBoard}
    />
  );
};

export default WorkBoardHeader;
