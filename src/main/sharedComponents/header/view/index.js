import React from "react";
import HeaderTitle from "./UI/headerTitle";
import HeaderButton from "./UI/headerButton";
import TopIcons from "./UI/TopIcons";
import ProfileBox from "./UI/ProfileBox";

const HeaderBar = ({
  title,
  icon,
  buttonTitle,
  onButtonClick,
  showButton = true,
  extra,
}) => {
  return (
    <header
      className="
        sticky top-0 z-30
        w-full bg-white border-b px-5 py-2
        flex items-center justify-between shadow-sm
      "
    >
      <HeaderTitle title={title} icon={icon} />

      <div className="flex items-center gap-4">
        {extra}

        {showButton && (
          <HeaderButton title={buttonTitle} onClick={onButtonClick} />
        )}

        <TopIcons />
        <ProfileBox />
      </div>
    </header>
  );
};

export default HeaderBar;
