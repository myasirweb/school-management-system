import React from "react";
import HeaderBar from "../../../../sharedComponents/header/view";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ComplaintHeader = ({ onCreateComplaint }) => {
  return (
    <HeaderBar
      title="Complaints"
      icon={<ExclamationCircleOutlined style={{ fontSize: 18 }} />}
      buttonTitle="Create Complaint"
      onButtonClick={onCreateComplaint}
    />
  );
};

export default ComplaintHeader;
