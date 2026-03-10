import HeaderBar from "../../../../sharedComponents/header/view";
import { FileTextOutlined } from "@ant-design/icons";

const FormsHeader = ({ onCreateForm }) => (
  <HeaderBar
    title="Forms"
    icon={<FileTextOutlined style={{ fontSize: 18 }} />}
    buttonTitle="Create Form"
    onButtonClick={onCreateForm}
  />
);

export default FormsHeader;
