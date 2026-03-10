import HeaderBar from "../../../../sharedComponents/header/view";
import { AppstoreOutlined } from "@ant-design/icons";

const ProjectHeader = ({ onCreateProject }) => {
  return (
    <HeaderBar
      title="Projects"
      icon={<AppstoreOutlined style={{ fontSize: 18 }} />}
      buttonTitle="Create Project"
      onButtonClick={onCreateProject}
    />
  );
};

export default ProjectHeader;
