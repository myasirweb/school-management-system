import React from "react";
import { useLocation } from "react-router-dom";
import { getPageInfo } from "../../../utils/getPageInfo";

const HeaderTitle = () => {
  const location = useLocation();
  const { title, icon: Icon } = getPageInfo(location.pathname);

  const renderIcon = () => {
    if (!Icon) return null;

    const isComponent =
      typeof Icon === "function" || (typeof Icon === "object" && (Icon.$$typeof || Icon.render));

    if (isComponent) {
      const IconComp = Icon;
      return <IconComp size={20} className="text-[var(--color-blue)]" />;
    }

    const src = typeof Icon === "string" ? Icon : Icon?.default || null;
    if (!src) return null;
    return <img src={src} alt={title} className="w-5 h-5" />;
  };

  return (
    <div className="w-1/3 flex items-center gap-2">
      {renderIcon()}

      <div className="flex flex-col">
        <h1 className="font-semibold text-base text-[var(--color-blue)]">{title}</h1>
        <div className="h-[2px] w-full bg-[var(--color-blue)] mt-1"></div>
      </div>
    </div>
  );
};

export default HeaderTitle;
