import React from "react";
import { roleOptions } from "../../utils/registrationHelper";

const RoleSelection = ({ selectedRole, onSelectRole }) => {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Register As</h2>
        <p className="text-sm text-gray-500 mt-1">
          Select your role to get started
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        {roleOptions.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.key;

          return (
            <div
              key={role.key}
              onClick={() => onSelectRole(role.key)}
              className={[
                "flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 cursor-pointer text-center transition-all duration-200",
                isSelected
                  ? "border-[var(--RoyalBlue)] bg-[var(--BlueHaze)] shadow-[0_0_0_3px_rgba(76,93,249,0.1)]"
                  : "border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md",
              ].join(" ")}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${role.color}15` }}
              >
                <Icon size={24} style={{ color: role.color }} />
              </div>
              <h4 className="text-[15px] font-bold text-gray-900 m-0">
                {role.label}
              </h4>
              <p className="text-xs text-gray-500 m-0">{role.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelection;
