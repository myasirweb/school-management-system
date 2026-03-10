import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import HeaderBar from "../../../../sharedComponents/header/view";

const SchoolPolicyHeader = ({ onAddPolicy }) => (
  <HeaderBar
    showButton={false}
    extra={
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onAddPolicy}
        className="rounded-lg"
        style={{
          backgroundColor: "rgb(82,107,177)",
          borderColor: "rgb(82,107,177)",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 500,
        }}
      >
        Add Policy
      </Button>
    }
  />
);

export default SchoolPolicyHeader;
