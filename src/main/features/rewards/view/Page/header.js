import React from "react";
import HeaderBar from "../../../../sharedComponents/header/view";
import { TrophyOutlined } from "@ant-design/icons";

const RewardHeader = ({ onCreateReward }) => {
  return (
    <HeaderBar
      title="Rewards"
      icon={<TrophyOutlined size={18} />}
      buttonTitle="Create Reward"
      onButtonClick={onCreateReward}
    />
  );
};

export default RewardHeader;
