import React from "react";
import { Steps } from "antd";

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="mb-8">
      <Steps
        current={currentStep - 1}
        size="small"
        items={[
          { title: "Role" },
          { title: "Details" },
          { title: "Review" },
        ]}
      />
    </div>
  );
};

export default StepIndicator;
