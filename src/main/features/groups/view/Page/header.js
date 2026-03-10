import HeaderBar from "../../../../sharedComponents/header/view";
import { TeamOutlined } from "@ant-design/icons";

const GroupHeader = ({ onCreateGroup }) => {
  return (
    <HeaderBar
      title="Groups"
      icon={<TeamOutlined style={{ fontSize: 18 }} />}
      buttonTitle="Create Group"
      onButtonClick={onCreateGroup}
    />
  );
};

export default GroupHeader;
