import React from "react";
import HeaderBar from "../../../../sharedComponents/header/view";
import { WarningOutlined } from "@ant-design/icons";

const WarningHeader = ({ onCreateWarning }) => {
  return (
    <HeaderBar
      title="Warnings"
      icon={<WarningOutlined style={{ fontSize: 18 }} />}
      buttonTitle="Create Warning"
      onButtonClick={onCreateWarning}
    />
  );
};

export default WarningHeader;
