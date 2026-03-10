import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SharedInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  disabled = false,
  icon: Icon,
  className = "",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-600">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full border rounded-lg px-3 py-2.5 text-sm
            focus:outline-none focus:ring-2 transition
            ${Icon ? "pl-10" : ""}
            ${isPassword ? "pr-10" : ""}
            ${error
              ? "border-red-400 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
            }
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          style={{
            "--tw-ring-color": error ? "#fecaca" : "var(--BlueHaze)",
          }}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default SharedInput;
